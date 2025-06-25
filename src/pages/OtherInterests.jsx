import { Link, useLocation } from "react-router-dom";
import PageHeader from "../components/ui/PageHeader";
import { useUserFlow } from "../context/UserFlowContext";

function OtherIntersts() {
  const { userFlow } = useUserFlow();
  const { search } = useLocation();
  const interestName = new URLSearchParams(search).get("interest");
  const { allOfferings, selectedSchool, selectedOutcome, selectedLevel } =
    userFlow;

  console.log(selectedSchool, selectedOutcome, selectedLevel);

  const filteredOfferings = allOfferings.filter(
    (offering) =>
      offering.is_magnet &&
      offering.associated_outcomes?.includes(selectedOutcome.title) &&
      offering.associated_interests?.includes(interestName) &&
      !offering.associated_schools?.includes(selectedSchool.name) &&
      offering.associated_level?.includes(selectedLevel)
  );

  return (
    <div className='page-other-options page'>
      <PageHeader
        title='Options at Other FCPS Schools'
        subtitle={`What's most important to you? / ${selectedOutcome.title}`}
        flip={true}
      />
      <div className='content-wrapper large'>
        <section>
          <p>
            Outside of your neighborhood school, the district also has special
            programs at other schools based on your interests that you can apply
            to. Learn more about these below.
          </p>
          <div className='mt-6'>
            <h2>{interestName}</h2>
            {filteredOfferings.length > 0 ? (
              <ul className='list-disc list-inside mt-2'>
                {filteredOfferings.map((offering) => (
                  <li key={offering.id}>
                    <Link className='btn' to={`/offering/${offering.slug}`}>
                      {offering.title}
                    </Link>
                  </li>
                ))}
              </ul>
            ) : (
              <p>No other magnet offerings available for this interest.</p>
            )}
          </div>
        </section>
      </div>
    </div>
  );
}

export default OtherIntersts;
