import { useEffect } from "react";

export default function useGoogleTranslate(show = true) {
  useEffect(() => {
    if (!show) return;

    const containerId = "google_translate_element";

    // Define the init callback only once
    if (!window.googleTranslateElementInit) {
      window.googleTranslateElementInit = () => {
        const container = document.getElementById(containerId);
        const alreadyLoaded = container?.querySelector(".goog-te-combo");

        if (!container || alreadyLoaded) return;

        if (
          window.google &&
          window.google.translate &&
          typeof window.google.translate.TranslateElement === "function"
        ) {
          new window.google.translate.TranslateElement(
            { pageLanguage: "en" },
            containerId
          );
        }
      };
    }

    // Inject script once globally
    if (!document.getElementById("google-translate-script")) {
      const script = document.createElement("script");
      script.id = "google-translate-script";
      script.src =
        "//translate.google.com/translate_a/element.js?cb=googleTranslateElementInit";
      script.async = true;
      document.body.appendChild(script);
    }

    // 🔁 Poll for the widget container becoming available
    const interval = setInterval(() => {
      const container = document.getElementById(containerId);
      const alreadyLoaded = container?.querySelector(".goog-te-combo");

      if (
        typeof window.googleTranslateElementInit === "function" &&
        container &&
        !alreadyLoaded
      ) {
        window.googleTranslateElementInit();
        clearInterval(interval);
      }
    }, 300);

    return () => clearInterval(interval);
  }, [show]);
}
