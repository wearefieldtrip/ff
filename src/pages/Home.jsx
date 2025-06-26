import { useEffect } from "react";
import { Link } from "react-router-dom";
import { usePage } from "../context/PageContext";
import useGoogleTranslate from "../hooks/useGoogleTranslate";
import fcpsLogo from "../assets/images/fcps-logo.svg";
import homeHero from "../assets/images/home-hero.jpeg";
import ffLogo from "../assets/images/fayette-forward-logo.svg";

function Home() {
  const { setPageMeta } = usePage();

  useEffect(() => {
    setPageMeta({ hideComponent: true });
  }, [setPageMeta]);

  useGoogleTranslate();

  return (
    <div className='page page-home'>
      <div className='top'>
        <div className='logo'>
          <img src={fcpsLogo} alt='FCPS Logo' />
        </div>
        <div
          id='google_translate_element'
          style={{
            position: "static",
          }}></div>
      </div>
      <div className='bottom'>
        <div className='col-left'>
          <h1 className='large'>
            Fayette Forward offers learning options where students choose their
            path and pace.
          </h1>
          <img
            className='hero-image'
            src={homeHero}
            alt='A graduate in a maroon cap and gown celebrates with a raised arm at a high school graduation ceremony, with a crowd and stage in the background.'
          />
        </div>
        <div className='col-right'>
          <img className='ff-logo' src={ffLogo} alt='Fayette Logo' />
          <p className='explainer body-large'>
            With Fayette Forward at FCPS, students have more opportunities,
            resources, and programs to create their own educational path and
            explore personal dreams.
          </p>
          <Link to={"/basics"} className='button aqua bolded'>
            Explore your options
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
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Home;
