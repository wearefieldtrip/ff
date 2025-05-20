import { useEffect, useState } from "react";
import { usePage } from "../context/PageContext";
import { useUserFlow } from "../context/UserFlowContext";
import BubbleBtn from "../components/ui/BubbleBtn";

const OUTCOME_OPTIONS = [
  "Get a Head Start on College",
  "Connect Learning to the Real-World",
  "Earn Certification in Skills",
  "Take Interest Based Classes",
  "Accommodate Unique Learning Needs",
];

function Outcomes() {
  const { setPageMeta } = usePage();
  const { userFlow, setUserFlow } = useUserFlow();
  const [selectedOutcome, setSelectedOutcome] = useState(
    userFlow.outcome || null
  );

  useEffect(() => {
    setPageMeta({
      nextPage: "/results",
      showNext: true,
      canProceed: !!selectedOutcome,
      hideComponent: false,
    });
  }, [selectedOutcome, setPageMeta]);

  const handleSelect = (outcome) => {
    if (selectedOutcome === outcome) {
      setSelectedOutcome(null);
      setUserFlow((prev) => ({
        ...prev,
        outcome: null,
      }));
    } else {
      setSelectedOutcome(outcome);
      setUserFlow((prev) => ({
        ...prev,
        outcome,
      }));
    }
  };

  return (
    <div className='page-outcomes page'>
      <div className='content-wrapper large'>
        <div className='intro'>
          <h1>What's most important to you?</h1>
          <p>You can always come back and select another option.</p>
        </div>
        <div className='button-group'>
          {OUTCOME_OPTIONS.map((label) => (
            <BubbleBtn
              key={label}
              label={label}
              size='large'
              isActive={selectedOutcome === label}
              disabled={!!selectedOutcome && selectedOutcome !== label}
              onClick={() => handleSelect(label)}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

export default Outcomes;
