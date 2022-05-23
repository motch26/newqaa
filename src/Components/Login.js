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
  Typography,
  ThemeProvider,
  Paper,
  Link,
  Modal,
} from "@mui/material";

import theme from "../Theme";
import { loginButton } from "../Theme/Login";

function Login() {
  const [showPrivacy, setShowPrivacy] = useState(true);
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
    <ThemeProvider theme={theme.defaultTheme}>
      <Box
        sx={{
          backgroundImage: "url('img/bg.jpg')",
          height: "100vh",
        }}
      >
        <Grid container>
          <Grid item xs={12} md={7}>
            <Paper
              sx={{
                bgcolor: "primary.dark",
                width: "fit-content",
                minWidth: "30%",
                p: 1,
                display: "flex",
                alignItems: "center",
                mt: 5,
              }}
              elevation={24}
            >
              <img
                src="img/logo.png"
                alt="logo"
                width={90}
                height={90}
                style={{
                  marginRight: 20,

                  padding: 2,
                }}
              />
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  color: "white",
                }}
              >
                <Typography
                  display="inline"
                  width="auto"
                  lineHeight={1}
                  sx={{ fontSize: { xs: 20, md: 25, lg: 30, xl: 40 }, mr: 2 }}
                  fontWeight={600}
                >
                  CARLOS HILADO MEMORIAL STATE UNIVERSITY
                </Typography>
                <Typography
                  display="inline"
                  width="auto"
                  lineHeight={1}
                  variant="h3"
                  sx={{ fontSize: { xs: 20, md: 25, lg: 30, xl: 40 } }}
                  fontWeight={600}
                  color="primary.light"
                ></Typography>
              </Box>
            </Paper>
          </Grid>
          <Grid item xs={12} md={5} sx={{}}>
            <Box
              sx={{
                height: "100vh",
                backgroundColor: "primary.light",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                p: 2,
                position: "relative",
              }}
            >
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <Typography
                  sx={{
                    fontWeight: 800,
                    fontSize: { xs: 30, lg: 40, xl: 55 },
                    lineHeight: "1",
                    textAlign: "center",
                    width: "80%",
                    color: "white",
                    backgroundColor: "primary.dark",
                    p: 1,
                    borderRadius: 4,
                    mb: 2,
                  }}
                >
                  Accreditation Management System
                </Typography>
                <Typography
                  sx={{
                    fontSize: { xs: 20, sm: 30, lg: 40 },
                    textAlign: "center",
                    fontWeight: 400,
                    color: "primary.main",
                    borderRadius: 4,
                    p: "2px 10px",
                    mb: 5,
                    lineHeight: 1,
                  }}
                >
                  (AMS)
                </Typography>
                <Stack
                  sx={{
                    width: "60%",
                    backgroundColor: "white",
                    p: 2,
                  }}
                >
                  <TextField
                    label="Username"
                    placeholder="Enter your username"
                    variant="outlined"
                    onChange={changeUsername}
                    sx={{
                      mb: 2,
                      border: "3px solid",
                      borderColor: "primary.light",
                    }}
                  />

                  <TextField
                    type="password"
                    label="Password"
                    placeholder="Enter your password"
                    variant="outlined"
                    sx={{ border: "3px solid", borderColor: "primary.light" }}
                    onChange={changePassword}
                  />
                  <Button
                    onClick={checkLogin}
                    variant="contained"
                    sx={loginButton}
                    size="large"
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
                <Container sx={{ mt: 5 }}>
                  <Box>
                    By using this service, you understood and agree to the
                    <Link
                      onClick={() => setShowPrivacy(true)}
                      sx={{ cursor: "pointer" }}
                    >
                      {" "}
                      CHMSU Online Services Terms of Use and Privacy Statement
                      {"."}
                    </Link>
                  </Box>
                </Container>
                <Modal
                  open={showPrivacy}
                  onClose={() => setShowPrivacy(false)}
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <Box
                    sx={{
                      backgroundColor: "white",
                      p: 1,
                      borderRadius: 4,
                      maxWidth: "60vw",
                    }}
                  >
                    <Box
                      sx={{
                        backgroundColor: "primary.light",
                        p: 1,
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                      }}
                    >
                      <Typography variant="h6">
                        CHMSU Privacy Statement
                      </Typography>
                    </Box>

                    <Typography variant="h6" fontWeight={400} sx={{ p: 2 }}>
                      In compliance with Republic Act No. 10173, otherwise known
                      as the Data Privacy Act of 2012. I hereby acknowledge that
                      my personal information provided is solely used for Carlos
                      Hilado Memorial State University. That by virtue of the
                      said law, I freely give my consent and hereby agree to the
                      collections, access and processing of my sensitive
                      personal and privileged information - as defined under RA
                      10173 - DPC Act 2012 for any legal and all legitimate
                      interests of CHMSU as Higher Educational Institution.
                    </Typography>
                    <Button
                      variant="contained"
                      sx={{
                        bgcolor: "primary.main",
                        ml: "auto",
                        display: "block",
                        width: "auto",
                        mr: 2,
                      }}
                      onClick={() => setShowPrivacy(false)}
                    >
                      Proceed to Login
                    </Button>
                  </Box>
                </Modal>
              </Box>
              <Box sx={{ position: "absolute", bottom: 10 }}>
                <Footer />
              </Box>
            </Box>
          </Grid>
        </Grid>
      </Box>
    </ThemeProvider>
  );
}

export default Login;
