import { useEffect, useMemo, useCallback } from "react";
import { usePage } from "../context/PageContext";
import { useUserFlow } from "../context/UserFlowContext";
import { useInitialData } from "../hooks/useInitialData";
import SchoolSelect from "../components/forms/SchoolSelect";
import PageHeader from "../components/ui/PageHeader";
import BubbleBtn from "../components/ui/BubbleBtn";
import { trackEvent } from "../utils/ga";

const gradeLevels = ["Elementary", "Middle", "High"];

function Basics() {
  const { setPageMeta } = usePage();
  const { userFlow, setUserFlow } = useUserFlow();
  const { data } = useInitialData();
  const selectedGrade = userFlow.selectedLevel;

  const filteredSchools = useMemo(() => {
    return (
      userFlow.allSchools?.filter((school) => school.level === selectedGrade) ||
      []
    );
  }, [userFlow.allSchools, selectedGrade]);

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
  }, [data, setUserFlow]);

  useEffect(() => {
    const hasGrade = Boolean(selectedGrade);
    const hasSchool = Boolean(userFlow.selectedSchool);

    setPageMeta({
      nextPage:
        hasGrade && hasSchool
          ? selectedGrade === "Elementary"
            ? "/outcomes"
            : "/interests"
          : null,
      showNext: true,
      canProceed: hasGrade && hasSchool,
      hideComponent: false,
    });
  }, [selectedGrade, userFlow.selectedSchool, setPageMeta]);

  const handleGradeSelect = useCallback(
    (grade) => {
      trackEvent("select_grade", { grade_level: grade });
      setUserFlow((prev) => ({
        ...prev,
        selectedLevel: grade,
        selectedSchool: null,
      }));
    },
    [setUserFlow]
  );

  return (
    <div className='page-basics page'>
      <PageHeader
        title="Let's start with the basics"
        subtitle='Innovative options are found at all schools. First, select a grade level. Then, select your neighborhood school to explore.'
      />
      <div className='content-wrapper medium'>
        <div className='bubble-btn-group three'>
          {gradeLevels.map((label) => (
            <BubbleBtn
              key={label}
              label={`${label} Schools`}
              isActive={selectedGrade === label}
              onClick={() => handleGradeSelect(label)}
            />
          ))}
        </div>
        {selectedGrade && <SchoolSelect schools={filteredSchools} />}
      </div>
    </div>
  );
}

export default Basics;
