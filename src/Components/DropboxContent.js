import React from "react";
import { Box, Typography } from "@mui/material";
import { blue, green } from "@mui/material/colors";

function DropboxContent({ file }) {
  return (
    <Box sx={{}}>
      <Box
        sx={{
          p: 2,
          border: "2px dashed",
          borderColor: blue[500],
          cursor: "pointer",
          display: "flex",
          flexDirection: "column",
        }}
      >
        {file ? (
          <>
            <Typography color={blue[500]} textAlign="center">
              Upload Success!
            </Typography>
            <Typography variant="subtitle2" textAlign="center">{`File: ${
              file.name
            } (${(file.size / 1000000).toFixed(2)} MB)`}</Typography>
          </>
        ) : (
          <Typography variant="body1" color={blue[500]} textAlign="center">
            Upload or drop PDF file
          </Typography>
        )}
      </Box>
    </Box>
  );
}

export default DropboxContent;
