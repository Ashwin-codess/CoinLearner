import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import { CryptoState } from "../../CryptoContext";
import axios from "axios";
import { useEffect } from "react";
import Sellbody from "./Sellbody";

const useStyles = makeStyles({
  root: {
    minWidth: 275,
  },
  bullet: {
    display: "inline-block",
    margin: "0 2px",
    transform: "scale(0.8)",
  },
  title: {
    fontSize: 14,
  },
  pos: {
    marginBottom: 12,
  },
});

export default function Historycard({ coin }) {
  const { currency, symbol, user } = CryptoState();
  const classes = useStyles();
  const bull = <span className={classes.bullet}>•</span>;
  function numberWithCommas(x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  }

  const [currentval, setcurentval] = useState();
  useEffect(async () => {}, []);
  return (
    <Card className={classes.root}>
      <CardContent>
        <Typography
          className={classes.title}
          color="textSecondary"
          gutterBottom style={{  fontFamily: "Montserrat",fontSize:"15px",fontWeight:700,color:"yellow"}}
        >
          {coin.COINNAME}
        </Typography>
        <Typography className={classes.pos} color="textSecondary" style={{  fontFamily: "Montserrat",fontSize:"14px",fontWeight:500}}>
          Selled at
        </Typography>
        <Typography variant="h5" component="h2" style={{  fontFamily: "Montserrat",fontSize:"27px",fontWeight:700}}>
          {`${symbol} ${numberWithCommas(coin.SELLAMT)} `}
        </Typography>
       
        <Typography variant="body2" component="p" style={{  fontFamily: "Montserrat",fontSize:"12px",fontWeight:500}}>
          & on {` ${coin.SELLDATE.slice(0,10)} `}
          <br />
          <br/>
          Purchased for {numberWithCommas(coin.PURAMT)}
          
          <br />
           & on {coin.PURDATE.slice(0, 10)}
         
        </Typography>
      </CardContent>
      <CardActions>
      </CardActions>
    </Card>
  );
}
