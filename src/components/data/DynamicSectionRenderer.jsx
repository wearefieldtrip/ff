import { Link } from "react-router-dom";

const DynamicSectionRenderer = ({ type, data }) => {
  if (!type || !data) return null;

  switch (type) {
    case "populate_offerings_outcomes_school":
      return (
        <ul className='list-disc list-inside mb-4'>
          {data.map((offering, idx) => (
            <li key={idx}>{offering.title}</li>
          ))}
        </ul>
      );

    case "populate_offerings_outcomes_interest_school":
      return (
        <div className='interest-group'>
          {Object.entries(data).map(([interest, offerings]) => (
            <div key={interest}>
              <h5>{interest}</h5>
              <ul className='list-disc list-inside'>
                {offerings.map((offering, idx) => (
                  <Link
                    className='btn'
                    to={`/offering/${offering.slug}`}
                    key={idx}>
                    {offering.title}
                  </Link>
                ))}
              </ul>
            </div>
          ))}
        </div>
      );

    case "populate_external_school_link":
      return (
        <a className='btn' href={data} target='_blank'>
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
