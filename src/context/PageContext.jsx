import { createContext, useContext, useState } from "react";

const PageContext = createContext();

export const PageProvider = ({ children }) => {
  const [pageMeta, setPageMeta] = useState({
    nextPage: null,
    showNext: false,
    canProceed: false,
    hideComponent: false,
  });

  return (
    <PageContext.Provider value={{ pageMeta, setPageMeta }}>
      {children}
    </PageContext.Provider>
  );
};

export const usePage = () => useContext(PageContext);
