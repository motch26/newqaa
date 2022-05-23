import React, { useState, useContext } from "react";
import { Navigate } from "react-router-dom";
import { useCookies } from "react-cookie";
import HomeIcon from "@mui/icons-material/Home";
import LogoutIcon from "@mui/icons-material/Logout";
import FolderIcon from "@mui/icons-material/Folder";
import InventoryIcon from "@mui/icons-material/Inventory";
import { Context } from "./../Context";
import Dropbox from "./Dropbox";
import Logs from "./Logs";
import {
  AppBar,
  Box,
  Toolbar,
  Typography,
  MenuItem,
  FormControl,
  Select,
  Button,
  Modal,
} from "@mui/material";
import StickyNote2Icon from "@mui/icons-material/StickyNote2";
import { blue, orange } from "@mui/material/colors";

function MyAppBar() {
  const [showCert, setShowCert] = useState(false);
  const { actions, program, isDropboxOpen, isLogsOpen } = useContext(Context);
  const [isLoggedOut, setLogOut] = useState(false);
  const [cookies, setCookie, removeCookie] = useCookies([
    "userID",
    "isAdmin",
    "username",
  ]);

  const logout = () => {
    removeCookie("userID", { path: "/" });
    removeCookie("isAdmin", { path: "/" });
    removeCookie("username", { path: "/" });
    setLogOut(true);
  };
  const handleProgramChange = (e) => {
    actions.setProgram(e.target.value);
    actions.setSubShown(false);
    actions.setProgramData(e.target.value);
  };

  const handleDropbox = (bool) => actions.setDropboxOpen(bool);
  const handleLogs = (bool) => actions.setLogsOpen(bool);

  const showHome = () => actions.setProgram("");

  return (
    <React.Fragment>
      <Box sx={{ flexGrow: 1 }}>
        <AppBar position="sticky">
          <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>
            <Box display="flex" alignItems="center">
              <img src="img/logo.png" alt="logo" width="50px" height="50px" />
              <Typography
                variant="h6"
                component="div"
                sx={{ flexGrow: 1, ml: 2 }}
              >
                Carlos Hilado Memorial State University | Accreditation
                Management System
              </Typography>
            </Box>

            <Box
              sx={{
                display: "flex",
                alignItems: "center",
              }}
            >
              <FormControl
                variant="standard"
                size="small"
                sx={{ minWidth: 150, borderRadius: 2, bgcolor: "white" }}
              >
                {["accreditor", "qaa", "admin", "library"].includes(
                  cookies.username
                ) ? (
                  <Select
                    value={program}
                    label="college"
                    displayEmpty
                    onChange={handleProgramChange}
                    sx={{ p: 1, borderRadius: 5 }}
                  >
                    <MenuItem disabled value="">
                      Programs
                    </MenuItem>
                    <MenuItem sx={{ bgcolor: orange[400] }} value="BSIT">
                      BSIT
                    </MenuItem>
                    <MenuItem sx={{ bgcolor: blue[200] }} value="BSED">
                      BSED
                    </MenuItem>
                    <MenuItem sx={{ bgcolor: blue[200] }} value="BEED">
                      BEED
                    </MenuItem>
                  </Select>
                ) : null}
                {cookies.username === "bsit" ? (
                  <Select
                    value={program}
                    label="college"
                    displayEmpty
                    onChange={handleProgramChange}
                    sx={{ p: 1, borderRadius: 5 }}
                  >
                    <MenuItem disabled value="">
                      Programs
                    </MenuItem>
                    <MenuItem sx={{ bgcolor: orange[400] }} value="BSIT">
                      BSIT
                    </MenuItem>
                  </Select>
                ) : null}
                {cookies.username === "bsed" ? (
                  <Select
                    value={program}
                    label="college"
                    displayEmpty
                    onChange={handleProgramChange}
                    sx={{ p: 1, borderRadius: 5 }}
                  >
                    <MenuItem disabled value="">
                      Programs
                    </MenuItem>
                    <MenuItem sx={{ bgcolor: blue[200] }} value="BSED">
                      BSED
                    </MenuItem>
                  </Select>
                ) : null}
                {cookies.username === "beed" ? (
                  <Select
                    value={program}
                    label="college"
                    displayEmpty
                    onChange={handleProgramChange}
                    sx={{ p: 1, borderRadius: 5 }}
                  >
                    <MenuItem disabled value="">
                      Programs
                    </MenuItem>
                    <MenuItem sx={{ bgcolor: blue[200] }} value="BEED">
                      BEED
                    </MenuItem>
                  </Select>
                ) : null}
              </FormControl>
              <Button
                variant="contained"
                color="info"
                size="small"
                sx={{ ml: 3 }}
                startIcon={<HomeIcon />}
                onClick={() => showHome()}
              >
                Home
              </Button>
              <Button
                variant="contained"
                color="info"
                size="small"
                sx={{ ml: 3 }}
                startIcon={<StickyNote2Icon />}
                onClick={() => setShowCert(true)}
              >
                COA
              </Button>
              <Button
                variant="contained"
                color="warning"
                size="small"
                sx={{ ml: 3 }}
                startIcon={<InventoryIcon />}
                onClick={() => handleDropbox(true)}
              >
                Dropbox
              </Button>
              {parseInt(cookies.isAdmin) ? (
                <Button
                  variant="contained"
                  color="info"
                  size="small"
                  sx={{ ml: 3 }}
                  startIcon={<FolderIcon />}
                  onClick={() => handleLogs(true)}
                >
                  Logs
                </Button>
              ) : null}

              <Button
                variant="contained"
                color="info"
                size="small"
                sx={{ ml: 3 }}
                startIcon={<LogoutIcon />}
                onClick={() => {
                  logout();
                  actions.setProgram("");
                  actions.setProgramData(null);
                }}
              >
                Logout
              </Button>
            </Box>
          </Toolbar>
        </AppBar>
      </Box>
      <Modal
        open={showCert}
        onClose={() => setShowCert(false)}
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Box sx={{ background: "white", p: 1 }}>
          <Typography
            id="modal-modal-title"
            variant="h6"
            component="h2"
            textAlign="center"
            sx={{ bgcolor: "primary.light" }}
          >
            Certificate of Authenticity
          </Typography>
          <img src="img/cert.png" alt="cert" style={{ maxWidth: "500px" }} />
        </Box>
      </Modal>
      {isLoggedOut ? <Navigate to="/" /> : null}
      {isDropboxOpen ? <Dropbox /> : null}
      {isLogsOpen ? <Logs /> : null}
    </React.Fragment>
  );
}

export default MyAppBar;
