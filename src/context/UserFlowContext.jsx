import { createContext, useContext, useState } from "react";

const UserFlowContext = createContext();

export const UserFlowProvider = ({ children }) => {
  const [userFlow, setUserFlow] = useState({
    gradeLevel: null,
    homeSchool: null,
    interests: [],
    selectedInterests: [],
    outcomes: [],
    selectedOutcome: null,
    outcomeOfferings: {},
    interestOfferings: {},
  });

  return (
    <UserFlowContext.Provider value={{ userFlow, setUserFlow }}>
      {children}
    </UserFlowContext.Provider>
  );
};

export const useUserFlow = () => useContext(UserFlowContext);
