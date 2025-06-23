export const trackEvent = ({ action, ...rest }) => {
  if (typeof window.gtag !== "undefined") {
    window.gtag("event", action, rest);
  }
};
