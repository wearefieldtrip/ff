import { useEffect, useMemo } from "react";
import { usePage } from "../context/PageContext";
import { useUserFlow } from "../context/UserFlowContext";
import { useInitialData } from "../hooks/useInitialData";
import SchoolSelect from "../components/forms/SchoolSelect";
import PageHeader from "../components/ui/PageHeader";
import BubbleBtn from "../components/ui/BubbleBtn";
import { trackEvent } from "../utils/ga";

function Basics() {
  const { setPageMeta } = usePage();
  const { userFlow, setUserFlow } = useUserFlow();
  const { data } = useInitialData();
  const selectedGrade = userFlow.selectedLevel;

  const filteredSchools = useMemo(() => {
    if (!userFlow.allSchools || userFlow.allSchools.length === 0) return [];
    return userFlow.allSchools.filter(
      (school) => school.level === userFlow.selectedLevel
    );
  }, [userFlow.allSchools, userFlow.selectedLevel]);

  useEffect(() => {
    if (data) {
      setUserFlow((prev) => ({
        ...prev,
        allSchools: data.schools,
        allOutcomes: data.outcomes,
        allOfferings: data.offerings,
        allInterests: data.interests,
      }));
    }
  }, [data]);

  useEffect(() => {
    const hasGrade = !!userFlow.selectedLevel;
    const hasSchool = !!userFlow.selectedSchool;

    setPageMeta({
      nextPage:
        hasGrade && hasSchool
          ? userFlow.selectedLevel === "Elementary"
            ? "/outcomes"
            : "/interests"
          : null,
      showNext: true,
      canProceed: hasGrade && hasSchool,
      hideComponent: false,
    });
  }, [userFlow.selectedLevel, userFlow.selectedSchool, setPageMeta]);

  const handleGradeSelect = (grade) => {
    trackEvent("select_grade", {
      grade_level: grade,
    });
    setUserFlow((prev) => ({
      ...prev,
      selectedLevel: grade,
      selectedSchool: null,
    }));
  };

  return (
    <div className='page-basics page'>
      <PageHeader
        title="Let's start with the basics"
        subtitle='Innovative options are found at all schools. First, select a grade level. Then, select your neighborhood school to explore.'
      />
      <div className='content-wrapper large'>
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
        {selectedGrade && <SchoolSelect schools={filteredSchools} />}
      </div>
    </div>
  );
}

export default Basics;
