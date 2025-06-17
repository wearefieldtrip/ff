import { useUserFlow } from "../context/UserFlowContext";
import { usePage } from "../context/PageContext";
import PageHeader from "../components/ui/PageHeader";
import { useEffect } from "react";
import BubbleBtn from "../components/ui/BubbleBtn";
import { Link } from "react-router-dom";

function SingleOutcome() {
  const { userFlow } = useUserFlow();
  const { setPageMeta } = usePage();

  const countSections = () => {
    let count = 0;
    for (let i = 1; i <= 3; i++) {
      if (userFlow.selectedOutcome[`section_${i}_content`]) {
        count++;
      }
    }
    return count;
  };

  const sectionCount = countSections();

  console.log(sectionCount);

  useEffect(() => {
    setPageMeta({
      showNext: false,
      canProceed: false,
      hideComponent: false,
    });
  }, [userFlow.gradeLevel, userFlow.homeSchool, setPageMeta]);

  return (
    <div className='page-results page'>
      <PageHeader
        flip={true}
        title={userFlow.selectedOutcome.title}
        subtitle="What's most important to you?"
      />
      <div className='content-wrapper large'>
        {userFlow.selectedOutcome.section_1_content && (
          <section>
            <p>{userFlow.selectedOutcome.section_1_content}</p>

            {userFlow.selectedOutcome.section_1_button_1_style && (
              <Link
                className={userFlow.selectedOutcome.section_1_button_1_style}
                to={"/other-offerings"}>
                {userFlow.selectedOutcome.section_1_button_1_text}
              </Link>
            )}
          </section>
        )}

        {userFlow.selectedOutcome.section_2_content && <h1>Section 2</h1>}

        {userFlow.selectedOutcome.section_3_content && <h1>Section 3</h1>}
      </div>
    </div>
  );
}

export default SingleOutcome;
