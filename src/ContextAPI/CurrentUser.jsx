import axios from "axios";
import { createContext, useState, useEffect } from "react";
import { URL } from "./MyContext";

export const MyContext = createContext();

export const UserProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const CurrentLoginUser = (userData) => {
 
    setCurrentUser(userData.user);
  };

  const getUser = async () => {


    try {
      let res = await axios.get(URL + "current-user", {
        withCredentials: true,
      });

      setCurrentUser(res.data.user);
    } catch (error) {
      console.error("Error fetching user:", error);
      setCurrentUser(null);
    } finally {
      setLoading(false); 
    }
  };

  const logoutUser = async () => {
    try {
      await axios.post(
        URL + "logout",
        {},
        {
          withCredentials: true,
        },
      );


      setCurrentUser(null);
    } catch (error) {
      console.error("Logout error:", error);
    }
  };

  useEffect(() => {
    getUser();

  }, []);



  return (
    <MyContext.Provider
      value={{ CurrentLoginUser, currentUser, getUser, loading, logoutUser }}
    >
      {children}
    </MyContext.Provider>
  );
};
