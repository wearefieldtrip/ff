import { Outlet } from "react-router-dom";
import usePageTracking from "../../hooks/usePageTracking";
import { PageProvider } from "../../context/PageContext";
import { UserFlowProvider } from "../../context/UserFlowContext";
import NavBar from "../ui/NavBar";
import ScrollToTop from "./ScrollTop";

const AppLayout = () => {
  usePageTracking();

  return (
    <PageProvider>
      <UserFlowProvider>
        <div className='app-frame'>
          <div className='app-content'>
            <ScrollToTop />
            <Outlet />
          </div>
          <NavBar />
        </div>
      </UserFlowProvider>
    </PageProvider>
  );
};

export default AppLayout;
