import { useUserFlow } from "../context/UserFlowContext";
import { usePage } from "../context/PageContext";
import PageHeader from "../components/ui/PageHeader";
import { useEffect, useState } from "react";
import BubbleBtn from "../components/ui/BubbleBtn";
import { Link } from "react-router-dom";
import {
  fetchOfferingsBySchoolAndOutcome,
  fetchOfferingsBySchoolOutcomeInterest,
} from "../services/fetchOfferings";
import DynamicSectionRenderer from "../components/data/DynamicSectionRenderer";

function SingleOutcome() {
  const { userFlow, setUserFlow } = useUserFlow();
  const { setPageMeta } = usePage();
  const selectedOutcome = userFlow.selectedOutcome;

  const [dynamicSectionData, setDynamicSectionData] = useState({});

  const fetchDataForSection = async (key, dynamicType) => {
    switch (dynamicType) {
      case "populate_offerings_outcomes_school": {
        const schoolName = userFlow.homeSchool?.name;
        const outcomeName = selectedOutcome?.title;
        if (schoolName && outcomeName) {
          const offerings = await fetchOfferingsBySchoolAndOutcome(
            schoolName,
            outcomeName
          );
          setUserFlow((prev) => ({
            ...prev,
            outcomeOfferings: offerings,
          }));
          setDynamicSectionData((prev) => ({
            ...prev,
            [key]: offerings,
          }));
        }
        break;
      }

      case "populate_offerings_outcomes_interest_school": {
        const schoolName = userFlow.homeSchool?.name;
        const outcomeName = selectedOutcome?.title;
        const interests = userFlow.selectedInterests || [];

        const interestOfferings = {};
        for (const interest of interests) {
          const offerings = await fetchOfferingsBySchoolOutcomeInterest(
            schoolName,
            outcomeName,
            interest
          );
          interestOfferings[interest] = offerings;
        }
        setDynamicSectionData((prev) => ({
          ...prev,
          [key]: interestOfferings,
        }));
        break;
      }
      case "populate_offerings_outcomes_magnet":
      case "populate_offerings_outcomes_magnet_interest":
      case "populate_external_school_link": {
        const schoolLink = userFlow.homeSchool?.url;
        setDynamicSectionData((prev) => ({
          ...prev,
          [key]: schoolLink,
        }));
        break;
      }

      default:
        break;
    }
  };

  useEffect(() => {
    setPageMeta({
      showNext: false,
      canProceed: false,
      hideComponent: false,
    });
  }, [userFlow.gradeLevel, userFlow.homeSchool, setPageMeta]);

  useEffect(() => {
    const sectionKeys = [1, 2, 3];

    const fetchAllSections = async () => {
      for (const key of sectionKeys) {
        const dynamicType = selectedOutcome[`section_${key}_dynamic`];
        if (dynamicType) {
          await fetchDataForSection(key, dynamicType);
        }
      }
    };

    fetchAllSections();
  }, [selectedOutcome]);

  return (
    <div className='page-single-outcome page'>
      <PageHeader
        flip={true}
        title={selectedOutcome.title}
        subtitle="What's most important to you?"
      />
      <div className='content-wrapper large'>
        {[1, 2, 3].map((i) => {
          const content = selectedOutcome[`section_${i}_content`];
          const dynamicType = selectedOutcome[`section_${i}_dynamic`];
          const dynamicData = dynamicSectionData[i];

          return (
            <section key={i}>
              {content && <p className='section-intro-text'>{content}</p>}
              <DynamicSectionRenderer type={dynamicType} data={dynamicData} />
            </section>
          );
        })}
      </div>
    </div>
  );
}

export default SingleOutcome;
