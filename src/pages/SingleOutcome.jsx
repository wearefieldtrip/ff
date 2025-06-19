import { useUserFlow } from "../context/UserFlowContext";
import { usePage } from "../context/PageContext";
import PageHeader from "../components/ui/PageHeader";
import { useEffect, useState } from "react";
import DynamicSectionRenderer from "../components/data/DynamicSectionRenderer";
import ReactMarkdown from "react-markdown";
import SmartLink from "../components/ui/SmartLink";
import { useParams } from "react-router-dom";

function SingleOutcome() {
  const { userFlow, setUserFlow } = useUserFlow();
  const { setPageMeta } = usePage();
  const selectedOutcome = userFlow.selectedOutcome;
  const { slug } = useParams();

  function MarkdownParagraph({ content }) {
    return <ReactMarkdown>{content}</ReactMarkdown>;
  }

  const [dynamicSectionData, setDynamicSectionData] = useState({});

  const fetchOfferingsBySchoolAndOutcome = (schoolName, outcomeName) => {
    return userFlow.allOfferings.filter(
      (offering) =>
        offering.associated_schools?.includes(schoolName) &&
        offering.associated_outcomes?.includes(outcomeName)
    );
  };

  const fetchOfferingsBySchoolOutcomeInterest = (
    schoolName,
    outcomeName,
    interest
  ) => {
    return userFlow.allOfferings.filter(
      (offering) =>
        offering.associated_schools?.includes(schoolName) &&
        offering.associated_outcomes?.includes(outcomeName) &&
        offering.associated_interests?.includes(interest)
    );
  };

  const fetchDataForSection = (key, dynamicType) => {
    const schoolName = userFlow.selectedSchool?.name;
    const outcomeName = userFlow.selectedOutcome?.title;

    switch (dynamicType) {
      case "populate_offerings_outcomes_school": {
        const offerings = fetchOfferingsBySchoolAndOutcome(
          schoolName,
          outcomeName
        );
        setDynamicSectionData((prev) => ({ ...prev, [key]: offerings }));
        break;
      }

      case "populate_offerings_outcomes_interest_school": {
        const interestOfferings = {};
        for (const interest of userFlow.selectedInterests || []) {
          interestOfferings[interest] = fetchOfferingsBySchoolOutcomeInterest(
            schoolName,
            outcomeName,
            interest
          );
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
        const schoolLink = userFlow.selectedSchool?.url;
        setDynamicSectionData((prev) => ({ ...prev, [key]: schoolLink }));
        break;
      }

      default:
        break;
    }
  };

  useEffect(() => {
    if (slug) {
      const foundOutcome = userFlow.allOutcomes.find((o) => o.slug === slug);
      if (
        foundOutcome &&
        (!userFlow.selectedOutcome || userFlow.selectedOutcome.slug !== slug)
      ) {
        setUserFlow((prev) => ({ ...prev, selectedOutcome: foundOutcome }));
        setDynamicSectionData({}); // Reset to avoid stale data
      }
    }
  }, [slug, userFlow.allOutcomes]);

  useEffect(() => {
    setPageMeta({
      showNext: false,
      canProceed: false,
      hideComponent: false,
    });
  }, [userFlow.selectedLevel, userFlow.selectedSchool, setPageMeta]);

  useEffect(() => {
    if (!selectedOutcome || selectedOutcome.slug !== slug) return;

    const sectionKeys = [1, 2, 3];
    sectionKeys.forEach((key) => {
      const dynamicType = selectedOutcome[`section_${key}_dynamic`];
      if (dynamicType) fetchDataForSection(key, dynamicType);
    });
  }, [selectedOutcome, slug]);
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

          const buttons = [];
          for (let b = 1; b <= 5; b++) {
            const text = selectedOutcome[`section_${i}_button_${b}_text`];
            const link = selectedOutcome[`section_${i}_button_${b}_link`];
            const style =
              selectedOutcome[`section_${i}_button_${b}_style`] || "btn";
            if (!text || !link) break;
            buttons.push({ text, link, style });
          }

          const hasContent = !!content?.trim();
          const hasDynamicData = Array.isArray(dynamicData)
            ? dynamicData.length > 0
            : typeof dynamicData === "object"
            ? Object.keys(dynamicData || {}).length > 0
            : !!dynamicData;
          const hasButtons = buttons.length > 0;

          if (!hasContent && !hasDynamicData) return null;

          return (
            <section key={i}>
              {hasContent && (
                <p className='section-intro-text'>
                  {<MarkdownParagraph content={content} />}
                </p>
              )}
              <DynamicSectionRenderer type={dynamicType} data={dynamicData} />
              {hasButtons && (
                <div className='button-group mt-4'>
                  {buttons.map(({ text, link, style }, idx) => (
                    <SmartLink key={idx} to={link} className={style}>
                      {text}
                    </SmartLink>
                  ))}
                </div>
              )}
            </section>
          );
        })}
      </div>
    </div>
  );
}

export default SingleOutcome;
