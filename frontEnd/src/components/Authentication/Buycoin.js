import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Modal from "@material-ui/core/Modal";
import Backdrop from "@material-ui/core/Backdrop";
import Fade from "@material-ui/core/Fade";
import { Button, TextField, Box, CircularProgress } from "@material-ui/core";
import axios from "axios";
import { useEffect } from "react";
import { CryptoState } from "../../CryptoContext";
const useStyles = makeStyles((theme) => ({
  modal: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  paper: {
    backgroundColor: theme.palette.background.paper,
    border: "2px solid #000",
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
}));

export default function Buycoin({ coinname, coinprice, userid, coinprice2 }) {
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);
  const [Amount, setAmount] = useState(0);
  const handleOpen = () => {
    setOpen(true);
  };
  const { setAlert,symbol } = CryptoState();
  const handleClose = () => {
    setOpen(false);
  };
  const [newinvests, setnewinvests] = useState({
    COINNAME: "",
    AMOUNT: 0,
    NOOFCOINS: 0,
    USERID: "",
    DATE: "",
    INVESTMENTID: "",
  });
  let [loading, setloading] = useState(false);

  const amt2coin = async (amount) => {
    let noofcoins = parseInt(amount) / parseInt(coinprice2);
    noofcoins = noofcoins.toFixed(5);
    const date = new Date();
    const id = date.getMilliseconds();

    let day = date.getDate() + 1;
    let month = date.getMonth() + 1;
    let year = date.getFullYear();

    let currentDate = `${year}-${month}-${day}`;
    console.log(currentDate);
    setnewinvests({
      COINNAME: coinname,
      AMOUNT: amount,
      NOOFCOINS: noofcoins,
      USERID: userid,
      DATE: currentDate,
      INVESTMENTID: id,
    });
    console.log(newinvests);
  };
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
  useEffect(() => {
    amt2coin(Amount);
  }, [Amount]);

  return (
    <div>
      <button
        type="button"
        onClick={handleOpen}
        style={{
          width: "150px",
          height: "70px",
          backgroundColor: "gold",
          borderRadius: "10px",
          fontFamily: "Montserrat",
          cursor: "pointer",
          fontSize:"18px",
          fontWeight:700,
          "&:hover": {
            backgroundColor: "gold",
            color: "black",
          },
        }}
      >
        INVEST
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
          {loading == true ? (
            <div className={classes.paper}>
              <CircularProgress
                style={{ color: "gold" }}
                size={70}
                thickness={2}
              />
            </div>
          ) : (
            <div className={classes.paper} style={{  fontFamily: "Montserrat",
            cursor: "pointer",
            fontSize:"18px",
            fontWeight:700,
            backgroundColor:"gold",borderRadius:"10px"}}>
              <span id="transition-modal-title" style={{  fontFamily: "Montserrat",
          cursor: "pointer",
          fontSize:"18px",
          fontWeight:700}}>
                {coinname} - {symbol} {coinprice}
              </span>
              <Box
                p={3}
                style={{
                  display: "flex",
                  flexDirection: "column",
                  gap: "20px",
                }}
              >
                <TextField
                   fontColor="black"
                  variant="outlined"
                  type="number"
                  label="Enter Amount"
                  value={Amount}
                  onChange={(e) => setAmount(e.target.value)}
                  fullWidth 
                ></TextField>
                <Button
                  variant="contained"
                  size="large"
                  style={{ backgroundColor: "yellow" ,  fontFamily: "Montserrat",
                  cursor: "pointer",
                  fontSize:"18px",
                  fontWeight:700,}}
                  onClick={async (event) => {
                    setloading(true);
                    await amt2coin(Amount);
                    await createnewinvestment(newinvests, userid);
                    setAlert({
                      open: true,
                      message: `Invested succefully on ${coinname}`,
                      type: "success",
                    });
                    setloading(false);

                    handleClose();
                  }}
                >
                  BUY
                </Button>
              </Box>
            </div>
          )}
        </Fade>
      </Modal>
    </div>
  );
}
