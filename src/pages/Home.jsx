import fcpsLogo from "../assets/images/fcps-logo.svg";
import homeHero from "../assets/images/home-hero.jpeg";
import ffLogo from "../assets/images/fayette-forward-logo.svg";
import { Link } from "react-router-dom";
import { useEffect } from "react";
import { usePage } from "../context/PageContext";

function Home() {
  const { setPageMeta } = usePage();

  useEffect(() => {
    setPageMeta({ hideComponent: true });
  }, []);

  return (
    <div className='page-home'>
      <div className='col-group-1'>
        <div className='logo'>
          <img src={fcpsLogo} alt='FCPS Logo' />
        </div>
        <div className='translate'>(Translate)</div>
      </div>
      <div className='col-group-2'>
        <div className='col col-left'>
          <h1 className='large-heading-one'>
            Fayette Forward offers learning options where students choose their
            path and pace.
          </h1>
          <img
            className='hero-image'
            src={homeHero}
            alt='A graduate in a maroon cap and gown celebrates with a raised arm at a high school graduation ceremony, with a crowd and stage in the background.'
          />
        </div>
        <div className='col col-right'>
          <img className='ff-logo' src={ffLogo} alt='Fayette Logo' />
          <Link to={"/basics"} className='group'>
            <h3>Explore your options</h3>
            <svg
              xmlns='http://www.w3.org/2000/svg'
              width='60'
              height='60'
              viewBox='0 0 60 60'
              fill='none'>
              <rect
                x='59'
                y='59'
                width='58'
                height='58'
                rx='29'
                transform='rotate(180 59 59)'
                stroke='white'
                stroke-width='2'
              />
              <path
                d='M31.27 45.13C31.27 36.53 38.24 29.56 46.84 29.56'
                stroke='white'
                stroke-width='2'
                stroke-miterlimit='10'
              />
              <path
                d='M46.84 29.57C38.24 29.57 31.27 22.6 31.27 14'
                stroke='white'
                stroke-width='2'
                stroke-miterlimit='10'
              />
              <path
                d='M46.84 29.57H14'
                stroke='white'
                stroke-width='2'
                stroke-miterlimit='10'
              />
            </svg>
          </Link>
        </div>
      </div>
    </div>
  );
}
export default Home;
