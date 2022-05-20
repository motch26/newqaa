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
      <Typography variant="caption" lineHeight={1.2}>
        Information Communication Technology Office
      </Typography>
      <Typography variant="caption" lineHeight={1.2}>
        Management Information System (MIS) 2022
      </Typography>
    </Box>
  );
};

export default Footer;
