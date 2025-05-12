import SchoolSelect from "../components/forms/SchoolSelect";
import PageHeader from "../components/layouts/PageHeader";
import BubbleBtn from "../components/ui/BubbleBtn";
import arrow from "../assets/images/dir-btn-arrow.svg";

function Basics() {
  return (
    <div className='page-basics'>
      <PageHeader
        title="Let's start wit the basics"
        subtitle='Innovative options are found at all schools. First, select a grade level. Then, select your neighborhood school to explore.'
      />
      <div className='content-wrapper small'>
        <div className='button-group'>
          <BubbleBtn label='Elementry Schools' />
          <BubbleBtn label='Middle Schools' />
          <BubbleBtn label='High Schools' />
        </div>
        <SchoolSelect />
        <div className='btn-group'>
          <a className='dir-button left'>
            <img src={arrow} alt='' />
          </a>
          <a className='dir-button right text'>
            <img src={arrow} alt='' />
            <span>Next</span>
          </a>
        </div>
      </div>
    </div>
  );
}
export default Basics;
4;
