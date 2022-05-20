import React, { useContext } from "react";
import axios from "axios";
import { useCookies } from "react-cookie";
import moment from "moment";
import { Context } from "./../Context";
import {
  Box,
  List,
  ListSubheader,
  ListItemButton,
  Stack,
  Chip,
  Typography,
  Divider,
  Button,
  ButtonGroup,
} from "@mui/material";

export const UploadedPDFList = React.forwardRef(
  ({ handleModalOpen, dates, rows }, ref) => {
    const { actions, program, areaNum, parameter, file } = useContext(Context);
    const [cookies, setCookie, removeCookie] = useCookies(["username"]);
    const deleteList = (e, id) => {
      axios
        .get(`http://ams.chmsc.edu.ph/api/deleteList.php?id=${id}`)
        .then((res) => {
          console.log(res.data);
          const currentList = e.target.parentElement;
          currentList.parentNode.removeChild(currentList);
        });
    };
    return (
      <Box ref={ref}>
        {dates.length ? (
          dates.map((date, index) => {
            return (
              <List dense={true} key={`list${index}`}>
                <ListSubheader sx={{ textAlign: "right" }}>
                  {moment(date, "YYYY-MM-DD").format("MMM DD, YYYY")}
                </ListSubheader>
                {rows.map((row, index) => {
                  const { program, areaNum, parameter, fileName, dateUpload } =
                    row;
                  if (dateUpload === date) {
                    return (
                      <>
                        <ListItemButton
                          sx={{
                            display: "flex",
                            justifyContent: "space-between",
                          }}
                          key={index}
                        >
                          {row.fileName}
                          <Stack direction="row" spacing={2}>
                            <Chip
                              label={row.program}
                              color="warning"
                              size="small"
                            />
                            <Chip
                              label={`Area ${row.areaNum.slice(-1)}`}
                              color="warning"
                              size="small"
                            />
                            <Chip
                              label={`Parameter ${row.parameter.slice(-1)}`}
                              color="warning"
                              size="small"
                            />
                          </Stack>
                          <ButtonGroup>
                            <Button
                              onClick={() => {
                                actions.setFile(fileName);
                                actions.setDirectory(
                                  `${program}/${areaNum}/${parameter}`
                                );
                                handleModalOpen();
                              }}
                            >
                              View
                            </Button>
                            {cookies.username === "accreditor" ? null : (
                              <Button onClick={(e) => deleteList(e, row.id)}>
                                Delete
                              </Button>
                            )}
                          </ButtonGroup>
                        </ListItemButton>
                        <Divider />
                      </>
                    );
                  }
                })}
              </List>
            );
          })
        ) : (
          <Typography sx={{ textAlign: "center", p: 1 }} variant="h5">
            No Files Uploaded
          </Typography>
        )}
      </Box>
    );
  }
);
