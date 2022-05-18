import React, { useState, useContext } from "react";
import PDFModal from "./PDFModal";
import { Context } from "./../Context";
import criteria from "./../json/criteria.json";
import exhibits from "./../json/exhibit.json";
import {
  Grid,
  Box,
  Typography,
  IconButton,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  Divider,
  Container,
  Accordion,
  AccordionSummary,
  AccordionDetails,
} from "@mui/material";
import { orange } from "@mui/material/colors";
import {
  Close as CloseIcon,
  ExpandMore as ExpandMoreIcon,
} from "@mui/icons-material";

function SideList() {
  var { actions, program, areaNum, parameter, paramData } = useContext(Context);

  const closeList = () => actions.setSubShown(false);

  const systems = paramData["SYSTEMS"];
  const implementation = paramData["IMPLEMENTATION"];
  const outcomes = paramData["OUTCOMES"];

  const intAreaNum = parseInt(areaNum.slice(4));
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

  const checkIfCategory = (_category) => {
    const data = criteria["data"];
    if (data[program][areaNum].hasOwnProperty(parameter))
      if (data[program][areaNum][parameter].hasOwnProperty(_category))
        return data[program][areaNum][parameter][_category];
    return [];
  };

  const exhibitData = exhibits[areaNum];
  return (
    <Grid item xs={4}>
      <Container>
        <Box>
          <Box
            bgcolor="primary.light"
            sx={{
              width: 1,
              p: 2,
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <Typography variant="h6">
              {`Area ${convertToRoman(intAreaNum)} - ${
                parameter ? `Parameter ${parameter.slice(-1)}` : "Exhibit"
              }`}
            </Typography>
            <IconButton onClick={closeList}>
              <CloseIcon />
            </IconButton>
          </Box>
          <Box boxShadow={2}>
            {parameter ? (
              <Box>
                <Accordion>
                  <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                    <Typography>Systems</Typography>
                  </AccordionSummary>
                  <AccordionDetails>
                    <List>
                      {systems.map((file, index) => {
                        const _file = Object.keys(file)[0];
                        const description = file[_file];
                        if (checkIfCategory("SYSTEMS").includes(_file)) {
                          return (
                            <div key={index}>
                              <ListItem>
                                <ListItemText
                                  primary={_file}
                                  secondary={description}
                                />
                              </ListItem>
                              <Divider />
                            </div>
                          );
                        } else {
                          return (
                            <div key={index}>
                              <ListItemButton
                                onClick={() => {
                                  actions.setPDFModalShown(true);
                                  actions.setFile(_file);
                                  actions.setDirectory(
                                    `${program}/${areaNum}/${parameter}/SYSTEMS`
                                  );
                                }}
                              >
                                <ListItemText
                                  primary={_file}
                                  secondary={description}
                                />
                              </ListItemButton>
                              <Divider />
                            </div>
                          );
                        }
                      })}
                    </List>
                  </AccordionDetails>
                </Accordion>
                <Accordion>
                  <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                    <Typography>Implementation</Typography>
                  </AccordionSummary>
                  <AccordionDetails>
                    <List>
                      {implementation.map((file, index) => {
                        const _file = Object.keys(file)[0];
                        const description = file[_file];
                        if (checkIfCategory("IMPLEMENTATION").includes(_file)) {
                          return (
                            <div key={index}>
                              <ListItem>
                                <ListItemText
                                  primary={_file}
                                  secondary={description}
                                />
                              </ListItem>
                              <Divider />
                            </div>
                          );
                        } else {
                          return (
                            <div key={index}>
                              <ListItemButton
                                onClick={() => {
                                  actions.setPDFModalShown(true);
                                  actions.setFile(_file);
                                  actions.setDirectory(
                                    `${program}/${areaNum}/${parameter}/IMPLEMENTATION`
                                  );
                                }}
                                key={index}
                              >
                                <ListItemText
                                  primary={_file}
                                  secondary={description}
                                />
                              </ListItemButton>
                              <Divider />
                            </div>
                          );
                        }
                      })}
                    </List>
                  </AccordionDetails>
                </Accordion>
                <Accordion>
                  <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                    <Typography>Outcomes</Typography>
                  </AccordionSummary>
                  <AccordionDetails>
                    <List>
                      {outcomes.map((file, index) => {
                        const _file = Object.keys(file)[0];
                        const description = file[_file];
                        if (checkIfCategory("OUTCOMES").includes(_file)) {
                          return (
                            <div key={index}>
                              <ListItem>
                                <ListItemText
                                  primary={_file}
                                  secondary={description}
                                />
                              </ListItem>
                              <Divider />
                            </div>
                          );
                        } else {
                          return (
                            <div key={index}>
                              <ListItemButton
                                onClick={() => {
                                  actions.setPDFModalShown(true);
                                  actions.setFile(_file);
                                  actions.setDirectory(
                                    `${program}/${areaNum}/${parameter}/OUTCOMES`
                                  );
                                }}
                                key={index}
                              >
                                <ListItemText
                                  primary={_file}
                                  secondary={description}
                                />
                              </ListItemButton>
                              <Divider />
                            </div>
                          );
                        }
                      })}
                    </List>
                  </AccordionDetails>
                </Accordion>
              </Box>
            ) : (
              <List>
                {exhibitData.map((exhibit) => {
                  const exNum = Object.keys(exhibit)[0];
                  const exDesc = exhibit[exNum];
                  return (
                    <ListItemButton
                      key={exNum}
                      onClick={() => {
                        actions.setDirectory(`${program}/${areaNum}/EXHIBIT`);
                        actions.setFile(`${exNum}`);
                        actions.setPDFModalShown(true);
                      }}
                    >
                      <ListItemText
                        primary={`Exhibit ${exNum}`}
                        secondary={exDesc}
                      />
                    </ListItemButton>
                  );
                })}
              </List>
            )}
          </Box>
          <PDFModal />
        </Box>
      </Container>
    </Grid>
  );
}

export default SideList;
