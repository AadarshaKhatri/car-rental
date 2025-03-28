import React, { ReactNode, useState, useContext, createContext } from "react";

// Define the type for the context value
interface CounterContextType {
  count: number;
  increment: () => void;
}

// Create the context with an initial value (to avoid TypeScript warnings)
export const CounterContext = createContext<CounterContextType | undefined>(undefined);

// Define the provider component
interface CounterContextProviderProps {
  children: ReactNode;
}

export const CounterContextProvider: React.FC<CounterContextProviderProps> = ({ children }) => {
  const [count, setCount] = useState(0);

  const increment = () => {
    setCount((prevState) => prevState + 1);
  };

  return (
    <CounterContext.Provider value={{ count, increment }}>
      {children}
    </CounterContext.Provider>
  );
};

// Create a custom hook to use the context
export const useCounter = (): CounterContextType => {
  const context = useContext(CounterContext);
  if (!context) {
    throw new Error("useCounter must be used within a CounterContextProvider");
  }
  return context;
};
