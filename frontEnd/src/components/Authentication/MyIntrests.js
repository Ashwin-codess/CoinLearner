import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import Cards from "./Cards";

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

export default function MyIntrests() {
  const classes = useStyles();
  


  return (
    <div className={classes.root}>
      <Grid container spacing={3}>
        {["1", "2", "3",].map((e) => (
          <Grid item xs={12} sm={6}>
         
          </Grid>
        ))}
      </Grid>
    </div>
  );
}
