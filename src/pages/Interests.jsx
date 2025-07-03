import { useEffect } from "react";
import { usePage } from "../context/PageContext";
import { useUserFlow } from "../context/UserFlowContext";
import PageHeader from "../components/ui/PageHeader";
import BubbleBtn from "../components/ui/BubbleBtn";
import { trackEvent } from "../utils/ga";

function Interests() {
  const { setPageMeta } = usePage();
  const { userFlow, setUserFlow } = useUserFlow();

  const {
    allInterests = [],
    selectedSchool,
    selectedInterests = [],
  } = userFlow;

  // Filter interests associated with the selected school
  const availableInterests = allInterests.filter(
    (interest) =>
      selectedSchool?.name &&
      interest.associated_schools?.includes(selectedSchool.name)
  );

  // Update page metadata based on selected interests
  useEffect(() => {
    setPageMeta({
      nextPage: "/outcomes",
      showNext: true,
      canProceed: selectedInterests.length > 0 && selectedInterests.length <= 2,
      hideComponent: false,
    });
  }, [selectedInterests, setPageMeta]);

  // Handle toggling interests
  const handleToggleInterest = (interest) => {
    const isAlreadySelected = selectedInterests.includes(interest);

    const updatedInterests = isAlreadySelected
      ? selectedInterests.filter((i) => i !== interest)
      : selectedInterests.length < 2
      ? [...selectedInterests, interest]
      : selectedInterests;

    if (!isAlreadySelected && selectedInterests.length < 2) {
      trackEvent({
        action: "select_interest",
        interest_selected: interest,
      });
    }

    if (updatedInterests !== selectedInterests) {
      setUserFlow((prev) => ({
        ...prev,
        selectedInterests: updatedInterests,
      }));
    }
  };

  return (
    <div className='page-basics page'>
      <PageHeader
        title='What are you interested in learning about?'
        subtitle='FCPS provides learning options based on your selected interests. Select up to two interests.'
      />
      <div className='content-wrapper large'>
        <div className='bubble-btn-group four'>
          {availableInterests.map(({ id, title, includes }) => {
            const isActive = selectedInterests.includes(title);
            const isAtLimit = selectedInterests.length >= 2;
            const isDisabled = !isActive && isAtLimit;

            return (
              <BubbleBtn
                key={id}
                label={title}
                subtext={`(${includes})`}
                isActive={isActive}
                disabled={isDisabled}
                onClick={() => handleToggleInterest(title)}
              />
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default Interests;
