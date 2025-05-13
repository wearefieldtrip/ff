import { Outlet } from "react-router-dom";
import NavBar from "../components/ui/NavBar";

const DefaultLayout = () => {
  return (
    <div className='app-container'>
      <Outlet />
      <NavBar />
    </div>
  );
};

export default DefaultLayout;
