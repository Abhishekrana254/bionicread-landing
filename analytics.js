/** BionicRead — Google Ads + GA4. Paste GA4 ID after creating property (see GA4_SETUP.md). */
window.SITE_CONFIG = {
  API_URL: "http://localhost:8000",
  CHROME_STORE_URL:
    "https://chromewebstore.google.com/detail/bionicread-%E2%80%94-read-faster/dcbcoigmnpinomaciejlmgoicnpipkpk",
  SUPPORT_EMAIL: "abhishekrana254@gmail.com",
  ADS_ID: "AW-18278709652",
  GA4_MEASUREMENT_ID: "G-6JGEF80W2X",
  STORE_CLICK_CONVERSION: "AW-18278709652/JjMaCL6yhsccEJTz-4tE",
};

(function initGtag() {
  const cfg = window.SITE_CONFIG;
  const loaderId = cfg.GA4_MEASUREMENT_ID || cfg.ADS_ID;

  window.dataLayer = window.dataLayer || [];
  function gtag() {
    window.dataLayer.push(arguments);
  }
  window.gtag = gtag;

  const script = document.createElement("script");
  script.async = true;
  script.src = `https://www.googletagmanager.com/gtag/js?id=${loaderId}`;
  document.head.appendChild(script);

  gtag("js", new Date());
  gtag("config", cfg.ADS_ID);
  if (cfg.GA4_MEASUREMENT_ID) {
    gtag("config", cfg.GA4_MEASUREMENT_ID, {
      send_page_view: true,
      allow_google_signals: true,
    });
  }
})();

window.trackGa4 = function (eventName, params) {
  if (!window.SITE_CONFIG.GA4_MEASUREMENT_ID || typeof gtag !== "function") return;
  gtag("event", eventName, params || {});
};
