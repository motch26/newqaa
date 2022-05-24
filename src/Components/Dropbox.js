import React, { useState, useContext } from "react";
import { useCookies } from "react-cookie";
import { FileUploader } from "react-drag-drop-files";
import axios from "axios";
import DialogTitle from "@mui/material/DialogTitle";
import Dialog from "@mui/material/Dialog";
import {
  Alert,
  IconButton,
  DialogContent,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Box,
  Grid,
  Button,
  Chip,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { Context } from "./../Context";
import DropboxContent from "./DropboxContent";
import DropboxModal from "./DropboxModal";
import UploadedPDF from "./UploadedPDF";
import { orange } from "@mui/material/colors";
function Dropbox() {
  const { actions, file, isDropboxOpen } = useContext(Context);
  const [cookies, setCookie, removeCookie] = useCookies(["username"]);
  const [_file, setFile] = useState(null);
  const [seeFiles, setSeeFiles] = useState(true);
  const [_program, setProgram] = useState("");
  const [_areaNum, setAreaNum] = useState("");
  const [isModalOpen, setModalOpen] = useState(false);

  const [isUpdateSuccess, setUpdateSuccess] = useState(false);
  const [isUpdateFailed, setUpdateFailed] = useState(false);
  const handleModalOpen = () => {
    setModalOpen(true);
  };
  const handleModalClose = () => setModalOpen(false);
  const handleProgramChange = (e) => setProgram(e.target.value);
  const handleAreaChange = (e) => setAreaNum(e.target.value);

  const onDrop = (file) => {
    setFile(file);
  };

  const navigateDropbox = (bool) => {
    setSeeFiles(bool);
    setUpdateFailed(false);
    setUpdateSuccess(false);
  };

  const uploadPDF = (file) => {
    const formData = new FormData();
    const fileToUpload = file;
    formData.append("pdf", fileToUpload);
    formData.append("program", _program);
    formData.append("areaNum", _areaNum);
    formData.append("user", cookies.username);
    axios
      .post(`http://ams.chmsc.edu.ph/api/upload.php`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
      .then((res) => {
        if (res.data) setUpdateSuccess(true);
        else setUpdateFailed(true);
      });
  };

  return (
    <div>
      <Dialog open={isDropboxOpen} fullWidth={true} maxWidth="md">
        <DialogTitle
          sx={{
            display: "flex",
            py: 1,
            mb: 1,
            justifyContent: "space-between",
            alignItems: "center",
            backgroundColor: orange[400],
          }}
        >
          Dropbox
          <IconButton onClick={() => actions.setDropboxOpen(false)}>
            <CloseIcon />
          </IconButton>
        </DialogTitle>
        <DialogContent sx={{ maxHeight: "80vh" }}>
          {seeFiles ? (
            <>
              {["admin", "qaa"].includes(cookies.username) ? (
                <Chip
                  size="small"
                  label="Upload PDF File"
                  onClick={() => navigateDropbox(false)}
                />
              ) : null}
              <UploadedPDF handleModalOpen={handleModalOpen} />
            </>
          ) : (
            <Box sx={{ display: "flex", flexDirection: "column" }}>
              <FileUploader
                name="file"
                types={["PDF"]}
                hoverTitle="Drop Here"
                handleChange={(file) => onDrop(file)}
                children={<DropboxContent file={_file} />}
              />
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                }}
              >
                <FormControl sx={{ m: 1, minWidth: 150 }} size="small">
                  <InputLabel>Program</InputLabel>
                  <Select onChange={handleProgramChange} defaultValue="">
                    <MenuItem value="BSIT">BSIT</MenuItem>
                    <MenuItem value="BSED">BSED</MenuItem>
                    <MenuItem value="BEED">BEED</MenuItem>
                  </Select>
                </FormControl>
                <FormControl sx={{ m: 1, minWidth: 150 }} size="small">
                  <InputLabel>Area</InputLabel>
                  <Select onChange={handleAreaChange} defaultValue="">
                    <MenuItem value="AREA1">AREA I</MenuItem>
                    <MenuItem value="AREA2">AREA II</MenuItem>
                    <MenuItem value="AREA3">AREA III</MenuItem>
                    <MenuItem value="AREA4">AREA IV</MenuItem>
                    <MenuItem value="AREA5">AREA V</MenuItem>
                    <MenuItem value="AREA6">AREA VI</MenuItem>
                    <MenuItem value="AREA7">AREA VII</MenuItem>
                    <MenuItem value="AREA8">AREA VIII</MenuItem>
                    <MenuItem value="AREA9">AREA IX</MenuItem>
                    <MenuItem value="AREA10">AREA X</MenuItem>
                  </Select>
                </FormControl>
                <Button variant="contained" onClick={() => uploadPDF(_file)}>
                  Submit
                </Button>
                <Chip
                  size="small"
                  onClick={() => navigateDropbox(true)}
                  label="Additional Documents"
                  sx={{ ml: "auto" }}
                />
              </Box>

              {isUpdateSuccess ? (
                <Alert severity="success" sx={{ mt: 1 }}>
                  File successfully uploaded.
                </Alert>
              ) : null}
              {isUpdateFailed ? (
                <Alert severity="error" sx={{ mt: 1 }}>
                  File upload failed.
                </Alert>
              ) : null}
            </Box>
          )}
        </DialogContent>
      </Dialog>
      <DropboxModal
        isModalOpen={isModalOpen}
        handleModalClose={handleModalClose}
      />
    </div>
  );
}

export default Dropbox;
