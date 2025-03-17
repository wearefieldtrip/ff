import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "../pages/Home";
import Basics from "../pages/Basics";
import Review from "../pages/Review";
import Outcomes from "../pages/Outcomes";
import Results from "../pages/Results";
import SingleProgram from "../pages/SingleProgram";
import NotFound from "../pages/NotFound";

const AppRouter = () => {
  return (
    <Router>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/basics' element={<Basics />} />
        <Route path='/review' element={<Review />} />
        <Route path='/outcomes' element={<Outcomes />} />
        <Route path='/results' element={<Results />} />
        <Route path='/single-program' element={<SingleProgram />} />
        <Route path='*' element={<NotFound />} />
      </Routes>
    </Router>
  );
};

export default AppRouter;
