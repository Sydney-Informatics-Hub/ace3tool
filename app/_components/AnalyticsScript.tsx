import Script from "next/script";

const COUNT_URL = "https://ace3tool.goatcounter.com/count";

/** Load the script for GoatCounter analytics.
 */
export default function AnalyticsScript() {
  return (
    <Script
      src="//gc.zgo.at/count.js"
      data-goatcounter={COUNT_URL}
      data-goatcounter-settings='{"no_onload": true}'
      async
      strategy="afterInteractive"
    />
  );
}
