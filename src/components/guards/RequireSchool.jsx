import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useUserFlow } from "../../context/UserFlowContext";

const RequireSchool = ({ children }) => {
  const { userFlow } = useUserFlow();
  const navigate = useNavigate();

  useEffect(() => {
    if (!userFlow.homeSchool) {
      navigate("/");
    }
  }, [userFlow.homeSchool, navigate]);

  return userFlow.homeSchool ? children : null;
};

export default RequireSchool;
