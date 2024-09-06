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

# TODO: don't seem to have some variables: Goldman score, education
exported_data <- data %>%
    select(dementia, total=TotalScore, sex=Sex, learning_difficulties=LearningDifficulties, age_group=AgeGroup)

list(data = exported_data) |>
    jsonlite::write_json("app/_model/full_data_v1.json", dataframe = "rows")