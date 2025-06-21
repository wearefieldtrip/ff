import {
  BrowserRouter as Router,
  Routes,
  Route,
  Outlet,
} from "react-router-dom";
import useGoogleTranslate from "../hooks/useGoogleTranslate";
import { useLocation } from "react-router-dom";
import Home from "../pages/Home";
import Basics from "../pages/Basics";
import Interests from "../pages/Interests";
import Outcomes from "../pages/Outcomes";
import Results from "../pages/SingleOutcome";
import SingleOffering from "../pages/SingleOffering";
import NotFound from "../pages/NotFound";
import { PageProvider } from "../context/PageContext";
import { UserFlowProvider } from "../context/UserFlowContext";
import NavBar from "../components/ui/NavBar";
import RequireSchool from "../components/guards/RequireSchool";
import SingleOutcome from "../pages/SingleOutcome";
import OtherOptions from "../pages/OtherOptions";
import OtherIntersts from "../pages/OtherInterests";
import usePageTracking from "../hooks/usePageTracking";

const AppRouter = () => {
  const AppLayout = () => {
    const location = useLocation();
    const isHome = location.pathname === "/";

    useGoogleTranslate();
    usePageTracking();

    return (
      <PageProvider>
        <UserFlowProvider>
          <div className='app-container'>
            <div
              id='google_translate_element'
              style={{
                position: "absolute",
                visibility: isHome ? "visible" : "hidden",
                display: isHome ? "block" : "none",
                zIndex: 9999,
              }}></div>
            <Outlet />
            <NavBar />
          </div>
        </UserFlowProvider>
      </PageProvider>
    );
  };

  return (
    <Router>
      <Routes>
        <Route element={<AppLayout />}>
          <Route path='/' element={<Home />} />
          <Route path='/basics' element={<Basics />} />
          <Route
            path='/interests'
            element={
              <RequireSchool>
                <Interests />
              </RequireSchool>
            }
          />
          <Route
            path='/outcomes'
            element={
              <RequireSchool>
                <Outcomes />
              </RequireSchool>
            }
          />
          <Route
            path='/outcome/:slug'
            element={
              <RequireSchool>
                <SingleOutcome />
              </RequireSchool>
            }
          />
          <Route
            path='/offering/:slug'
            element={
              <RequireSchool>
                <SingleOffering />
              </RequireSchool>
            }
          />
          <Route
            path='/other-offerings'
            element={
              <RequireSchool>
                <OtherOptions />
              </RequireSchool>
            }
          />
          <Route
            path='/other-interests'
            element={
              <RequireSchool>
                <OtherIntersts />
              </RequireSchool>
            }
          />
          <Route path='*' element={<NotFound />} />
        </Route>
      </Routes>
    </Router>
  );
};

export default AppRouter;
