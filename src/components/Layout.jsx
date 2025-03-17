const Layout = ({ children }) => {
  return (
    <div className='app-container'>
      <main className='stage'>{children}</main>
    </div>
  );
};

export default Layout;
