library(tidyverse)
library(jsonlite)
library(readr)
library(stringr)
library(gtsummary)
library(readxl)


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

# Get some variables from the raw data set
raw_data <- readxl::read_excel("data/PIPE-4796 Predictors of Dementia final data v1 7-8-2024.xlsx.xlsx")

cleaned_scores <- data |> select(TotalScore, Attention:Visuospatial)
raw_scores <- raw_data |> select(ends_with("(original)"))
matching <- all.equal(cleaned_scores, raw_scores, check.names=FALSE)

if (! matching) {
    stop("Cleaned and raw data scores don't match, shouldn't be combined")
}

# Get variables from raw data
# Apply any grouping here to make sure raw values don't make
#  it into the exported dataset
group_education <- function(x) {
    case_when(
        x < 10 ~ "9 or less",
        x >= 10 & x < 13 ~ "10-12",
        x >= 13 ~ "13+"
    ) %>% as.factor()
}

group_goldman_score <- function(x) {
    case_when(
        is.na(x) ~ "Unknown",
        between(x, 1, 2) ~ "1-2",
        x >= 3 ~ "3+"
    ) %>% as.factor()
}

data <- data |>
    mutate(
        VisitNumber = raw_data$Visit_order |>
            case_match(
                1 ~ "1",
                c(2, 3) ~ "2 - 3",
                4 ~ "4+",
                .default = "4+"
            ) |> as.factor(),
        Education = raw_data$EducationYearsTotal %>%
            group_education(),
        GoldmanScore = raw_data$GoldmanScore %>%
            group_goldman_score()
    )

# Check grouped variables
data |>
    select(VisitNumber, Education, GoldmanScore) |>
    gtsummary::tbl_summary()

exported_data <- data %>%
    select(dementia, total=TotalScore, sex=Sex,
           learning_difficulties=LearningDifficulties,
           age_group=AgeGroup,
           visit_number = VisitNumber,
           education = Education,
           goldman_score = GoldmanScore
           )

list(data = exported_data) |>
    jsonlite::write_json("app/_model/full_data_v1.json", dataframe = "rows")