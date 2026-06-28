document.addEventListener("DOMContentLoaded", () => {
  const cfg = window.SITE_CONFIG;

  document.querySelectorAll("#chromeLink, #heroChromeBtn").forEach((el) => {
    if (el && cfg.CHROME_STORE_URL) el.href = cfg.CHROME_STORE_URL;
  });

  document.querySelectorAll("#chromeLink, #heroChromeBtn").forEach((el) => {
    el.addEventListener("click", (e) => {
      const url = cfg.CHROME_STORE_URL;
      if (!url) return;

      e.preventDefault();
      let navigated = false;
      const go = () => {
        if (navigated) return;
        navigated = true;
        window.location.href = url;
      };

      trackGa4("chrome_store_click", {
        event_category: "conversion",
        event_label: "landing_button",
        value: 1,
      });

      if (typeof gtag === "function" && cfg.STORE_CLICK_CONVERSION) {
        gtag("event", "conversion", {
          send_to: cfg.STORE_CLICK_CONVERSION,
          event_callback: go,
        });
        trackGa4("install_click", { event_category: "conversion", event_label: "chrome_store" });
        setTimeout(go, 1000);
        return;
      }

      go();
    });
  });
});
