import { useEffect } from "react";
import { useLocation } from "react-router-dom";

const GA_MEASUREMENT_ID = "G-1WPV2ZYM2Y";

const usePageTracking = () => {
  const location = useLocation();

  useEffect(() => {
    if (import.meta.env.MODE !== "production") return;

    if (!window.gtag) {
      // Load GA script
      const script1 = document.createElement("script");
      script1.async = true;
      script1.src = `https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}&l=dataLayer`;
      document.head.appendChild(script1);

      const script2 = document.createElement("script");
      script2.innerHTML = `
        window.dataLayer = window.dataLayer || [];
        function gtag(){dataLayer.push(arguments);}
        gtag('js', new Date());
        gtag('config', '${GA_MEASUREMENT_ID}', { 
          send_page_view: false,
          debug_mode: false 
        });
      `;
      document.head.appendChild(script2);
    }
  }, []);

  useEffect(() => {
    if (import.meta.env.MODE !== "production") return;

    if (window.gtag) {
      window.gtag("event", "page_view", {
        page_path: location.pathname + location.search,
        page_location: window.location.href,
        page_title: document.title,
      });
    }
  }, [location]);
};

export default usePageTracking;
