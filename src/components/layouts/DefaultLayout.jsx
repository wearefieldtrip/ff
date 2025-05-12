import { Outlet } from "react-router-dom";

const DefaultLayout = () => {
  return (
    <div className='app-container'>
      <main className='stage'>
        <Outlet />
      </main>
    </div>
  );
};

export default DefaultLayout;
