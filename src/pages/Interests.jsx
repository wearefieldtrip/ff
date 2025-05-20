import { useEffect, useState } from "react";
import { usePage } from "../context/PageContext";
import { useUserFlow } from "../context/UserFlowContext";
import PageHeader from "../components/ui/PageHeader";
import BubbleBtn from "../components/ui/BubbleBtn";

const INTEREST_OPTIONS = [
  { label: "Arts", subtext: "(Visual, Music, Performance)" },
  { label: "Business", subtext: "(Accounting, Marketing, Management, etc.)" },
  { label: "Education", subtext: "(Early Childhood, Special Education, etc.)" },
  { label: "Health", subtext: "(EMT, Nursing, etc.)" },
  { label: "Industrial & Mechanical", subtext: "(Automotive, Welding, etc.)" },
  { label: "Life Skills", subtext: "(Culinary, Financial Literacy, etc.)" },
  { label: "Math & Engineering", subtext: "(Aviation, Robotics, etc.)" },
  { label: "Multi-Media", subtext: "(Podcasting, Journalism, Video, etc.)" },
  { label: "Political & Social Science", subtext: "(Civics, Law, etc.)" },
  { label: "Public Safety", subtext: "(Firefighting, Law Enforcement, etc.)" },
  { label: "Science", subtext: "(Ag, Environmental, Physics, etc.)" },
  { label: "Technology", subtext: "(AI, Data, Programming, etc.)" },
];

function Interests() {
  const { setPageMeta } = usePage();
  const { userFlow, setUserFlow } = useUserFlow();
  const [selectedInterests, setSelectedInterests] = useState(
    userFlow.interests || []
  );

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
      return; // Do nothing if limit is reached
    }

    setSelectedInterests(updated);
    setUserFlow((prev) => ({
      ...prev,
      interests: updated,
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
          {INTEREST_OPTIONS.map(({ label, subtext }) => {
            const isActive = selectedInterests.includes(label);
            const isAtLimit = selectedInterests.length >= 2;
            const isDisabled = !isActive && isAtLimit;

            return (
              <BubbleBtn
                key={label}
                label={label}
                subtext={subtext}
                isActive={isActive}
                disabled={isDisabled}
                onClick={() => handleToggleInterest(label)}
              />
            );
          })}
        </div>
      </div>
    </div>
  );
}
export default Interests;
