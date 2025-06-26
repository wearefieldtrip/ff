import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "../pages/Home";
import Basics from "../pages/Basics";
import Interests from "../pages/Interests";
import Outcomes from "../pages/Outcomes";
import SingleOutcome from "../pages/SingleOutcome";
import SingleProgram from "../pages/SingleProgram";
import NotFound from "../pages/NotFound";
import OtherOptions from "../pages/OtherOptions";
import OtherIntersts from "../pages/OtherInterests";
import RequireSchool from "../components/layouts/RequireSchool";
import AppLayout from "../components/layouts/AppLayout";

const AppRouter = () => {
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
            path='/program/:slug'
            element={
              <RequireSchool>
                <SingleProgram />
              </RequireSchool>
            }
          />
          <Route
            path='/other-programs'
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
