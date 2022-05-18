import React, { useState, useEffect, useContext } from "react";
import moment from "moment";
import axios from "axios";
import { Dialog, DialogTitle, DialogContent, IconButton } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { Context } from "./../Context";
import { orange } from "@mui/material/colors";
import CloseIcon from "@mui/icons-material/Close";

function Logs() {
  const { actions, isLogsOpen } = useContext(Context);
  const [logsData, setLogsData] = useState([]);

  const columns = [
    { field: "id", headerName: "Log ID", width: 100 },
    { field: "user", headerName: "User", width: 150 },
    { field: "action", headerName: "Action", width: 350 },
    { field: "date", headerName: "Date/Time", width: 200 },
  ];

  useEffect(() => {
    axios.get(`http://ams.chmsc.edu.ph/api/logs.php`).then((res) => {
      const data = res.data;
      data.map((d) => {
        d.date = moment(d.date, "YYYY-MM-DD, hh:mm:ss").format(
          "MMM DD, hh:mm A"
        );
      });
      setLogsData(data);
    });
  }, []);

  return (
    <Dialog open={isLogsOpen} fullWidth={true} maxWidth="md">
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
        Logs
        <IconButton onClick={() => actions.setLogsOpen(false)}>
          <CloseIcon />
        </IconButton>
      </DialogTitle>
      <DialogContent sx={{ maxHeight: "80vh", height: "60vh", p: 1 }}>
        <DataGrid
          rows={logsData}
          columns={columns}
          pageSize={10}
          rowsPerPageOptions={[10]}
        />
      </DialogContent>
    </Dialog>
  );
}

export default Logs;
