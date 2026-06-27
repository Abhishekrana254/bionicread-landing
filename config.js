const SITE_CONFIG = {
  API_URL: "http://localhost:8000",
  CHROME_STORE_URL:
    "https://chromewebstore.google.com/detail/bionicread-%E2%80%94-read-faster/dcbcoigmnpinomaciejlmgoicnpipkpk",
  SUPPORT_EMAIL: "abhishekrana254@gmail.com",
  ADS_ID: "AW-18278709652",
};

document.addEventListener("DOMContentLoaded", () => {
  document.querySelectorAll("#chromeLink, #heroChromeBtn").forEach((el) => {
    if (el && SITE_CONFIG.CHROME_STORE_URL) el.href = SITE_CONFIG.CHROME_STORE_URL;
  });

  document.querySelectorAll("#chromeLink, #heroChromeBtn").forEach((el) => {
    el.addEventListener("click", () => {
      if (typeof gtag === "function") {
        gtag("event", "install_click", {
          event_category: "conversion",
          event_label: "chrome_store",
        });
      }
    });
  });
});
