import { createContext, useContext, useState } from "react";
import { apiUrl } from "../../config";
const MyContext = createContext();

export const MyContextProvider = ({ children }) => {
  const [isLogin, setIsLogin] = useState(false);
  const [userLogin, setUserLogin] = useState({
    email: "",
    password: "",
  });

  const loginUrl = async () => {
    try {
      const response = await fetch(`${apiUrl}users/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(userLogin),
      });
      const data = await response.json();
      const authToken = data.accessToken;
      console.log(authToken);
      if (data.message === "Login successfully") {
        setIsLogin(true);
        localStorage.setItem("Authentication", authToken);
        setUserLogin({
          email: "",
          password: "",
        });
      }
    } catch (error) {
      console.error("Error during registration:", error);
    }
  };

  return (
    <MyContext.Provider
      value={{ loginUrl, setIsLogin, isLogin, setUserLogin, userLogin }}
    >
      {children}
    </MyContext.Provider>
  );
};

export const useMyContext = () => {
  return useContext(MyContext);
};
