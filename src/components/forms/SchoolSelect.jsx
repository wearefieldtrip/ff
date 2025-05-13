function SchoolSelect({ level, selectedSchool, onChange }) {
  return (
    <div className='school-select'>
      <label htmlFor='school'>Select your neighborhood high school</label>
      <select id='school' value={selectedSchool} onChange={onChange}>
        <option value=''>Select a school</option>
        <option>Bryan Station High School</option>
        <option>Frederick Douglas High School</option>
        <option>Henry Clay High School</option>
        <option>Lafayette High School</option>
        <option>Tates Creek High School</option>
      </select>
      <p className='school-finder'>
        If you are unsure what your neighborhood school is, use{" "}
        <a
          href='https://www.schoolsitelocator.com/apps/fayette/'
          target='_blank'>
          this tool
        </a>{" "}
        to find out.
      </p>
    </div>
  );
}

export default SchoolSelect;
