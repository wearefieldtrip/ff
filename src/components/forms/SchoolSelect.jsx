import { useUserFlow } from "../../context/UserFlowContext";
import { trackEvent } from "../../utils/ga";

function SchoolSelect({ schools = [] }) {
  const { userFlow, setUserFlow } = useUserFlow();

  const handleChange = (e) => {
    const selectedSchoolId = e.target.value;
    const selectedSchool = schools.find(
      (school) => school.name === selectedSchoolId
    );

    trackEvent({
      action: "select_school",
      school_name: selectedSchool.name,
    });

    const schoolInterests = userFlow.allInterests.filter(
      (interest) =>
        interest.associated_schools &&
        interest.associated_schools.includes(selectedSchool.name)
    );

    setUserFlow((prev) => ({
      ...prev,
      selectedSchool,
      selectedInterests: [],
      selectedOutcome: null,
    }));
  };

  return (
    <div className='school-select'>
      <label className='label' htmlFor='school-select'>
        Select your neighborhood {userFlow.selectedLevel?.toLowerCase()} school
      </label>
      <select
        id='school-select'
        value={userFlow.selectedSchool?.name || ""}
        onChange={handleChange}>
        <option value=''>Select a School</option>
        {schools.map((school) => (
          <option key={school.id} value={school.name}>
            {school.name}
          </option>
        ))}
      </select>
      <p className='school-finder'>
        If you are unsure what your neighborhood school is, use{" "}
        <a
          href='https://www.schoolsitelocator.com/apps/fayette/'
          target='_blank'>
          this tool
        </a>{" "}
        to find out.
      </p>
    </div>
  );
}

export default SchoolSelect;
