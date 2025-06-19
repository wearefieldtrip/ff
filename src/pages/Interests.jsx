import { useEffect } from "react";
import { usePage } from "../context/PageContext";
import { useUserFlow } from "../context/UserFlowContext";
import PageHeader from "../components/ui/PageHeader";
import BubbleBtn from "../components/ui/BubbleBtn";

function Interests() {
  const { setPageMeta } = usePage();
  const { userFlow, setUserFlow } = useUserFlow();

  const availableInterests = (userFlow.allInterests || []).filter(
    (interest) =>
      userFlow.selectedSchool &&
      interest.associated_schools?.includes(userFlow.selectedSchool.name)
  );
  const selectedInterests = userFlow.selectedInterests || [];

  useEffect(() => {
    setPageMeta({
      nextPage: "/outcomes",
      showNext: true,
      canProceed: selectedInterests.length > 0 && selectedInterests.length <= 2,
      hideComponent: false,
    });
  }, [selectedInterests, setPageMeta]);

  const handleToggleInterest = (interest) => {
    let updated;

    if (selectedInterests.includes(interest)) {
      updated = selectedInterests.filter((i) => i !== interest);
    } else if (selectedInterests.length < 2) {
      updated = [...selectedInterests, interest];
    } else {
      return;
    }

    setUserFlow((prev) => ({
      ...prev,
      selectedInterests: updated,
    }));
  };

  return (
    <div className='page-basics page'>
      <PageHeader
        title='What are you interested in learning about?'
        subtitle='FCPS provides learning options based on your selected interests. Select up to two interests.'
      />
      <div className='content-wrapper large'>
        <div className='button-group'>
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
