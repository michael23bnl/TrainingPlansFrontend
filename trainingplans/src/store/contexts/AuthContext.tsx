import { createContext, useContext, useEffect, useState } from "react";
import { isLoggedIn as checkIsLoggedIn, logout as performLogout } from "../../api/users";

interface IAuthContext {
    isLoggedIn: boolean;
    login: () => void;
    logout: () => void;
  }

const AuthContext = createContext<IAuthContext | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);

  useEffect(() => {
    const checkAuth = async () => {
      const loggedIn = await checkIsLoggedIn();
      setIsLoggedIn(loggedIn);
    };

    checkAuth();
  }, []);

  const login = () => {
    setIsLoggedIn(true);
  };

  const logout = async () => {
    await performLogout();
    setIsLoggedIn(false);
    window.location.reload()
  };

  return (
    <AuthContext.Provider value={{ isLoggedIn, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuthContext = (): IAuthContext => {
    const context = useContext(AuthContext);
    if (!context) {
      throw new Error("useAuth must be used within an AuthProvider");
    }
    return context;
  };
  
