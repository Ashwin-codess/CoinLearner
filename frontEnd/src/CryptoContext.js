import React, { createContext, useContext, useEffect, useState } from "react";
import axios from "axios";
import { CoinList } from "./config/api";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "./firebase";

const Crypto = createContext();

const CryptoContext = ({ children }) => {
  const [currency, setCurrency] = useState("INR");
  const [symbol, setSymbol] = useState("₹");
  const [coins, setCoins] = useState([]);
  const [loading, setLoading] = useState(false);
  const [user, setUser] = useState(null);
  const [mydata, setmydata] = useState({
    USERID: "",
    NAME: "",
    WALLET: "",
  });
  const [alert, setAlert] = useState({
    open: false,
    message: "",
    type: "success",
  });
  useEffect(async() =>  {
 onAuthStateChanged(auth,  (user) => {
      if (user) {
        setUser(user);
      } else setUser(null);
    });
  
  }, []);
  const fetchCoins = async () => {
    setLoading(true);
    console.log("jjj");

    const data  =  CoinList(currency);
    console.log("hehe");
    console.log(data);
    console.log(data);
    setCoins(data);
    setLoading(false);
  };

  const [newuser, setnewuser] = useState({
    USERID: "",
    NAME: "",
    WALLET: "",
  });
  const createmyacc = async (myyydata) => {
    try {
      console.log("inside create acc");
      console.log(newuser);
      console.log("inside create acc2");
      console.log(myyydata);
      await axios.post("http://localhost:8800/", myyydata).then((res) => {
        console.log("SADFHUBALDUFSH");
        console.log(res.data);
      });
      setmydata((mydata) => ({ ...mydata, ...myyydata }));
      console.log("qqqqqqqqqqq");
      console.log(mydata);
      console.log("SADFHUBALDUFSH");
    } catch {
      console.log("error");
    }
  };

  // const fetchmyacc = async (uid) => {
  //   try {
  //     const res = await axios
  //       .get(`http://localhost:8800/fetchinfo=${uid}`)
  //       .then((res) => {
        
  //         return res.data[0];
  //       });
  //     return res;
  //   } catch (err) {
  //     console.log(err);
  //     return;
  //   }
  // };

  const [newinvests, setnewinvests] = useState({
    COINNAME: "",
    AMOUNT: "",
    NOOFCOINS: 0,
    USERID: "",
    DATE: "",
    INVESTMENTID: "",
  });
  const createnewinvestment = async (investdata, uid) => {
    try {
      await axios
        .post(`http://localhost:8800/userpage${uid}`, investdata)
        .then((res) => {
          console.log(res.data);
        });
    } catch {
      console.log("error");
    }
  };
  const [allinvests, setallinvests] = useState();
  const fetchmyinvests = async (uid) => {
    try {
      const res = await axios
        .get(`http://localhost:8800/userpage${uid}`)
        .then((res) => {
          console.log(res.data);
        });
      setallinvests(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    if (currency === "INR") setSymbol("₹");
    else if (currency === "USD") setSymbol("$");
  }, [currency]);

  return (
    <Crypto.Provider
      value={{
        currency,
        setCurrency,
        symbol,
        coins,
        loading,
        fetchCoins,
        alert,
        setAlert,
        user,
        setnewinvests,
        setnewuser,
        newuser,
        createmyacc,
        createnewinvestment,
      }}
    >
      {children}
    </Crypto.Provider>
  );
};

export default CryptoContext;

export const CryptoState = () => {
  return useContext(Crypto);
};
