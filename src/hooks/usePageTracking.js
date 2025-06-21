import { useEffect } from "react";
import { useLocation } from "react-router-dom";

const usePageTracking = () => {
  const location = useLocation();

  useEffect(() => {
    if (window.gtag) {
      window.gtag("config", "G-1WPV2ZYM2Y", {
        page_path: location.pathname,
      });
    }
  }, [location]);
};

export default usePageTracking;
