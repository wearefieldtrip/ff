import { Link } from "react-router-dom";

const SmartLink = ({ to, children, ...props }) => {
  const isInternal = to && to.startsWith("/");

  return isInternal ? (
    <Link to={to} {...props}>
      {children}
    </Link>
  ) : (
    <a href={to} target='_blank' rel='noopener noreferrer' {...props}>
      {children}
    </a>
  );
};

export default SmartLink;
