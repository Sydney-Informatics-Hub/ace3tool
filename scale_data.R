library(tidyverse)
library(jsonlite)
library(readr)
library(stringr)
library(gtsummary)

model <- readr::read_rds("data/dementia_final_model.rds")
data <- model$data
means <- jsonlite::read_json("data/dementia_means.json", simplifyVector = TRUE)

scale_means = means$value %>% set_names(means$attributes$names$value)

# Uncenter data
scale_data <- data[, 1:6]
for (scale in names(scale_means)) {
    scale_data[scale] <- round(scale_data[scale] + scale_means[scale])
}
scale_data <- scale_data %>%
    rename_with(~ str_remove(.x, "ACEIII..Subtotal")) %>%
    mutate(Total = rowSums(across(- dementia)))

scale_data %>%
    group_by(dementia) %>%
    summarize(across(everything(), list(mean=mean, sd=sd, max=max, min=min, p20 = ~ quantile(.x, probs = 0.2))))

scale_data %>%
    tbl_summary(by = "dementia") %>%
    add_n()

vtable::sumtable(scale_data, group="dementia", group.long=TRUE, out="return")

scale_long <- scale_data %>%
    pivot_longer(! dementia, names_to = "scale", values_to = "score")

ggplot(scale_long, aes(x=scale, y=score, colour=dementia)) +
    geom_jitter(alpha=0.5)

scale_long %>%
    group_by(dementia, scale) %>%
    summarize(min=min(score), max=max(score), p20 = quantile(score, probs = 0.2), p80 = quantile(score, probs=0.8))
