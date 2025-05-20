import { useEffect } from "react";
import { usePage } from "../context/PageContext";
import { useUserFlow } from "../context/UserFlowContext";
import SchoolSelect from "../components/forms/SchoolSelect";
import PageHeader from "../components/ui/PageHeader";
import BubbleBtn from "../components/ui/BubbleBtn";

function Basics() {
  const { setPageMeta } = usePage();
  const { userFlow, setUserFlow } = useUserFlow();
  const selectedGrade = userFlow.gradeLevel;

  useEffect(() => {
    setPageMeta({
      nextPage: "/interests",
      showNext: true,
      canProceed: false,
      hideComponent: false,
    });
  }, [userFlow.gradeLevel, userFlow.homeSchool, setPageMeta]);

  useEffect(() => {
    const hasGrade = !!userFlow.gradeLevel;
    const hasSchool = !!userFlow.homeSchool;

    setPageMeta((prev) => ({
      ...prev,
      canProceed: hasGrade && hasSchool,
    }));
  }, [userFlow.gradeLevel, userFlow.homeSchool, setPageMeta]);

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
            isActive={selectedGrade === "elementary"}
            onClick={() => handleGradeSelect("elementary")}
          />
          <BubbleBtn
            label='Middle Schools'
            isActive={selectedGrade === "middle"}
            onClick={() => handleGradeSelect("middle")}
          />
          <BubbleBtn
            label='High Schools'
            isActive={selectedGrade === "high"}
            onClick={() => handleGradeSelect("high")}
          />
        </div>
        {selectedGrade && <SchoolSelect />}
      </div>
    </div>
  );
}

export default Basics;
