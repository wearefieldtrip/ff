import { useUserFlow } from "../../context/UserFlowContext";
import { supabase } from "../../services/supabaseClient";

function SchoolSelect({ schools = [] }) {
  const { userFlow, setUserFlow } = useUserFlow();

  const handleChange = async (e) => {
    const selectedSchoolId = e.target.value;
    const selectedSchool = schools.find(
      (school) => school.name === selectedSchoolId
    );

    // Fetch interests for the selected school
    const { data: interests, error } = await supabase
      .from("interests")
      .select("*")
      .contains("associated_schools", [selectedSchoolId]);

    if (error) {
      console.error("Error fetching interests:", error);
    }

    setUserFlow((prev) => ({
      ...prev,
      homeSchool: selectedSchool,
      interests: interests || [],
    }));
  };

  return (
    <div className='school-select'>
      <label htmlFor='school-select'>
        Select your neighborhood {userFlow.gradeLevel.toLowerCase()} school
      </label>
      <select
        id='school-select'
        value={userFlow.homeSchool?.name || ""}
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
