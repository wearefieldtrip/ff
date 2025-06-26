import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useUserFlow } from "../../context/UserFlowContext";

const RequireSchool = ({ children }) => {
  const { userFlow } = useUserFlow();
  const navigate = useNavigate();

  useEffect(() => {
    if (!userFlow.selectedSchool) {
      navigate("/");
    }
  }, [userFlow.selectedSchool, navigate]);

  return userFlow.selectedSchool ? children : null;
};

export default RequireSchool;
