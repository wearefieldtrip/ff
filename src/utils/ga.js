export const trackEvent = ({ action, ...params }) => {
  if (typeof window.gtag === "function") {
    window.gtag("event", action, params);
    //console.log(`[Analytics] ${action}`, params);
  } else {
    console.warn("GA not ready:", action, params);
  }
};
