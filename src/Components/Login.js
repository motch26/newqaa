import React, { useState, useEffect } from "react";
import Footer from "./Footer";
import { useCookies } from "react-cookie";
import { Navigate } from "react-router-dom";
import axios from "axios";
import {
  Container,
  Box,
  TextField,
  Stack,
  Button,
  Grid,
  Alert,
  Avatar,
  Typography,
} from "@mui/material";
import { Lock } from "@mui/icons-material";
import { blue, grey } from "@mui/material/colors";

import { loginTitle, loginForm, loginButton } from "../Theme/Login";

function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [cookies, setCookie] = useCookies(["userID", "username", "isAdmin"]);
  const [userID, setUserID] = useState(null);
  const [isWarningVisble, setWarningVisible] = useState(false);
  const [isServerError, setServerError] = useState(false);

  const changeUsername = (e) => setUsername(e.target.value);
  const changePassword = (e) => setPassword(e.target.value);
  const checkLogin = () => {
    const formData = new FormData();
    formData.append("username", username);
    formData.append("password", password);
    axios
      .post(`http://ams.chmsc.edu.ph/api/login.php`, formData, {
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
      })
      .then((res) => {
        console.log(res);
        if (res.data) {
          const resUserID = res.data.id;
          const resIsAdmin = res.data.isAdmin;
          const resUsername = res.data.username;
          setUserID(resUserID);
          setCookie("userID", resUserID, {
            path: "/",
          });
          setCookie("username", resUsername, {
            path: "/",
          });
          setCookie("isAdmin", resIsAdmin, {
            path: "/",
          });
          setWarningVisible(false);
        } else setWarningVisible(true);
      })
      .catch(() => setServerError(true));
  };

  useEffect(() => {
    if (cookies.userID) setUserID(cookies.userID);
  }, [cookies.userID]);

  return (
    <Box>
      <Grid container bgcolor={grey[50]} height="95vh">
        <Grid item xs={6}>
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              alignContent: "center",
              justifyContent: "center",
              height: "90vh",
            }}
          >
            <img src="img/logo.png" alt="logo" width={140} height={140} />
            <Typography sx={loginTitle}>
              Carlos Hilado Memorial State University
            </Typography>
            <Typography
              sx={{
                fontSize: { xs: 20, sm: 30, md: 40 },
                fontWeight: 300,
                textAlign: "center",
                bgcolor: "primary.light",
                borderRadius: 4,
                p: "2px 10px",
                mt: 2,
              }}
            >
              Accreditation Management System
            </Typography>
          </Box>
        </Grid>
        <Grid item xs={6}>
          <Container maxWidth="md">
            <Box component="form" sx={loginForm}>
              <Stack
                sx={{
                  width: "100%",
                }}
              >
                <Avatar
                  sx={{ width: 40, height: 40, bgcolor: blue[500], mx: "auto" }}
                >
                  <Lock />
                </Avatar>
                <h3>Username:</h3>
                <TextField
                  label="Enter your username"
                  variant="outlined"
                  onChange={changeUsername}
                  size="small"
                />
                <h3>Password:</h3>
                <TextField
                  type="password"
                  label="Enter your password"
                  variant="outlined"
                  onChange={changePassword}
                  size="small"
                />
                <Button
                  onClick={checkLogin}
                  variant="contained"
                  sx={loginButton}
                >
                  Sign-In
                </Button>
                {isWarningVisble ? (
                  <Alert
                    severity="error"
                    sx={{
                      marginTop: 2,
                    }}
                  >
                    User not found! Please try again.
                  </Alert>
                ) : null}
                {isServerError ? (
                  <Alert
                    severity="error"
                    sx={{
                      marginTop: 2,
                    }}
                  >
                    Network Error!
                  </Alert>
                ) : null}
                {userID ? <Navigate to="/user" /> : null}
              </Stack>
            </Box>
          </Container>
        </Grid>
      </Grid>
      <Footer />
    </Box>
  );
}

export default Login;
