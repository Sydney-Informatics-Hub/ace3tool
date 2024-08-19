library(tidyverse)
library(jsonlite)
library(readr)
library(stringr)


# Read in and clean data ######
model <- readr::read_rds("data/dementia_final_model.rds")
data <- model$data
means <- jsonlite::read_json("data/dementia_means.json", simplifyVector = TRUE)

# Un-center scale scores
scale_means = means$value %>% set_names(means$attributes$names$value)
for (scale in names(scale_means)) {
    data[scale] <- round(data[scale] + scale_means[scale])
}

# Rename columns, add total score, predicted probabilities and classes
data <- data %>%
    rename_with(~ str_remove(.x, "ACEIII..Subtotal")) %>%
    rename_with(~ str_remove(.x, "ACEIII..")) %>%
    mutate(TotalScore = rowSums(across(Attention:Visuospatial)),
           predicted = levels(dementia)[model$y + 1] %>%
               fct(levels=levels(dementia)),
           prob = 1 -  predict(model, type="response"))

# Data summaries ######
# Summarize score data by dementia status
score_summary <- data |>
    rename(Total = TotalScore) |>
    group_by(dementia) |>
    summarize(across(c(Attention, Memory, Fluency, Language, Visuospatial, Total), list(mean=mean, sd=sd))) |>
    pivot_longer(- dementia, names_to=c("score", "stat"), names_sep="_")

control_means <- score_summary |>
    filter(dementia == "Non-dementia", stat == "mean")

control_means_export <- control_means$value |>
    set_names(control_means$score |> str_to_lower()) |>
    as.list()

control_sds <- score_summary |>
    filter(dementia == "Non-dementia", stat == "sd")

control_sds_export <- control_sds$value |>
    set_names(control_sds$score |> str_to_lower()) |>
    as.list()

# ROC Thresholds ######
tidy_roc <- function(roc_obj) {
    tibble(
        sensitivity = roc_obj$sensitivities,
        specificity = roc_obj$specificities,
        thresholds = roc_obj$thresholds
    )
}

scales <- c("Attention", "Memory", "Fluency", "Language", "Visuospatial", "TotalScore")


# Find where specificity reaches 1 for each score
spec_thresholds <- purrr::map(
    set_names(scales,
              scales |> str_to_lower() |> str_replace("totalscore", "total")),
    function(scl) {
        roc_obj <- pROC::roc_(data, "dementia", scl, levels=c("Non-dementia", "Dementia"))
        roc_df <- tidy_roc(roc_obj)
        threshold <- roc_df |>
            filter(specificity == 1) |>
            pull(thresholds) |>
            max()
        threshold
    }
)

# Export to JSON #######
final_export <- list(
    control_means = control_means_export,
    control_sds = control_sds_export,
    specificity_100 = spec_thresholds
)
final_export |>
    write_json("app/_model/data_summary_v1.json", digits = 20, auto_unbox = TRUE, pretty = TRUE)