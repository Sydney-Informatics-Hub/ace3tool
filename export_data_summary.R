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

# Long data format - useful for some summaries
data_long <- data |>
    select(dementia, Attention, Memory, Fluency, Language, Visuospatial, Total=TotalScore) |>
    pivot_longer(cols = -dementia, names_to="scale", values_to="score")

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

dementia_means <- score_summary |>
    filter(dementia == "Dementia", stat == "mean")

dementia_means_export <- dementia_means$value |>
    set_names(dementia_means$score |> str_to_lower()) |>
    as.list()

dementia_sds <- score_summary |>
    filter(dementia == "Dementia", stat == "sd")

dementia_sds_export <- dementia_sds$value |>
    set_names(dementia_sds$score |> str_to_lower()) |>
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

# Distribution summary ######
# Prop-scaled: rescale the proportions so that the maximum for each scale = 1
dist_summary <- data_long |>
    group_by(dementia, scale, score) |>
    count() |>
    group_by(dementia, scale) |>
    mutate(prop = n / sum(n) * 100, total = sum(n)) |>
    # Group by scale and dementia or just scale when scaling these?
    # group_by(scale) |>
    mutate(prop_scaled = prop / max(prop))


 dist_export <- purrr::map(c("dementia", "control") |> set_names(), function(group) {
     level <- ifelse(group == "dementia", "Dementia", "Non-dementia")
     df <- dist_summary |>
         group_by(scale) |>
         filter(dementia == level) |>
         select(scale, score, prop, prop_scaled) |>
         ungroup()
 })

# Export to JSON #######
final_export <- list(
    control_means = control_means_export,
    control_sds = control_sds_export,
    dementia_means = dementia_means_export,
    dementia_sds = dementia_sds_export,
    specificity_100 = spec_thresholds
)
final_export |>
    write_json("app/_model/data_summary_v1.json", digits = 20, auto_unbox = TRUE, pretty = TRUE)

dist_export |>
    write_json("app/_model/dist_summary_v1.json", digits = 2, pretty = TRUE)