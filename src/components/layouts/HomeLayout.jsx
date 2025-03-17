import { Outlet } from "react-router-dom";

const HomeLayout = () => {
  return (
    <div className='app-container'>
      <main className='stage'>
        <Outlet />
      </main>
    </div>
  );
};

export default HomeLayout;
