import React, { useContext } from "react";
import { Context } from "./../Context";

import { Button, ButtonGroup } from "@mui/material";
function Parameters({ areaContent, areaNumber }) {
  const { actions } = useContext(Context);
  const handleParamButton = (parameter, paramData) => {
    actions.setSubShown(true);
    actions.setAreaNum(areaNumber);
    actions.setParameter(parameter);
    actions.setParamData(paramData);
    actions.setPerformanceShown(false);
  };
  return (
    <ButtonGroup
      variant="outlined"
      size="small"
      sx={{ flexWrap: "wrap", mb: 1 }}
    >
      {areaContent.map((param, index) => {
        const parameter = Object.keys(param)[0];
        const paramData = param[parameter];
        const paramLetter = parameter.slice(-1);
        return (
          <Button
            key={index}
            onClick={() => {
              handleParamButton(parameter, paramData);
            }}
          >
            {paramLetter}
          </Button>
        );
      })}
    </ButtonGroup>
  );
}

export default Parameters;
