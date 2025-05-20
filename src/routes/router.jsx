import {
  BrowserRouter as Router,
  Routes,
  Route,
  Outlet,
} from "react-router-dom";
import Home from "../pages/Home";
import Basics from "../pages/Basics";
import Interests from "../pages/Interests";
import Outcomes from "../pages/Outcomes";
import Results from "../pages/Results";
import SingleProgram from "../pages/SingleProgram";
import NotFound from "../pages/NotFound";
import { PageProvider } from "../context/PageContext";
import { UserFlowProvider } from "../context/UserFlowContext";
import NavBar from "../components/ui/NavBar";
import RequireSchool from "../components/guards/RequireSchool";

const AppRouter = () => {
  const AppLayout = () => (
    <PageProvider>
      <UserFlowProvider>
        <div className='app-container'>
          <Outlet />
          <NavBar />
        </div>
      </UserFlowProvider>
    </PageProvider>
  );

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
            path='/results'
            element={
              <RequireSchool>
                <Results />
              </RequireSchool>
            }
          />
          <Route
            path='/single-program'
            element={
              <RequireSchool>
                <SingleProgram />
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
