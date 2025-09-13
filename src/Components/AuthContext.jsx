import React, { createContext, useContext, useState, useEffect } from "react";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const savedUserId = localStorage.getItem("userId");
    const savedUserName = localStorage.getItem("userName");

    if (savedUserId && savedUserName) {
      setUser({ id: savedUserId, name: savedUserName });
    }
  }, []);

  const login = (userData) => {
    localStorage.setItem("userId", userData.id);
    localStorage.setItem("userName", userData.fullName);
    setUser({ id: userData.id, name: userData.fullName });
  };

  const logout = () => {
    localStorage.removeItem("userId");
    localStorage.removeItem("userName");
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

// ✅ yaha se export karo
export const useAuth = () => {
  return useContext(AuthContext);
};
