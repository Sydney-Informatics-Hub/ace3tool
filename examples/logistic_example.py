import pandas as pd
import statsmodels.api as sm
import statsmodels.formula.api as smf

data = pd.read_csv("https://stats.idre.ucla.edu/stat/data/binary.csv")

model = smf.glm("admit ~ gre + gpa + rank", data=data, family=sm.families.Binomial()).fit()

print(model.summary())

intercept = model.params["Intercept"]

print(model.params.to_dict())
print(model.predict( { "gre": 800.0, "gpa": 4.0, "rank": 1.0 }).iloc[0])
p = model.get_prediction( { "gre": 800.0, "gpa": 4.0, "rank": 1.0 })
print(f"Predicted: {p.predicted}, CI: {p.conf_int()}, 50% CI: {p.conf_int(alpha=0.5)}")

vcov = model.normalized_cov_params
vcov_array = [
    [v for k, v in row.items()]
    for outer_k, row in vcov.to_dict().items()
]