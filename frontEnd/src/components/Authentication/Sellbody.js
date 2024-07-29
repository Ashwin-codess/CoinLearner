import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Modal from "@material-ui/core/Modal";
import Backdrop from "@material-ui/core/Backdrop";
import Fade from "@material-ui/core/Fade";
import Typography from "@material-ui/core/Typography";
import { CryptoState } from "../../CryptoContext";
import axios from "axios";


const useStyles = makeStyles((theme) => ({
  modal: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  paper: {
    backgroundColor: "white",
    border: "2px solid #000",
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
}));

export default function Sellbody({
  Coinname,
  Curramt,
  Amt,
  Uid,
  Date,
  Noofcoin,
  Investtid,
}) {
  const [selldata, setselldata] = useState({
    COINNAME: "",
    AMOUNT: "",
    NOOFCOIN: "",
    SELLAMT: 0,
    PURAMT: "",
    UID: "",
    SELLDATE: "",
    PURDATE: "",
    INVESTID: "",
  });
  useEffect(() => {
   
    const date = new window.Date();

    let day = date.getDate();
    let month = date.getMonth() + 1;
    let year = date.getFullYear();
    // This arrangement can be altered based on how we want the date's format to appear.
    let currentDate = `${year}-${month}-${day}`;
    setselldata({
      COINNAME: Coinname,
      AMOUNT: Amt,
      NOOFCOIN: Noofcoin,
      SELLAMT: Curramt,
      PURAMT: Amt,
      UID: Uid,
      SELLDATE: currentDate,
      PURDATE: Date,
      INVESTID: Investtid,
    });
    console.log(selldata);
  }, []);

  const { setAlert,symbol } = CryptoState();
  const sellcoin = async () => {
   

    console.log(selldata);

    try {
      await axios
        .post(`http://localhost:8800/userpage${Uid}/history`, selldata)
        .then((res) => {
          console.log(res.data);
          handleClose();
        });
      setAlert({
        open: true,
        message: "Selled!! SUccessfully",
        type: "success",
      });
    } catch {
      console.log("error");
    }
  };
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);

  const handleOpen = () => {
    setOpen(true);
    const date = new window.Date();

    let day = date.getDate();
    let month = date.getMonth() + 1;
    let year = date.getFullYear();
    // This arrangement can be altered based on how we want the date's format to appear.
    let currentDate = `${year}-${month}-${day}`;
    console.log(currentDate);
    setselldata({
      COINNAME: Coinname,
      AMOUNT: Amt,
      NOOFCOIN: Noofcoin,
      SELLAMT: Curramt,
      PURAMT: Amt,
      UID: Uid,
      SELLDATE: currentDate,
      PURDATE: Date,
      INVESTID: Investtid,
    });
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
      <button type="button" onClick={handleOpen} style={{width:"100px",height:"30px",color:"black", fontFamily: "Montserrat",fontSize:"14px",fontWeight:700}}>
        SELL
      </button>
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        className={classes.modal}
        open={open}
        onClose={handleClose}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={open}>
          <div className={classes.paper} style={{backgroundColor:"gold",borderRadius:"10px"}}>
            <h1 id="transition-modal-title"  style={{ color: "white", fontFamily: "Montserrat",fontSize:"15px",fontWeight:500,marginBottom:"20px" }}>Selling</h1>
            <h1 id="transition-modal-title" style={{ color: "black", fontFamily: "Montserrat",fontSize:"18px",fontWeight:700 ,marginBottom:"10px"}}>
              {Coinname} coins of {symbol}{Curramt}
            </h1>
            <h1 id="transition-modal-title" style={{ color: "grey", fontFamily: "Montserrat",fontSize:"14px",fontWeight:500,marginBottom:"10px" }}>
              Purchased on {Date} for {Amt}
            </h1>
            <button style={{ color: "grey", width:"100px",height:"45px",color:"black",backgroundColor:"yellow", fontFamily: "Montserrat",fontSize:"18x",fontWeight:700,borderRadius:"10px" }} onClick={sellcoin}>
              Sell
            </button>
          </div>
        </Fade>
      </Modal>
    </div>
  );
}
