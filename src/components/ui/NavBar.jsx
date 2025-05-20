import { Link, useNavigate } from "react-router-dom";
import { usePage } from "../../context/PageContext";
import ffLogo from "../../assets/images/ff-logo-green.svg";

function NavBar({ onNext }) {
  const { pageMeta } = usePage();
  const navigate = useNavigate();

  if (pageMeta?.hideComponent) return null;

  const handleBack = () => navigate(-1);
  const handleNext = () => {
    if (pageMeta.canProceed && onNext) {
      onNext();
    } else if (pageMeta.canProceed && pageMeta.nextPage) {
      navigate(pageMeta.nextPage);
    }
  };
  return (
    <div className='nav-bar'>
      <div className='nav-wrapper'>
        <button onClick={handleBack} aria-label='Back'>
          <svg
            xmlns='http://www.w3.org/2000/svg'
            width='30'
            height='29'
            viewBox='0 0 30 29'
            fill='none'>
            <path
              d='M14.2236 0.346073C14.2236 8.20235 7.8564 14.5696 0.000126098 14.5696'
              stroke='#223970'
              strokeWidth='2.5'
              strokeMiterlimit='10'
            />
            <path
              d='M0.000124854 14.5604C7.8564 14.5604 14.2236 20.9277 14.2236 28.7839'
              stroke='#223970'
              strokeWidth='2.5'
              strokeMiterlimit='10'
            />
            <path
              d='M-1.48929e-07 14.5604L30 14.5604'
              stroke='#223970'
              strokeWidth='2.5'
              strokeMiterlimit='10'
            />
          </svg>
          Back
        </button>

        <Link to='/' className='nav-logo' aria-label='Home'>
          <img className='ff-logo' src={ffLogo} alt='Fayette Logo' />
        </Link>

        {pageMeta.showNext ? (
          <button
            type='button'
            className={`nav-button ${pageMeta.canProceed ? "active" : ""}`}
            onClick={handleNext}
            aria-label='Next'
            disabled={!pageMeta.canProceed}>
            Next
            <svg
              xmlns='http://www.w3.org/2000/svg'
              width='30'
              height='29'
              viewBox='0 0 30 29'
              fill='none'>
              <path
                d='M15.7764 0C15.7764 7.85628 22.1436 14.2235 29.9999 14.2235'
                stroke='#223970'
                strokeWidth='2.5'
                strokeMiterlimit='10'
              />
              <path
                d='M29.9999 14.2144C22.1436 14.2144 15.7764 20.5816 15.7764 28.4379'
                stroke='#223970'
                strokeWidth='2.5'
                strokeMiterlimit='10'
              />
              <path
                d='M30 14.2144L0 14.2144'
                stroke='#223970'
                strokeWidth='2.5'
                strokeMiterlimit='10'
              />
            </svg>
          </button>
        ) : (
          <div style={{ width: "95px" }} />
        )}
      </div>
    </div>
  );
}

export default NavBar;
