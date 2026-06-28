const SITE_CONFIG = {
  API_URL: "http://localhost:8000",
  CHROME_STORE_URL:
    "https://chromewebstore.google.com/detail/bionicread-%E2%80%94-read-faster/dcbcoigmnpinomaciejlmgoicnpipkpk",
  SUPPORT_EMAIL: "abhishekrana254@gmail.com",
  ADS_ID: "AW-18278709652",
  // Filled by scripts/google-ads/setup_store_click_conversion.py
  STORE_CLICK_CONVERSION: "AW-18278709652/JjMaCL6yhsccEJTz-4tE",
};

document.addEventListener("DOMContentLoaded", () => {
  document.querySelectorAll("#chromeLink, #heroChromeBtn").forEach((el) => {
    if (el && SITE_CONFIG.CHROME_STORE_URL) el.href = SITE_CONFIG.CHROME_STORE_URL;
  });

  document.querySelectorAll("#chromeLink, #heroChromeBtn").forEach((el) => {
    el.addEventListener("click", (e) => {
      const url = SITE_CONFIG.CHROME_STORE_URL;
      if (!url) return;

      if (typeof gtag !== "function" || !SITE_CONFIG.STORE_CLICK_CONVERSION) return;

      e.preventDefault();
      let navigated = false;
      const go = () => {
        if (navigated) return;
        navigated = true;
        window.location.href = url;
      };

      gtag("event", "conversion", {
        send_to: SITE_CONFIG.STORE_CLICK_CONVERSION,
        event_callback: go,
      });
      gtag("event", "install_click", {
        event_category: "conversion",
        event_label: "chrome_store",
      });
      setTimeout(go, 1000);
    });
  });
});
