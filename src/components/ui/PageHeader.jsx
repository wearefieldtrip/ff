function PageHeader({ title, subtitle, flip }) {
  return (
    <div className={`page-header ${flip ? "flip" : ""}`}>
      <h1>{title}</h1>
      {subtitle && <p>{subtitle}</p>}
    </div>
  );
}

export default PageHeader;
