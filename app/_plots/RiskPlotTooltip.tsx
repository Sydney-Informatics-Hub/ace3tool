import React from "react";

export const RiskPlotTooltip = () => (
  <>
    <h2 className="font-bold">Dementia risk value</h2>
    <p className="mb-2">This value represents the estimated risk of dementia, calculated using modelled scores from ACE‑III cognitive subdomains.</p>

    <p className="font-bold">Risk thresholds:</p>
    <p className="mb-2">Risk is categorised using age-specific recommended thresholds</p>

    <p>Adults aged 50–79 years (FRONTIER cohort)</p>
    <ul className="list-disc ml-6 mb-2">
      <li>Low risk: &lt; 76%</li>
      <li>Intermediate risk: 76–94%</li>
      <li>High risk: ≥95%</li>
    </ul>

    <p>Older adults (≥ 80 years) (MAS cohort)</p>
    <ul className="list-disc ml-6">
      <li>Low risk: &lt; 96.30%</li>
      <li>Intermediate risk: 96.31–99.94%</li>
      <li>High risk: ≥ 99.95%</li>
    </ul>
  </>
);
