import { useEffect } from "react";
import { Link } from "react-router-dom";
import { usePage } from "../context/PageContext";
import fcpsLogo from "../assets/images/fcps-logo.svg";

function NotFound() {
  const { setPageMeta } = usePage();

  useEffect(() => {
    setPageMeta({
      hideComponent: true,
    });
  }, [setPageMeta]);

  return (
    <div className='page-error page'>
      <div className='logo'>
        <img src={fcpsLogo} alt='FCPS Logo' />
      </div>
      <div className='col-group'>
        <div className='col'>
          <span className='error404'>404</span>
        </div>
        <div className='col'>
          <h1>This page does not exist</h1>
          <Link to='/' className='btn'>
            Go to home screen
          </Link>
        </div>
      </div>
    </div>
  );
}

export default NotFound;
