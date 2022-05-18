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
        mt: 2,
      }}
    >
      <Typography variant="caption">
        @Management Information System (MIS) 2022
      </Typography>
      <Typography variant="caption">
        Information Communication Technology Offfice
      </Typography>
    </Box>
  );
};

export default Footer;
