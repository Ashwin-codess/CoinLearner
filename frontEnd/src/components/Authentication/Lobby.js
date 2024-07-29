import React from "react";
import PropTypes from "prop-types";
import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";
import Cards from "./Cards";
import Myinvestments from "./Myinvestments";
import MyIntrests from "./MyIntrests";
import History from "./History";

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box p={3}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired,
};

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    width: "630px",
    backgroundColor: theme.palette.background.paper,
  },
}));

export default function Lobby({ uid, setci, ci }) {
  const classes = useStyles();
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Tabs
          value={value}
          onChange={handleChange}
          aria-label="simple tabs example"
          TabIndicatorProps={{
            style: {
              backgroundColor: "grey",
              height:"5px"
            }
          }}
          style={{ backgroundColor: "gold", fontFamily: "Montserrat",color:"white",fontSize:"20px",fontWeight:700}}
        >
          <Tab label="Investments"  style={{  fontFamily: "Montserrat",color:"black",fontSize:"15px",fontWeight:700}}{...a11yProps(0)} />
          <Tab label="History" style={{ fontFamily: "Montserrat",color:"black",fontSize:"15px",fontWeight:700}}{...a11yProps(1)} />
        </Tabs>
      </AppBar>
      <TabPanel value={value} index={0}>
        <Myinvestments uid={uid} setci={setci} ci={ci} />
      </TabPanel>
      <TabPanel value={value} index={1}>
    <History uid={uid}/>
      </TabPanel>
    </div>
  );
}
