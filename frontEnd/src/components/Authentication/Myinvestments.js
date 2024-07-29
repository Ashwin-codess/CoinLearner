import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import Cards from "./Cards";
import axios from "axios";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  paper: {
    padding: theme.spacing(2),
    textAlign: "center",
    color: theme.palette.text.secondary,
  },
}));

export default function Myinvestments({ uid,setci,ci}) {
  const classes = useStyles();
  const [allinvests, setallinvests] = useState();
  const fetchmyinvests = async (uid) => {
    try {
      const res = await axios
        .get(`http://localhost:8800/userpage${uid}`)
        .then((res) => {
          console.log("hehehasdasd");
          console.log(res.data);
          setallinvests(res.data);
        });
    } catch (err) {
      console.log(err);
    }
  };
  
  useEffect(async () => {
    setci(0);
    await fetchmyinvests(uid);
  }, []);

  return allinvests == undefined  ? (
    <div style={{minHeight:"420px"}}>YOU HAVENT INVESTED!!</div>
  ) : allinvests.length!=0?(
    <div className={classes.root} style={{minHeight:"420px"}}>
      <Grid container spacing={3}>
        {allinvests.map((e) => (
          <Grid item xs={12} sm={6} key={e.INVESTMENTID}>
            <Cards coin={e} setci={setci} ci={ci} />
          </Grid>
        ))}
      </Grid>
    </div>
  ):
  <div>
     <div style={{minHeight:"420px"}}>YOU HAVENT INVESTED!!</div>
  
  </div>
}
