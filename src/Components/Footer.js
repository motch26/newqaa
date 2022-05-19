import { Box, Typography } from "@mui/material";
import React from "react";

const Footer = () => {
  return (
    <Box
      sx={{
        display: "flex",
        flexFlow: "column",
        justifyContent: "center",
        alignItems: "center",
        mt: "auto",
      }}
    >
      <Typography variant="caption">
        @Management Information System (MIS) 2022
      </Typography>
      <Typography variant="caption">
        Information Communication Technology Office
      </Typography>
    </Box>
  );
};

export default Footer;
