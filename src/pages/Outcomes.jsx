import { useEffect, useState } from "react";
import { usePage } from "../context/PageContext";
import { useUserFlow } from "../context/UserFlowContext";
import BubbleBtn from "../components/ui/BubbleBtn";
import { supabase } from "../services/supabaseClient";

function Outcomes() {
  const { setPageMeta } = usePage();
  const { userFlow, setUserFlow } = useUserFlow();
  const [selectedOutcome, setSelectedOutcome] = useState(
    userFlow.outcome || null
  );

  useEffect(() => {
    setPageMeta({
      nextPage: userFlow.selectedOutcome
        ? `/outcome/${userFlow.selectedOutcome.slug}`
        : null,
      showNext: true,
      canProceed: !!selectedOutcome,
      hideComponent: false,
    });
  }, [selectedOutcome, setPageMeta, userFlow.selectedOutcome]);

  useEffect(() => {
    const fetchOutcomes = async () => {
      if (!userFlow.gradeLevel) return;

      const { data: outcomes, error } = await supabase
        .from("outcomes")
        .select("*")
        .contains("level", [userFlow.gradeLevel]);

      if (error) {
        console.error("Error fetching outcomes:", error);
      } else {
        setUserFlow((prev) => ({ ...prev, outcomes: outcomes || [] }));
      }
    };

    fetchOutcomes();
  }, [userFlow.gradeLevel, setUserFlow]);

  const handleSelect = (outcome) => {
    const isSame = selectedOutcome === outcome.title;

    setSelectedOutcome(isSame ? null : outcome.title);

    setUserFlow((prev) => ({
      ...prev,
      selectedOutcome: isSame ? null : outcome,
    }));
  };

  return (
    <div className='page-outcomes page'>
      <div className='content-wrapper large'>
        <div className='intro'>
          <h1>What's most important to you?</h1>
          <p>You can always come back and select another option.</p>
        </div>
        <div className='button-group'>
          {userFlow.outcomes?.map((outcome) => (
            <BubbleBtn
              key={outcome.id}
              label={outcome.title}
              size='large'
              isActive={selectedOutcome === outcome.title}
              disabled={!!selectedOutcome && selectedOutcome !== outcome.title}
              onClick={() => handleSelect(outcome)}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

export default Outcomes;
