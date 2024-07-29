import React, { createContext, useContext, useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Drawer from "@material-ui/core/Drawer";
import Button from "@material-ui/core/Button";
import { Avatar } from "@material-ui/core";
import { CryptoState } from "../../CryptoContext";
import Lobby from "./Lobby";
import axios from "axios";
import { signOut } from "firebase/auth";
import { auth } from "../../firebase";

const useStyles = makeStyles({
  list: {
    width: 250,
  },
  fullList: {
    width: "auto",
  },
});

export default function UserSidebar() {
  // useEffect(()=>{
  //   fetchmyacc((user.email));
  // })
  const [mydata, setmydata] = useState();
  const fetchmyacc = async (uid) => {
    try {
      const res = await axios
        .get(`http://localhost:8800/fetchinfo=${uid}`)
        .then((res) => {
          setmydata(res.data[0]);
          return res.data[0];
        });

      console.log("akyjhsfdhga");
      console.log(mydata);
    } catch (err) {
      console.log(err);
      return;
    }
  };
  const classes = useStyles();
  const [state, setState] = React.useState({
    right: false,
  });
  const [currinvst, setcurrinvst] = React.useState(0);
  const toggleDrawer = (anchor, open) => (event) => {
    if (
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }

    setState({ ...state, [anchor]: open });
  };
  const { user, setAlert, symbol } = CryptoState();
  const logoutbutton = () => {
    signOut(auth);
    setAlert({
      open: true,
      type: "success",
      message: "LOGOUT Successfull !!",
    });
    toggleDrawer();
  };

  useEffect(async () => {
    axios.get(`http://localhost:8800/fetchinfo=${user.email}`).then((res) => {
      setmydata(res.data[0]);
      console.log(mydata);
    });
  }, []);
  return mydata == undefined ? (
    <div></div>
  ) : (
    <div>
      {["right"].map((anchor) => (
        <React.Fragment key={anchor}>
          <Avatar
            onClick={toggleDrawer(anchor, true)}
            style={{
              height: 38,
              width: 38,
              cursor: "pointer",
              backgroundColor: "pink",
            }}
            src={user.photoUrl}
            alt={user.displayName || user.email}
          />
          <Drawer
            anchor={anchor}
            open={state[anchor]}
            onClose={toggleDrawer(anchor, false)}
          >
            <div
              style={{
                width: "700px",
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
                backgroundColor: "black",
              }}
            >
              <div
                style={{
                  width: "600px",
                  display: "flex",

                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <div
                  style={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    flexDirection: "column",
                    margin: "15px",
                  }}
                >
                  <Avatar
                    style={{
                      height: 90,
                      width: 90,
                      cursor: "pointer",
                      backgroundColor: "gold",
                      margin: "30px",
                    }}
                    src={user.photoUrl}
                    alt={user.displayName || user.email}
                  />
                  <div
                    style={{
                      fontFamily: "Montserrat",
                      color: "white",
                      fontWeight: 700,
                    }}
                  >
                    {mydata.USERID}
                  </div>
                </div>
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  <span
                    style={{
                      fontFamily: "Montserrat",
                      color: "white",
                      fontSize: "20px",
                    }}
                  >
                    YOUR WALLET
                  </span>
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                      marginTop:"30px",
                    }}
                  >
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        flexDirection: "column",
                       
                      }}
                    >
                      <div
                        style={{
                          fontFamily: "Montserrat",
                          color: "white",
                          fontSize: "14px",
                          
                        }}
                      >
                        Invested
                      </div>
                      <div
                        style={{
                          fontFamily: "Montserrat",
                          color: "white",
                          fontSize: "20px",
                          fontWeight: 700,
                          marginTop:"10px",
                        }}
                      >
                        {symbol}
                        {mydata.WALLET}
                      </div>
                    </div>
                    
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        flexDirection: "column",
                      
                       width:"160px"
                      }}
                    >
                      <div
                        style={{
                          fontFamily: "Montserrat",
                          color: "white",
                          fontSize: "14px",
                        }}
                      >
                        Current Status
                      </div>
                      <div
                        style={{
                          fontFamily: "Montserrat",
                          color: "white",
                          fontSize: "20px",
                          fontWeight: 700,
                          marginTop:"10px",
                        }}
                      >
                        {symbol}
                        {currinvst}
                      </div>
                    </div>
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        flexDirection: "column",
                       
                      }}
                    >
                      <div
                        style={{
                          fontFamily: "Montserrat",
                          color: "white",
                          fontSize: "14px",
                        }}
                      >
                        Selled
                      </div>
                      <div
                        style={{
                          fontFamily: "Montserrat",
                          color: "white",
                          fontSize: "20px",
                          fontWeight: 700,
                          marginTop:"10px",
                        }}
                      >
                        {symbol}
                        {mydata.SELLED}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <Lobby uid={mydata.USERID} setci={setcurrinvst} ci={currinvst} />
            </div>
            <Button
              variant="contained"
              onClick={logoutbutton}
              style={{
                height: "5%",
                width: "10%",
                backgroundColor: "gold",
                margin: "15px",
                position: "fixed",
              }}
            >
              LOGOUT
            </Button>
          </Drawer>
        </React.Fragment>
      ))}
    </div>
  );
}
