import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useUserFlow } from "../context/UserFlowContext";
import { usePage } from "../context/PageContext";
import PageHeader from "../components/ui/PageHeader";

function SingleOffering() {
  const { slug } = useParams();
  const { userFlow } = useUserFlow();
  const { setPageMeta } = usePage();

  const offering = userFlow.allOfferings.find((o) => o.slug === slug);

  useEffect(() => {
    setPageMeta({
      showNext: false,
      canProceed: false,
      hideComponent: false,
    });
  }, [setPageMeta]);

  if (!offering) {
    return (
      <div className='page-single-offering page'>
        <div className='content-wrapper full'>
          <p>Offering not found.</p>
        </div>
      </div>
    );
  }

  return (
    <div className='page-single-offering page'>
      <PageHeader
        title={offering.title}
        subtitle={`What's most important to you? / ${userFlow.selectedOutcome.title}`}
        flip={true}
      />
      <div className='content-wrapper full'>
        <div className='col'>
          <div className='text-block'>
            <h3>{offering.heading_1}</h3>
            <p>{offering.content_1}</p>
          </div>

          <div className='text-block'>
            <h3>{offering.heading_2}</h3>
            <p>{offering.content_2}</p>
          </div>
        </div>
        <div className='col'>
          <div className='media'>
            {offering.video_url ? (
              <div className='video'>
                <iframe
                  width='560'
                  height='315'
                  src={offering.video_url}
                  title={`${offering.title} video`}
                  frameBorder='0'
                  allow='accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share'
                  referrerPolicy='strict-origin-when-cross-origin'
                  allowFullScreen></iframe>
              </div>
            ) : offering.image_url ? (
              <div className='image'>
                <img
                  src={`https://jihadjwxqtiwztuigkvz.supabase.co/storage/v1/object/public/fayette-forward-photography/${offering.image_url}`}
                  alt={offering.image_alt_text}
                />
              </div>
            ) : (
              <div>Default image here</div>
            )}
          </div>
          {offering.url && (
            <a
              className='offering-url btn'
              href={offering.url}
              target='_blank'
              rel='noopener noreferrer'>
              Learn more about {offering.title}
            </a>
          )}
        </div>
      </div>
    </div>
  );
}

export default SingleOffering;
