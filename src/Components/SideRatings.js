import React from "react";
import {
  Grid,
  Typography,
  Container,
  IconButton,
  Box,
  Alert,
} from "@mui/material";
import { Close as CloseIcon } from "@mui/icons-material";
import { DataGrid } from "@mui/x-data-grid";
import { orange } from "@mui/material/colors";

function SideRatings({ closeRating }) {
  const columns = [
    {
      field: "area",
      headerName: "Area",
      width: 150,
      sortable: false,
    },
    {
      field: "weight",
      headerName: "Weight",
      width: 150,
      sortable: false,
    },
    {
      field: "mean",
      headerName: "Mean",
      width: 150,
      sortable: false,
    },
    {
      field: "weightedMean",
      headerName: "Weighted Mean",
      width: 150,
      sortable: false,
    },
  ];

  const rows = [
    {
      id: 1,
      area: "I. Vision, Mission, Goals and Objective",
      weight: "---",
      mean: 4.01,
      weightedMean: "---",
    },
    {
      id: 2,
      area: "II. Faculty",
      weight: 8,
      mean: 4.24,
      weightedMean: "33.92",
    },
    {
      id: 3,
      area: "III. Curriculum and Instruction",
      weight: 8,
      mean: 4.24,
      weightedMean: "33.92",
    },
    {
      id: 4,
      area: "IV. Support to Students",
      weight: 8,
      mean: 4.24,
      weightedMean: "33.92",
    },
    {
      id: 5,
      area: "V. Research",
      weight: 8,
      mean: 4.24,
      weightedMean: "33.92",
    },
    {
      id: 6,
      area: "VI. Extension and Community Involvement",
      weight: 8,
      mean: 4.24,
      weightedMean: "33.92",
    },
    {
      id: 7,
      area: "VII. Library",
      weight: 8,
      mean: 4.24,
      weightedMean: "33.92",
    },
    {
      id: 8,
      area: "VIII. Physical Plant and Facilities",
      weight: 8,
      mean: 4.24,
      weightedMean: "33.92",
    },
    {
      id: 9,
      area: "IX. Laboratories",
      weight: 8,
      mean: 4.24,
      weightedMean: "33.92",
    },
    {
      id: 10,
      area: "X. Admintration",
      weight: 8,
      mean: 4.24,
      weightedMean: "33.92",
    },
  ];

  return (
    <Grid item xs={4}>
      <Container>
        <Box>
          <Box
            bgcolor={orange[500]}
            sx={{
              width: 1,
              p: 2,
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <Typography variant="h6">Ratings</Typography>
            <IconButton onClick={closeRating}>
              <CloseIcon />
            </IconButton>
          </Box>
          <Box boxShadow={2}>
            <DataGrid
              autoHeight
              rows={rows}
              columns={columns}
              pageSize={10}
              rowsPerPageOptions={[10]}
              disableSelectionOnClick
            />
            <Alert severity="success">
              <b>Overall Total: Mean</b> - 150 <b>Weighted Mean</b> - 204.36
            </Alert>
            <Alert severity="success">
              <b>Grand Mean</b> - 4.09
            </Alert>
            <Alert severity="success">
              <b>Descriptive Rating</b> - Satisfactory
            </Alert>
          </Box>
        </Box>
      </Container>
    </Grid>
  );
}

export default SideRatings;
