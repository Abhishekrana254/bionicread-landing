/** BionicRead — GA4 (direct collect) + Google Ads (gtag). */
window.SITE_CONFIG = {
  API_URL: "http://localhost:8000",
  CHROME_STORE_URL:
    "https://chromewebstore.google.com/detail/bionicread-%E2%80%94-read-faster/dcbcoigmnpinomaciejlmgoicnpipkpk",
  SUPPORT_EMAIL: "abhishekrana254@gmail.com",
  ADS_ID: "AW-18278709652",
  GA4_MEASUREMENT_ID: "G-6JGEF80W2X",
  STORE_CLICK_CONVERSION: "AW-18278709652/JjMaCL6yhsccEJTz-4tE",
};

(function initAnalytics() {
  const cfg = window.SITE_CONFIG;
  const tid = cfg.GA4_MEASUREMENT_ID;
  const debug = location.search.includes("debug=1");

  function storeGet(key) {
    try {
      return localStorage.getItem(key);
    } catch {
      return null;
    }
  }

  function storeSet(key, value) {
    try {
      localStorage.setItem(key, value);
    } catch {
      /* private browsing */
    }
  }

  function clientId() {
    let cid = storeGet("_br_ga_cid");
    if (!cid) {
      cid = (crypto.randomUUID && crypto.randomUUID()) || `${Date.now()}.${Math.random()}`;
      storeSet("_br_ga_cid", cid);
    }
    return cid;
  }

  function sessionId() {
    try {
      let sid = sessionStorage.getItem("_br_ga_sid");
      if (!sid) {
        sid = String(Date.now());
        sessionStorage.setItem("_br_ga_sid", sid);
      }
      return sid;
    } catch {
      return String(Date.now());
    }
  }

  function sendGa4(eventName, params) {
    if (!tid) return;
    const body = new URLSearchParams({
      v: "2",
      tid,
      cid: clientId(),
      en: eventName,
      dl: location.href,
      dr: document.referrer || "",
      dt: document.title || "",
      sid: sessionId(),
      sct: "1",
      seg: "1",
    });
    if (debug) body.set("_dbg", "1");
    if (params) {
      for (const [key, value] of Object.entries(params)) {
        body.set(key.startsWith("ep.") ? key : `ep.${key}`, String(value));
      }
    }
    const url = "https://www.google-analytics.com/g/collect";
    if (navigator.sendBeacon) {
      navigator.sendBeacon(url, body);
      return;
    }
    fetch(url, { method: "POST", body, keepalive: true, mode: "no-cors" }).catch(() => {});
  }

  window.trackGa4 = sendGa4;

  function sendPageView() {
    sendGa4("page_view");
  }
  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", sendPageView);
  } else {
    sendPageView();
  }

  /* G-6JGEF80W2X returns 404 on gtag/js — load Ads tag only (verified 200). */
  window.dataLayer = window.dataLayer || [];
  function gtag() {
    window.dataLayer.push(arguments);
  }
  window.gtag = gtag;
  const adsScript = document.createElement("script");
  adsScript.async = true;
  adsScript.src = `https://www.googletagmanager.com/gtag/js?id=${cfg.ADS_ID}`;
  document.head.appendChild(adsScript);
  gtag("js", new Date());
  gtag("config", cfg.ADS_ID);
})();
