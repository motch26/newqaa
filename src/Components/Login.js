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
  ThemeProvider,
  Paper,
  Link,
} from "@mui/material";
import { Lock } from "@mui/icons-material";
import { blue, grey } from "@mui/material/colors";
import theme from "../Theme";
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
    <ThemeProvider theme={theme.defaultTheme}>
      <Box
        sx={{
          backgroundImage: "url('img/bg.jpg')",
          height: "100vh",
        }}
      >
        <Grid container>
          <Grid item xs={7}>
            <Paper
              sx={{
                bgcolor: "primary.dark",
                maxWidth: "70%",
                p: 2,
                display: "flex",
                alignItems: "center",
                mt: 5,
              }}
              elevation={24}
            >
              <img
                src="img/logo.png"
                width={70}
                height={70}
                style={{
                  marginRight: 20,
                  border: "2px solid white",
                  padding: 2,
                  backgroundColor: "white",
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
                  variant="h4"
                  fontWeight={600}
                >
                  CARLOS HILADO MEMORIAL
                </Typography>
                <Typography
                  display="inline"
                  width="auto"
                  lineHeight={1}
                  variant="h4"
                  fontWeight={600}
                  color="primary.light"
                >
                  State University
                </Typography>
              </Box>
            </Paper>
          </Grid>
          <Grid item xs={5} sx={{}}>
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
                <Typography sx={loginTitle}>CHMSU</Typography>
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
                  Accreditation Management System
                </Typography>
                <Stack
                  sx={{
                    width: "100%",
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
                  <Typography
                    variant="h6"
                    fontWeight={400}
                    sx={{ lineHeight: 1.5 }}
                    textAlign="center"
                  >
                    By using this service, you understood and agree to the{" "}
                    <Link>
                      {" "}
                      CHMSU Online Services Terms of Use and Privacy Statement
                      {"."}
                    </Link>
                  </Typography>
                </Container>
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
