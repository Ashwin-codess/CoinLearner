import React from 'react'
import { useState } from "react";
import { Box, Button, TextField } from "@material-ui/core";
import { CryptoState } from "../../CryptoContext";
import { signInWithEmailAndPassword } from 'firebase/auth';

function Login( handleClose) {
    const [email, setEmail] = useState("");
const [password, setPassword] = useState("");
const { setAlert,auth} = CryptoState();
const handleSubmit= async()=>{
    if(!email || !password){
        setAlert({
            open: true,
            message: "Please fill all the feilds ",
            type: "error ",
          });
    }
    try {
        const result = await signInWithEmailAndPassword(
         auth,
          email,
          password
        );
  
        setAlert({
          open: true,
          message: "LOGIN  Successful . welcome!! ",
          type: "success",
        });
        handleClose();
      } catch (error) {
          setAlert({
              open: true,
              message: error.message,
              type: "success",
            });
  
      }

}
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
     

    <Button variant="contained"
    size="large" style={{backgroundColor:"yellow"}} 
    onClick={handleSubmit}>LOGIN</Button>
  </Box>
  )
}

export default Login
