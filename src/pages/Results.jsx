import { useUserFlow } from "../context/UserFlowContext";
import { usePage } from "../context/PageContext";
import PageHeader from "../components/ui/PageHeader";
import { useEffect } from "react";
import BubbleBtn from "../components/ui/BubbleBtn";
import { Link } from "react-router-dom";

function Results() {
  const { userFlow } = useUserFlow();
  const { setPageMeta } = usePage();

  useEffect(() => {
    setPageMeta({
      showNext: false,
      canProceed: false,
      hideComponent: false,
    });
  }, [userFlow.gradeLevel, userFlow.homeSchool, setPageMeta]);

  return (
    <div className='page-results page'>
      <PageHeader
        flip={true}
        title={userFlow.outcome}
        subtitle="What's most important to you?"
      />
      <div className='content-wrapper large'>
        <div className='section'>
          <p>
            FCPS provides a variety of ways to cut the cost of college by
            earning college credit while in high school. Learn more about your
            options below.
          </p>
          <div className='button-group'>
            <BubbleBtn label='Advacned Placement' />
            <BubbleBtn label='Dual Credit' />
            <BubbleBtn label='Opprotunity Middle College' />
            <BubbleBtn label='Summer Ignite' />
            <BubbleBtn label="Earn an Associate's Degree" />
          </div>
          <Link to='#'>Options at Other FCPS Schools</Link>
        </div>
        <div className='section'>
          <p>
            FCPS Pathways allow you to explore potential majors before college,
            saving you time and money on unnecessary courses in college. Below
            are the pathways based on your selected interests. Learn more about
            FCPS Pathways here.
          </p>
        </div>
      </div>
    </div>
  );
}

export default Results;
