import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import Cards from "./Cards";
import axios from "axios";
import Historycard from "./Historycard";

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

export default function History({ uid }) {
  const classes = useStyles();
  const [allhistory, setallhistory] = useState();
  const fetchmyhistory = async (uid) => {
    try {
      const res = await axios
        .get(`http://localhost:8800/userpage${uid}/history`)
        .then((res) => {
          console.log("hehehasdasd");
          console.log(res.data);
          setallhistory(res.data);
        });
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(async () => {
    await fetchmyhistory(uid);
  }, []);

  return allhistory == undefined ? (
    <div>YOU HAVENT INVESTED!!</div>
  ) : (
    <div className={classes.root}>
      <Grid container spacing={3}>
        {allhistory.map((e) => (
          <Grid item xs={12} sm={6}>
            <Historycard coin={e} key={e.INVESTID}/>
          </Grid>
        ))}
      </Grid>
    </div>
  );
}
