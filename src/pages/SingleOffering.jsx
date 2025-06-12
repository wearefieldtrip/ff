import { useUserFlow } from "../context/UserFlowContext";
import { usePage } from "../context/PageContext";
import PageHeader from "../components/ui/PageHeader";
import { useEffect } from "react";

function SingleOffering() {
  const { userFlow } = useUserFlow();
  const { setPageMeta } = usePage();
  const hasVideo = false;

  useEffect(() => {
    setPageMeta({
      showNext: false,
      canProceed: false,
      hideComponent: false,
    });
  }, [userFlow.gradeLevel, userFlow.homeSchool, setPageMeta]);

  return (
    <div className='page-single-offering page'>
      <PageHeader
        title='Dual Credit'
        subtitle="What's most important to ? / Get a Head Start on College"
        flip={true}
      />
      <div className='content-wrapper full'>
        <div className='col'>
          <div className='text-block'>
            <h3>What is Dual Credit?</h3>
            <p>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
              enim ad minim veniam, quis nostrud exercitation ullamco laboris
              nisi ut aliquip ex ea commodo consequat.
            </p>
          </div>
          <div className='text-block'>
            <h3>Why Dual Credit?</h3>
            <p>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
              enim ad minim veniam, quis nostrud exercitation ullamco laboris
              nisi ut aliquip ex ea commodo consequat.
            </p>
          </div>
        </div>
        <div className='col'>
          <div className='media'>
            {hasVideo ? (
              <div className='video'>
                <iframe
                  width='560'
                  height='315'
                  src='https://www.youtube.com/embed/YCNwIrAISek?si=xGWXCYuz0WeZxCWL'
                  title='YouTube video player'
                  frameborder='0'
                  allow='accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share'
                  referrerpolicy='strict-origin-when-cross-origin'
                  allowfullscreen></iframe>
              </div>
            ) : (
              <div className='image'>
                <img src='/images/47e7668a1c92dc3f6efc28b441a5331f15e0b0be.jpg' />
              </div>
            )}
          </div>
          <a
            className='offering-url btn'
            href='https://www.fcps.net/leaders-support/departments-offices/teaching-learning/teaching-learning/advanced-learning-opportunities/dual-credit-dual-enrollment'
            target='_blank'>
            Learn more about Dual Credit
          </a>
        </div>
      </div>
    </div>
  );
}

export default SingleOffering;
