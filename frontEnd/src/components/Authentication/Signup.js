import { Box, Button, TextField } from "@material-ui/core";
import React from "react";
import { useState } from "react";

import { CryptoState } from "../../CryptoContext";
import { createUserWithEmailAndPassword, getAdditionalUserInfo, } from "firebase/auth";
import { auth } from "../../firebase";

function Signup({ handleClose }) {
  const [email, setEmail] = useState("");
  const { setAlert, createmyacc, setnewuser } = CryptoState();
  const handleSubmit = async () => {
    if (password != confirmPassword) {
      setAlert({
        open: true,
        message: "Passords do not match",
        type: "error",
      });
      return;
    }
    try {
      const result = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      ).then((res) => {
        const { isNewUser } = getAdditionalUserInfo(res);
        console.log("hehe");
        console.log(res.email);
        console.log(auth.currentUser.email);
        const email = auth.currentUser.email;
        if (isNewUser) {
          const mydata = {
            USERID: email,
            NAME: email,
            WALLET: "0",
          };
          setnewuser((newuser) => ({ ...newuser, ...mydata }));
          try {
            console.log(mydata);
            setnewuser(mydata);
            createmyacc(mydata).then(()=> window.location.reload());
          } catch {
            console.log("error wqith post");
          }
        }

        setAlert({
          open: true,
          message: "Sign Up Successful . welcome!! ",
          type: "success",
        });
        handleClose();
      });
    } catch (error) {
      setAlert({
        open: true,
        message: error.message,
        type: "success",
      });
    }
  };
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  return (
    <Box
      p={3}
      style={{ display: "flex", flexDirection: "column", gap: "20px" }}
    >
      <TextField
        variant="outlined"
        type="email"
        label="Enter Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        fullWidth
      ></TextField>
      <TextField
        variant="outlined"
        type="password"
        label="Enter password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        fullWidth
      ></TextField>
      <TextField
        variant="outlined"
        type="password"
        label="Confirm Password"
        value={confirmPassword}
        onChange={(e) => setConfirmPassword(e.target.value)}
        fullWidth
      ></TextField>

      <Button
        variant="contained"
        size="large"
        style={{ backgroundColor: "yellow" }}
        onClick={handleSubmit}
      >
        SignUp
      </Button>
    </Box>
  );
}

export default Signup;
