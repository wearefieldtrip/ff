import { Link } from "react-router-dom";
import ffLogo from "../../assets/images/fcps-logo-internal.svg";

function PageHeader({ title, subtitle, flip, logo = true }) {
  return (
    <div className={`page-header ${flip ? "flip" : ""}`}>
      {logo && (
        <Link to='/' className='nav-logo' aria-label='Home'>
          <img className='ff-logo-internal' src={ffLogo} alt='Fayette Logo' />
        </Link>
      )}
      <h1>{title}</h1>
      {subtitle && <p>{subtitle}</p>}
    </div>
  );
}

export default PageHeader;
