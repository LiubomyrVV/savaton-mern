import React, { createContext, useEffect, useState } from 'react'

export interface IsAuthContextType {
    isAuthenticated: boolean 
}

export const IsAuthContext = createContext<
    IsAuthContextType | undefined
>(undefined)

const IsAuthProvider: React.FC<React.PropsWithChildren> = ({ children }) => {
    const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);

  useEffect(() => {
    try {
        const userInfo = localStorage.getItem('userInfo') !== null;
        setIsAuthenticated(userInfo);
      } catch (error) {
        console.error('Failed to access localStorage:', error);
      } 
  }, []);
  return (
    <IsAuthContext.Provider value={{ isAuthenticated }}>
        {children}
    </IsAuthContext.Provider>
  )
}

export default IsAuthProvider