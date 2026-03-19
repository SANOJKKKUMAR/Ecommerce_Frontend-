import { createContext, useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { MyContext } from "./CurrentUser";
import axios from "axios";



export const URL = import.meta.env.VITE_API_URL;

export const MyContextLogin = createContext();

export const MyProvider = ({ children }) => {
  const { currentUser } = useContext(MyContext);
  const navigate = useNavigate();

  const [user, setUser] = useState(null);
  const [addresses, setAddress] = useState(null);

  // ADD ADDRESS
  const SaveAddress = async (address) => {
    try {
      const res = await axios.post(URL + "addadress", {
        userId: currentUser._id,
        address: address,
      });

      setAddress(res.data.address);
    } catch (error) {
      console.log("error from save address", error);
    }
  };

  // GET ADDRESS
  const getAddress = async () => {
    try {

      const res = await axios.post(URL + "getadress", {
        userId: currentUser._id,
      });

      setAddress(res.data.address);
    } catch (error) {
      console.log("error from get address", error);
    }
  };

  // UPDATE ADDRESS
  const updateAddress = async ( address) => {
    console.log("click pdateaddress button")
    try {
      const res = await axios.post(URL + "updateadress", {
         userId: currentUser._id,
        address,
      });

      setAddress(res.data.address);
    } catch (error) {
      console.log("error from update address", error);
    }
  };

  // DELETE ADDRESS
  const deleteAddress = async (addresId) => {
    console.log("clik delete button");
    try {
      await axios.post(URL + "deleteadress", {
        userId: currentUser._id,
        addresId
      });

      setAddress(null);
    } catch (error) {
      console.log("error from delete address", error);
    }
  };

  const login = (userData) => {
    setUser(userData.user);
    navigate("/");
  };

  return (
    <MyContextLogin.Provider
      value={{
        login,
        user,
        addresses,
        SaveAddress,
        getAddress,
        updateAddress,
        deleteAddress,
      }}
    >
      {children}
    </MyContextLogin.Provider>
  );
};
