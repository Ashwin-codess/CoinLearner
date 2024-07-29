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

export default function Cards({ coin, setci, ci }) {
  const { currency, symbol, user } = CryptoState();
  const classes = useStyles();
  const bull = <span className={classes.bullet}>•</span>;
  function numberWithCommas(x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  }
  const fetchcoindata = async (x) => {
    if (x <= 0) {
      console.log("qqqqqqqqqqqq");
      console.log(coin.AMOUNT);
      setcurentval(parseInt(coin.AMOUNT));
      setci(ci + parseInt(coin.AMOUNT));
      return parseInt(coin.AMOUNT);
    } else {
      let data = await axios.get(
        `https://api.coingecko.com/api/v3/coins/${coin.COINNAME.toLowerCase()}/market_chart?vs_currency=INR&days=${x}`
      );
      console.log(data);
      data = data.data.prices[0][1];

      console.log(coin.NOOFCOINS * data);
      setcurentval((coin.NOOFCOINS * data).toFixed(2));
      setci(ci + parseInt((coin.NOOFCOINS * data).toFixed(2)));
      return coin.NOOFCOINS * data;
    }
  };
  function convertodate(x) {
    var d1 = new Date();
    var d2 = new Date(x);
    var diff = d1.getTime() - d2.getTime();
    var daydiff = diff / (1000 * 60 * 60 * 24);
    console.log("hehe");
    console.log(daydiff);
    if (daydiff < 0) {
      const y = Math.ceil(daydiff);

      fetchcoindata(y);
    }
    fetchcoindata(Math.floor(daydiff));
  }
  const [currentval, setcurentval] = useState();
  useEffect(async () => {
    await convertodate(coin.DATE);
  }, []);
  return (
    <Card className={classes.root}>
      <CardContent>
        <Typography
          className={classes.title}
          color="textSecondary"
          gutterBottom
          style={{  fontFamily: "Montserrat",color:"yellow",fontSize:"15px",fontWeight:700}}
        >
          {coin.COINNAME}
        </Typography>
        <Typography variant="h5" component="h2"   style={{  fontFamily: "Montserrat",color:"white",fontSize:"30px",fontWeight:700}}>
          { `${symbol} ${currentval}`}
        </Typography>
        <Typography className={classes.pos} color="textSecondary" style={{  fontFamily: "Montserrat",fontSize:"14px",fontWeight:500}}>
          Current Status
        </Typography>
        <Typography variant="body2" component="p"style={{  fontFamily: "Montserrat",fontSize:"14px",fontWeight:300}}>
          Invested {`${symbol}${coin.AMOUNT} `} 
          <br/>
          {coin.NOOFCOINS}{" "}
          {coin.COINNAME + "s"}
          <br />
          on {coin.DATE.toString().slice(0, 10)}
        </Typography>
      </CardContent>
      <CardActions>
        <Sellbody
          Coinname={coin.COINNAME}
          Amt={coin.AMOUNT}
          Curramt={currentval}
          Uid={coin.USERID}
          Date={coin.DATE.slice(0,10)}
          Noofcoin={coin.NOOFCOINS}
          Investtid={coin.INVESTMENTID}
        />
      </CardActions>
    </Card>
  );
}
