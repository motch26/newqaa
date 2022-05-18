import React, { useContext } from "react";
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
} from "@mui/material";

export const UploadedPDFList = React.forwardRef(
  ({ handleModalOpen, dates, rows }, ref) => {
    const { actions, program, areaNum, parameter, file } = useContext(Context);
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
                          onClick={() => {
                            actions.setFile(fileName);
                            actions.setDirectory(
                              `${program}/${areaNum}/${parameter}`
                            );
                            handleModalOpen();
                          }}
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
