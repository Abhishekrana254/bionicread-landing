/** BionicRead — Google Ads + GA4. Keep IDs in sync with gtag snippet in each HTML <head>. */
window.SITE_CONFIG = {
  API_URL: "http://localhost:8000",
  CHROME_STORE_URL:
    "https://chromewebstore.google.com/detail/bionicread-%E2%80%94-read-faster/dcbcoigmnpinomaciejlmgoicnpipkpk",
  SUPPORT_EMAIL: "abhishekrana254@gmail.com",
  ADS_ID: "AW-18278709652",
  GA4_MEASUREMENT_ID: "G-6JGEF80W2X",
  STORE_CLICK_CONVERSION: "AW-18278709652/JjMaCL6yhsccEJTz-4tE",
};

window.trackGa4 = function (eventName, params) {
  if (!window.SITE_CONFIG.GA4_MEASUREMENT_ID || typeof gtag !== "function") return;
  gtag("event", eventName, params || {});
};
