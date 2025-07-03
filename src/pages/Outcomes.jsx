import { useEffect, useMemo } from "react";
import { usePage } from "../context/PageContext";
import { useUserFlow } from "../context/UserFlowContext";
import BubbleBtn from "../components/ui/BubbleBtn";
import { trackEvent } from "../utils/ga";
import PageHeader from "../components/ui/PageHeader";

function Outcomes() {
  const { setPageMeta } = usePage();
  const { userFlow, setUserFlow } = useUserFlow();
  const { allOutcomes = [], selectedLevel, selectedOutcome } = userFlow;

  const availableOutcomes = useMemo(() => {
    return allOutcomes
      .filter((outcome) => outcome.level?.includes(selectedLevel))
      .sort((a, b) => {
        const orderA = typeof a.order === "number" ? a.order : Infinity;
        const orderB = typeof b.order === "number" ? b.order : Infinity;
        return orderA - orderB;
      });
  }, [allOutcomes, selectedLevel]);

  useEffect(() => {
    setPageMeta({
      nextPage: selectedOutcome ? `/outcome/${selectedOutcome.slug}` : null,
      showNext: true,
      canProceed: !!selectedOutcome,
      hideComponent: false,
    });
  }, [selectedOutcome, setPageMeta]);

  useEffect(() => {
    if (selectedOutcome) {
      trackEvent({
        action: "select_outcome",
        selected_outcome: selectedOutcome.title,
      });
    }
  }, [selectedOutcome]);

  const handleSelect = (outcome) => {
    setUserFlow((prev) => ({
      ...prev,
      selectedOutcome:
        selectedOutcome?.title === outcome.title ? null : outcome,
    }));
  };

  return (
    <div className='page page-outcomes'>
      <PageHeader
        title="What's most important to you?"
        subtitle='You can always come back and select another option.'
        flip={false}
      />
      <div className='content-wrapper medium'>
        <div className='bubble-btn-group three'>
          {availableOutcomes.map((outcome) => {
            const isActive = selectedOutcome?.title === outcome.title;
            const isDisabled = !!selectedOutcome && !isActive;

            return (
              <BubbleBtn
                key={outcome.id}
                label={outcome.title}
                size='large'
                isActive={isActive}
                disabled={isDisabled}
                onClick={() => handleSelect(outcome)}
              />
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default Outcomes;
