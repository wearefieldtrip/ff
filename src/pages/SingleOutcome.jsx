import { useEffect, useState, useCallback } from "react";
import { Link, useParams } from "react-router-dom";
import ReactMarkdown from "react-markdown";
import { useUserFlow } from "../context/UserFlowContext";
import { usePage } from "../context/PageContext";
import PageHeader from "../components/ui/PageHeader";
import SmartLink from "../components/ui/SmartLink";
import DynamicSectionRenderer from "../components/data/DynamicSectionRenderer";

const MarkdownParagraph = ({ content }) => (
  <ReactMarkdown>{content}</ReactMarkdown>
);

const offeringFilter = (offerings, filters) =>
  offerings.filter((offering) =>
    Object.entries(filters).every(([key, value]) =>
      Array.isArray(offering[key])
        ? offering[key]?.includes(value)
        : offering[key] === value
    )
  );

const useOutcomeData = ({
  selectedOutcome,
  selectedSchool,
  selectedInterests,
  allOfferings,
}) => {
  const [dynamicSectionData, setDynamicSectionData] = useState({});

  const fetchDataForSection = useCallback(
    (key, dynamicType) => {
      const schoolName = selectedSchool?.name;
      const outcomeName = selectedOutcome?.title;

      if (!schoolName || !outcomeName) return;

      let data;

      switch (dynamicType) {
        case "populate_offerings_outcomes_school":
          data = offeringFilter(allOfferings, {
            associated_schools: schoolName,
            associated_outcomes: outcomeName,
          }).filter(
            (o) =>
              !o.associated_interests || o.associated_interests.length === 0
          );
          break;

        case "populate_offerings_outcomes_interest_school":
          data = {};
          for (const interest of selectedInterests || []) {
            data[interest] = offeringFilter(allOfferings, {
              associated_schools: schoolName,
              associated_outcomes: outcomeName,
              associated_interests: interest,
            }).filter((o) => !o.is_technical);
          }
          break;

        case "populate_offerings_technical_interests_school":
          data = {};
          for (const interest of selectedInterests || []) {
            data[interest] = offeringFilter(allOfferings, {
              associated_schools: schoolName,
              associated_outcomes: outcomeName,
              associated_interests: interest,
              is_technical: true,
            });
          }
          break;

        case "populate_external_school_link":
          data = selectedSchool?.url;
          break;

        default:
          return;
      }

      setDynamicSectionData((prev) => ({ ...prev, [key]: data }));
    },
    [selectedSchool, selectedOutcome, selectedInterests, allOfferings]
  );

  return { dynamicSectionData, fetchDataForSection };
};

const Section = ({ index, content, dynamicType, dynamicData, buttons }) => {
  const hasContent = !!content?.trim();
  const hasDynamicData = Array.isArray(dynamicData)
    ? dynamicData.length > 0
    : typeof dynamicData === "object"
    ? Object.keys(dynamicData || {}).length > 0
    : !!dynamicData;

  if (!hasContent && !hasDynamicData) return null;

  return (
    <section key={index}>
      {hasContent && (
        <ReactMarkdown
          components={{
            a: ({ href, children, ...props }) => {
              const isInternal = href.startsWith("/");
              return isInternal ? (
                <Link to={href} {...props}>
                  {children}
                </Link>
              ) : (
                <a
                  href={href}
                  target='_blank'
                  rel='noopener noreferrer'
                  {...props}>
                  {children}
                </a>
              );
            },
          }}>
          {content}
        </ReactMarkdown>
      )}
      <DynamicSectionRenderer type={dynamicType} data={dynamicData} />
      {buttons.length > 0 && (
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
};

function SingleOutcome() {
  const { userFlow, setUserFlow } = useUserFlow();
  const { setPageMeta } = usePage();
  const { slug } = useParams();
  const selectedOutcome = userFlow.selectedOutcome;
  const { dynamicSectionData, fetchDataForSection } = useOutcomeData({
    selectedOutcome,
    selectedSchool: userFlow.selectedSchool,
    selectedInterests: userFlow.selectedInterests,
    allOfferings: userFlow.allOfferings,
  });

  useEffect(() => {
    if (slug) {
      const foundOutcome = userFlow.allOutcomes.find((o) => o.slug === slug);
      if (foundOutcome && (!selectedOutcome || selectedOutcome.slug !== slug)) {
        setUserFlow((prev) => ({ ...prev, selectedOutcome: foundOutcome }));
      }
    }
  }, [slug, userFlow.allOutcomes, selectedOutcome, setUserFlow]);

  useEffect(() => {
    setPageMeta({
      showNext: false,
      canProceed: false,
      hideComponent: false,
    });
  }, [userFlow.selectedLevel, userFlow.selectedSchool, setPageMeta]);

  useEffect(() => {
    if (!selectedOutcome || selectedOutcome.slug !== slug) return;

    [1, 2, 3].forEach((i) => {
      const dynamicType = selectedOutcome[`section_${i}_dynamic`];
      if (dynamicType) fetchDataForSection(i, dynamicType);
    });
  }, [selectedOutcome, slug, fetchDataForSection]);

  return (
    <div className='page-single-outcome page'>
      <PageHeader
        flip={true}
        title={selectedOutcome.title}
        subtitle="What's most important to you?"
      />
      <div className='content-wrapper full'>
        {[1, 2, 3, 4].map((i) => {
          const content = selectedOutcome[`section_${i}_content`];
          const dynamicType = selectedOutcome[`section_${i}_dynamic`];
          const dynamicData = dynamicSectionData[i] || {};

          const buttons = [];
          for (let b = 1; b <= 5; b++) {
            const text = selectedOutcome[`section_${i}_button_${b}_text`];
            const link = selectedOutcome[`section_${i}_button_${b}_link`];
            const style =
              selectedOutcome[`section_${i}_button_${b}_style`] || "btn";
            if (!text || !link) break;
            buttons.push({ text, link, style });
          }

          return (
            <Section
              key={i}
              index={i}
              content={content}
              dynamicType={dynamicType}
              dynamicData={dynamicData}
              buttons={buttons}
            />
          );
        })}
      </div>
    </div>
  );
}

export default SingleOutcome;
