import { Link } from "react-router-dom";

const DynamicSectionRenderer = ({ type, data }) => {
  if (!type || !data || (Array.isArray(data) && data.length === 0)) return null;

  switch (type) {
    case "populate_offerings_outcomes_school":
      return (
        <div className='outcome-offering-list'>
          <ul className='button-list'>
            {data.map((offering) => (
              <li key={offering.id || offering.slug}>
                <Link className='btn' to={`/offering/${offering.slug}`}>
                  {offering.title}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      );

    case "populate_offerings_outcomes_interest_school":
      return (
        <div className='interest-group'>
          {Object.entries(data).map(([interest, offerings]) => (
            <div key={interest}>
              <h5>{interest}</h5>
              {offerings.length === 0 ? (
                <p className='no-programs-message'>
                  No programs were found for this interest at this school.
                </p>
              ) : (
                <>
                  <ul className='list-disc list-inside'>
                    {offerings.map((offering) => (
                      <li key={offering.id || offering.slug}>
                        <Link className='btn' to={`/offering/${offering.slug}`}>
                          {offering.title}
                        </Link>
                      </li>
                    ))}
                  </ul>
                  <Link
                    className='underline_text'
                    to={`/other-interests?interest=${encodeURIComponent(
                      interest
                    )}`}>
                    Options at Other FCPS Schools
                  </Link>
                </>
              )}
            </div>
          ))}
        </div>
      );

    case "populate_offerings_technical_interests_school":
      return (
        <div className='interest-group'>
          {Object.entries(data).map(([interest, offerings]) => (
            <div key={interest}>
              <h5>{interest}</h5>
              {offerings.length === 0 ? (
                <p className='no-programs-message'>
                  No programs were found for this interest at this school.
                </p>
              ) : (
                <>
                  <ul className='list-disc list-inside'>
                    {offerings.map((offering) => (
                      <li key={offering.id || offering.slug}>
                        <Link className='btn' to={`/offering/${offering.slug}`}>
                          {offering.title}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </>
              )}
            </div>
          ))}
        </div>
      );

    case "populate_external_school_link":
      return (
        <a
          className='btn school-link'
          href={data}
          target='_blank'
          rel='noopener noreferrer'>
          Visit School Website
        </a>
      );

    case "populate_offerings_outcomes_magnet":
    case "populate_offerings_outcomes_magnet_interest":
      return <p>Magnet-specific data goes here.</p>;

    default:
      return null;
  }
};

export default DynamicSectionRenderer;
