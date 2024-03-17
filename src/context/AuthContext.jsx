import { createContext, useState, useContext, useEffect } from "react";
import propTypes from "prop-types";
import Cookies from "js-cookie";

export const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth debe estar dentro del proveedor AuthProvider");
  }
  return context;
};

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [isAuth, setIsAuth] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [errors, setErrors] = useState(null);

  const signin = async (data) => {
    try {
      const response = await fetch(`http://localhost:3000/api/signin`, {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
          "Access-Control-Credentials": true,
        },
        body: JSON.stringify(data),
      });

      const userData = await response.json();

      if (userData.errors) {
        setErrors(userData.errors);
        setIsLoading(false);
        return;
      }

      setErrors(null);
      setUser(userData);
      setIsAuth(true);
      setIsLoading(false);

      return userData;
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    setIsLoading(true);

    if (Cookies.get("token")) {
      setIsAuth(true);
    }

    setIsLoading(false);
  }, []);

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuth,
        isLoading,
        errors,
        signin,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

AuthProvider.propTypes = {
  children: propTypes.node.isRequired,
};
