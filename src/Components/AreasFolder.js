import React, { useContext } from "react";
import {
  Box,
  Card,
  CardMedia,
  CardContent,
  Typography,
  Grid,
  Divider,
  Button,
  Fab,
  ButtonGroup,
} from "@mui/material";
import AssessmentIcon from "@mui/icons-material/Assessment";
import SideList from "./SideList";
import PDFModal from "./PDFModal";

import { areaFolder } from "../Theme/Home";
import Parameters from "./Parameters";
import { Context } from "./../Context";
import desc from "./../json/desc.json";
import programs from "./../json/programs.json";

function AreasFolder() {
  const {
    program,
    programData,
    isSubShown,
    isPerformanceShown,
    setSubShown,
    areaNum,
    actions,
  } = useContext(Context);

  return (
    <Box sx={{ width: "90vw", mx: "auto", position: "relative" }}>
      <Typography
        variant="h5"
        fontWeight={600}
        sx={{ textAlign: "center", m: 2 }}
      >
        {`${program} | ${programs[program]}`}
      </Typography>
      <Grid container>
        <Grid
          container
          item
          xs={isSubShown || isPerformanceShown ? 8 : 12}
          rowSpacing={3}
          alignSelf="self-start"
        >
          {programData.map((area, index) => {
            const areaNumber = Object.keys(area)[0];
            const areaContent = area[areaNumber];
            const intAreaNum = parseInt(areaNumber.slice(4));
            function convertToRoman(num) {
              var roman = {
                M: 1000,
                CM: 900,
                D: 500,
                CD: 400,
                C: 100,
                XC: 90,
                L: 50,
                XL: 40,
                X: 10,
                IX: 9,
                V: 5,
                IV: 4,
                I: 1,
              };
              var str = "";

              for (var i of Object.keys(roman)) {
                var q = Math.floor(num / roman[i]);
                num -= q * roman[i];
                str += i.repeat(q);
              }

              return str;
            }
            return (
              <Grid item md={4} xs={6} onClick={setSubShown} key={index}>
                <Card sx={areaFolder}>
                  <CardContent>
                    <Box sx={{ bgcolor: "primary.light", p: 2 }}>
                      <Typography variant="h5" component="div">
                        {`Area ${convertToRoman(intAreaNum)}`}
                      </Typography>
                      <Typography variant="body1">
                        {desc[areaNumber]}
                      </Typography>
                    </Box>
                    <Divider />
                    <Typography variant="body2" mt={1}>
                      Parameters:
                    </Typography>
                    <Parameters
                      areaNumber={areaNumber}
                      areaContent={areaContent}
                    />
                    <Divider />
                    <ButtonGroup
                      sx={{ display: "flex", width: "100%", flexWrap: "wrap" }}
                    >
                      <Button
                        variant="contained"
                        size="small"
                        sx={{ width: "auto", mt: 1 }}
                        onClick={() => {
                          actions.setPDFModalShown(true);
                          actions.setFile("COMPLIANCE");
                          actions.setAreaNum(areaNumber);
                          actions.setParameter("");
                          actions.setSubShown(false);
                          actions.setDirectory(`${program}/${areaNumber}`);
                        }}
                      >
                        Compliance
                      </Button>
                      <Button
                        variant="contained"
                        size="small"
                        sx={{ width: "auto", mt: 1 }}
                        onClick={() => {
                          actions.setPDFModalShown(true);
                          actions.setFile("PPP");
                          actions.setAreaNum(areaNumber);
                          actions.setParameter("");
                          actions.setSubShown(false);
                          actions.setDirectory(`${program}/${areaNumber}`);
                        }}
                      >
                        PPP
                      </Button>
                      <Button
                        variant="contained"
                        size="small"
                        sx={{ width: "auto", mt: 1 }}
                        onClick={() => {
                          actions.setAreaNum(areaNumber);
                          actions.setParameter("");
                          actions.setSubShown(true);
                          actions.setDirectory(
                            `${program}/${areaNumber}/EXHIBIT`
                          );
                        }}
                      >
                        Exhibit
                      </Button>
                      <Button
                        variant="contained"
                        size="small"
                        sx={{ width: "auto", mt: 1 }}
                        onClick={() => {
                          actions.setPDFModalShown(true);
                          actions.setFile("RATING");
                          actions.setAreaNum(areaNumber);
                          actions.setParameter("");
                          actions.setSubShown(false);
                          actions.setDirectory(`${program}/${areaNumber}`);
                        }}
                      >
                        Self Rating
                      </Button>
                    </ButtonGroup>
                  </CardContent>
                </Card>
              </Grid>
            );
          })}
        </Grid>
        {isSubShown ? <SideList /> : null}
        {areaNum ? <PDFModal /> : null}
      </Grid>
    </Box>
  );
}

export default AreasFolder;
