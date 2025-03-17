import { Outlet } from "react-router-dom";

const DefaultLayout = () => {
  return (
    <div className='default-app-container'>
      <main className='stage'>
        <Outlet />
      </main>
    </div>
  );
};

export default DefaultLayout;
