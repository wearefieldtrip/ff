import { useUserFlow } from "../../context/UserFlowContext";

function SchoolSelect({ schools = [] }) {
  const { userFlow, setUserFlow } = useUserFlow();

  const handleChange = (e) => {
    const selectedSchoolId = e.target.value;
    const selectedSchool = schools.find(
      (school) => school.name === selectedSchoolId
    );

    // Filter interests based on associated_schools
    const schoolInterests = userFlow.allInterests.filter(
      (interest) =>
        interest.associated_schools &&
        interest.associated_schools.includes(selectedSchool.name)
    );

    setUserFlow((prev) => ({
      ...prev,
      selectedSchool,
    }));
  };

  return (
    <div className='school-select'>
      <label htmlFor='school-select'>
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
    </div>
  );
}

export default SchoolSelect;
