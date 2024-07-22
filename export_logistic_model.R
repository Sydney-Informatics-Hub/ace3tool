library(tidyverse)
library(jsonlite)
library(readr)
library(stringr)

model <- readr::read_rds("data/dementia_final_model.rds")

coefs <- coef(model) %>%
    set_names(~ .x %>%
                  str_remove_all("^\\(|\\)$") %>%
                  str_remove("ACEIII..Subtotal") %>%
                  str_to_lower())

coefs %>%
    as.list() %>%
    toJSON(digits=20, auto_unbox = TRUE)

coef_export <- list(
    intercept = coefs[1],
    coefs = as.list(coefs[2:length(coefs)])
)

vcov_matrix <- vcov(model)
vcov_matrix %>%
    toJSON(digits = 20)


model_export <- list(
    coefs = coef_export,
    vcov = vcov_matrix
)

model_export %>%
    write_json("app/_data/logistic_model_v1.json", digits = 20, auto_unbox = TRUE, pretty = TRUE)