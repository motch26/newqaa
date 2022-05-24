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
  ({ handleModalOpen, dates, rows, refresh }, ref) => {
    const { actions, program, areaNum, parameter, file } = useContext(Context);
    const [cookies, setCookie, removeCookie] = useCookies(["username"]);
    const deleteList = (e, id, program, areaNum, parameter, fileName) => {
      axios
        .get(
          `http://ams.chmsc.edu.ph/api/deleteList.php?id=${id}&program=${program}&areaNum=${areaNum}&fileName=${fileName}`
        )
        .then((res) => {
          console.log(res.data);
          const currentList = e.target.parentElement;
          currentList.parentNode.removeChild(currentList);
          refresh();
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
                  const { id, program, areaNum, fileName, dateUpload } = row;
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
                          {fileName}
                          <Stack direction="row" spacing={2}>
                            <Chip
                              label={program}
                              color="warning"
                              size="small"
                            />
                            <Chip
                              label={`Area ${areaNum.slice(-1)}`}
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
                            {["admin", "qaa"].includes(cookies.username) ? (
                              <Button
                                onClick={(e) =>
                                  deleteList(e, id, program, areaNum, fileName)
                                }
                              >
                                Delete
                              </Button>
                            ) : null}
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
