import { Link } from "react-router-dom";
import PageHeader from "../components/ui/PageHeader";
import { useUserFlow } from "../context/UserFlowContext";

function OtherIntersts() {
  const { userFlow } = useUserFlow();
  const { allOfferings, selectedSchool, selectedOutcome, selectedInterests } =
    userFlow;

  const interestOfferings = selectedInterests.reduce((acc, interest) => {
    const offerings = allOfferings.filter(
      (offering) =>
        offering.is_magnet &&
        offering.associated_outcomes?.includes(selectedOutcome.title) &&
        offering.associated_interests?.includes(interest) &&
        !offering.associated_schools?.includes(selectedSchool.name) &&
        offering.level === userFlow.selectedLevel
    );
    acc[interest] = offerings;
    return acc;
  }, {});

  return (
    <div className='page-other-options page'>
      <PageHeader
        title='Options at Other FCPS Schools'
        subtitle={`What's most important to you? / ${userFlow.selectedOutcome.title}`}
        flip={true}
      />
      <div className='content-wrapper large'>
        <section>
          <p>
            Outside of your neighborhood school, the district also has special
            programs at other schools focused on acceleration that you can apply
            to. Learn more about these below.
          </p>
          {selectedInterests.map((interest) => {
            const offerings = interestOfferings[interest];
            return (
              <div key={interest} className='mt-6'>
                <h4>{interest}</h4>
                {offerings.length > 0 ? (
                  <ul className='list-disc list-inside mt-2'>
                    {offerings.map((offering) => (
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
            );
          })}
        </section>
      </div>
    </div>
  );
}

export default OtherIntersts;
