import { useEffect, useMemo } from "react";
import { usePage } from "../context/PageContext";
import { useUserFlow } from "../context/UserFlowContext";
import BubbleBtn from "../components/ui/BubbleBtn";
import { trackEvent } from "../utils/ga";

function Outcomes() {
  const { setPageMeta } = usePage();
  const { userFlow, setUserFlow } = useUserFlow();

  // Filter outcomes based on selected level
  const availableOutcomes = useMemo(() => {
    return (userFlow.allOutcomes || []).filter((outcome) =>
      outcome.level?.includes(userFlow.selectedLevel)
    );
  }, [userFlow.allOutcomes, userFlow.selectedLevel]);

  useEffect(() => {
    setPageMeta({
      nextPage: userFlow.selectedOutcome
        ? `/outcome/${userFlow.selectedOutcome.slug}`
        : null,
      showNext: true,
      canProceed: !!userFlow.selectedOutcome,
      hideComponent: false,
    });
  }, [userFlow.selectedOutcome, setPageMeta]);

  const handleSelect = (outcome) => {
    const isSame = userFlow.selectedOutcome?.title === outcome.title;

    setUserFlow((prev) => ({
      ...prev,
      selectedOutcome: isSame ? null : outcome,
    }));
  };

  useEffect(() => {
    if (userFlow.selectedOutcome) {
      trackEvent({
        action: "select_outcome",
        category: "User Engagement",
        params: {
          selected_outcome: userFlow.selectedOutcome.title,
        },
      });
    }
  }, [userFlow.selectedOutcome]);

  return (
    <div className='page-outcomes page'>
      <div className='content-wrapper large'>
        <div className='intro'>
          <h1>What's most important to you?</h1>
          <p>You can always come back and select another option.</p>
        </div>
        <div className='button-group'>
          {availableOutcomes.map((outcome) => (
            <BubbleBtn
              key={outcome.id}
              label={outcome.title}
              size='large'
              isActive={userFlow.selectedOutcome?.title === outcome.title}
              disabled={
                !!userFlow.selectedOutcome &&
                userFlow.selectedOutcome.title !== outcome.title
              }
              onClick={() => handleSelect(outcome)}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

export default Outcomes;
