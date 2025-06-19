import { Link } from "react-router-dom";
import PageHeader from "../components/ui/PageHeader";
import { useUserFlow } from "../context/UserFlowContext";

function OtherOptions() {
  const { userFlow } = useUserFlow();
  const { allOfferings, selectedSchool, selectedOutcome } = userFlow;

  const filteredOfferings = allOfferings.filter(
    (offering) =>
      offering.is_magnet &&
      offering.associated_outcomes?.includes(selectedOutcome.title) &&
      !offering.associated_schools?.includes(selectedSchool.name) &&
      offering.level === userFlow.selectedLevel
  );
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
          {filteredOfferings.length > 0 ? (
            <ul className='list-disc list-inside mt-4'>
              {filteredOfferings.map((offering) => (
                <li key={offering.id}>
                  <Link className='btn' to={`/offering/${offering.slug}`}>
                    {offering.title}
                  </Link>
                </li>
              ))}
            </ul>
          ) : (
            <p>No additional magnet options found for this outcome.</p>
          )}
        </section>
      </div>
    </div>
  );
}

export default OtherOptions;
