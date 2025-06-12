import { useEffect } from "react";
import { usePage } from "../context/PageContext";
import { useUserFlow } from "../context/UserFlowContext";
import { supabase } from "../services/supabaseClient";
import SchoolSelect from "../components/forms/SchoolSelect";
import PageHeader from "../components/ui/PageHeader";
import BubbleBtn from "../components/ui/BubbleBtn";

function Basics() {
  const { setPageMeta } = usePage();
  const { userFlow, setUserFlow } = useUserFlow();
  const selectedGrade = userFlow.gradeLevel;

  useEffect(() => {
    const hasGrade = !!userFlow.gradeLevel;
    const hasSchool = !!userFlow.homeSchool;

    setPageMeta({
      nextPage:
        userFlow.gradeLevel === "Elementary" ? "/outcomes" : "/interests",
      showNext: true,
      canProceed: hasGrade && hasSchool,
      hideComponent: false,
    });
  }, [userFlow.gradeLevel, userFlow.homeSchool, setPageMeta]);

  useEffect(() => {
    const fetchData = async () => {
      if (!userFlow.gradeLevel) return;

      // Fetch schools by level
      const { data: schools, error: schoolError } = await supabase
        .from("schools")
        .select("*")
        .eq("level", userFlow.gradeLevel);

      if (schoolError) console.error("Error fetching schools:", schoolError);

      // Update global flow or local state
      setUserFlow((prev) => ({
        ...prev,
        schools: schools || [],
      }));
    };

    fetchData();
  }, [userFlow.gradeLevel, setUserFlow]);

  const handleGradeSelect = (grade) => {
    setUserFlow((prev) => ({
      ...prev,
      gradeLevel: grade,
    }));
  };

  return (
    <div className='page-basics page'>
      <PageHeader
        title="Let's start with the basics"
        subtitle='Innovative options are found at all schools. First, select a grade level. Then, select your neighborhood school to explore.'
      />
      <div className='content-wrapper small'>
        <div className='button-group'>
          <BubbleBtn
            label='Elementary Schools'
            isActive={selectedGrade === "Elementary"}
            onClick={() => handleGradeSelect("Elementary")}
          />
          <BubbleBtn
            label='Middle Schools'
            isActive={selectedGrade === "Middle"}
            onClick={() => handleGradeSelect("Middle")}
          />
          <BubbleBtn
            label='High Schools'
            isActive={selectedGrade === "High"}
            onClick={() => handleGradeSelect("High")}
          />
        </div>
        {selectedGrade && <SchoolSelect schools={userFlow.schools} />}
      </div>
    </div>
  );
}

export default Basics;
