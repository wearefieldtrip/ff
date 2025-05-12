import "../../assets/styles/components/_pageHeader.scss";

function PageHeader({ title, subtitle }) {
  return (
    <div className='page-header'>
      <h1>{title}</h1>
      {subtitle && <p>{subtitle}</p>}
    </div>
  );
}

export default PageHeader;
