import { Outlet } from "react-router-dom";

const HomeLayout = () => {
  return (
    <div className='app-container'>
      <Outlet />
    </div>
  );
};

export default HomeLayout;
