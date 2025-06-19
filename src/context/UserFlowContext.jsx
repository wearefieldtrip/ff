import { createContext, useContext, useState } from "react";

const UserFlowContext = createContext();

export const UserFlowProvider = ({ children }) => {
  const [userFlow, setUserFlow] = useState({
    selectedLevel: null,
    selectedSchool: null,
    selectedInterests: [],
    selectedOutcome: null,
    allSchools: [],
    allOutcomes: [],
    allOfferings: [],
    allInterests: [],
  });

  return (
    <UserFlowContext.Provider value={{ userFlow, setUserFlow }}>
      {children}
    </UserFlowContext.Provider>
  );
};

export const useUserFlow = () => useContext(UserFlowContext);
