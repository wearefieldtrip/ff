import { Link } from "react-router-dom";

const renderOfferingList = (offerings) => (
  <div className='link-group'>
    <ul>
      {offerings.map((offering) => (
        <li key={offering.id || offering.slug}>
          <Link className='button' to={`/program/${offering.slug}`}>
            {offering.title}
          </Link>
        </li>
      ))}
    </ul>
  </div>
);

const renderInterestGroup = (data, includeOtherLink = false) => {
  const filteredEntries = Object.entries(data).filter(
    ([, offerings]) => offerings.length > 0
  );

  if (filteredEntries.length === 0) return null;

  return (
    <div className='link-group two-col'>
      {filteredEntries.map(([interest, offerings]) => (
        <div key={interest}>
          <h5>{interest}</h5>
          {renderOfferingList(offerings)}
          {includeOtherLink && (
            <Link
              className='underline_text'
              to={`/other-interests?interest=${encodeURIComponent(interest)}`}>
              Options at Other FCPS Schools
            </Link>
          )}
        </div>
      ))}
    </div>
  );
};

const DynamicSectionRenderer = ({ type, data }) => {
  if (!type || !data || (Array.isArray(data) && data.length === 0)) return null;

  switch (type) {
    case "populate_offerings_outcomes_school":
      if (!Array.isArray(data)) return null;
      return (
        <div className='link-group'>
          <ul className='button-list'>
            {data.map((offering) => (
              <li key={offering.id || offering.slug}>
                <Link className='button' to={`/program/${offering.slug}`}>
                  {offering.title}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      );

    case "populate_offerings_outcomes_interest_school":
      return renderInterestGroup(data, true);

    case "populate_offerings_technical_interests_school":
      return renderInterestGroup(data);

    case "populate_external_school_link":
      return (
        <a
          className='button center school-link'
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
