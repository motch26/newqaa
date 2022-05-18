import React, { useState, useEffect, useRef } from "react";
import { useReactToPrint } from "react-to-print";
import axios from "axios";

import { Box, Button } from "@mui/material";
import RefreshIcon from "@mui/icons-material/Refresh";
import PrintIcon from "@mui/icons-material/Print";
import { orange } from "@mui/material/colors";
import { UploadedPDFList } from "./UploadedPDFList";
function UploadedPDF({ handleModalOpen }) {
  const componentRef = useRef();
  const [dates, setDates] = useState([]);
  const [rows, setRows] = useState([]);

  const refresh = () => {
    axios.get(`http://ams.chmsc.edu.ph/api/listUpload.php`).then((res) => {
      console.log(res);
      setDates(res.data[0]);
      setRows(res.data[1]);
    });
  };
  const reactPrint = useReactToPrint({
    content: () => componentRef.current,
  });

  useEffect(() => refresh(), []);
  return (
    <Box sx={{ display: "flex", flexDirection: "column" }}>
      <Box sx={{ display: "flex", justifyContent: "end" }}>
        <Button
          variant="outlined"
          size="small"
          startIcon={<RefreshIcon />}
          sx={{
            alignSelf: "end",
            borderColor: orange[100],
            color: orange[500],
          }}
          onClick={refresh}
        >
          Refresh
        </Button>
        <Button
          variant="outlined"
          size="small"
          startIcon={<PrintIcon />}
          sx={{
            alignSelf: "end",
            borderColor: orange[100],
            color: orange[500],
          }}
          onClick={reactPrint}
        >
          Print
        </Button>
      </Box>
      <UploadedPDFList
        ref={componentRef}
        dates={dates}
        rows={rows}
        handleModalOpen={handleModalOpen}
      />
    </Box>
  );
}

export default UploadedPDF;
