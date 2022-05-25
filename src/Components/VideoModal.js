import { Box, Modal } from "@mui/material";
import React, { useContext } from "react";
import ReactPlayer from "react-player/youtube";
import { Context } from "./../Context";

const VideoModal = () => {
  const { actions, isVideoShown, file } = useContext(Context);
  return (
    <Modal
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
      open={isVideoShown}
      onClose={() => actions.setVideoShown(false)}
    >
      <Box>
        <ReactPlayer
          controls
          url={file}
          width="100%"
          style={{
            minHeight: "60vh",
            maxHeight: "90vh",
            minWidth: "50vw",
            maxWidth: "80vw",
          }}
        />
      </Box>
    </Modal>
  );
};

export default VideoModal;
