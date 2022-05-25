import { createContext, useState } from "react";
const { data } = require("./../json/data.json");

export const Context = createContext();
export const Provider = (props) => {
  const [programData, setProgramData] = useState(null);
  const [program, setProgram] = useState("");
  const [areaNum, setAreaNum] = useState(0);
  const [parameter, setParameter] = useState("");
  const [paramData, setParamData] = useState(null);
  const [file, setFile] = useState("");
  const [directory, setDirectory] = useState("");

  const [isSubShown, setSubShown] = useState(false);
  const [isVideoShown, setVideoShown] = useState(false);
  const [isPDFModalShown, setPDFModalShown] = useState(false);
  const [isDropboxOpen, setDropboxOpen] = useState(false);
  const [isLogsOpen, setLogsOpen] = useState(false);
  const [isPerformanceShown, setPerformanceShown] = useState(false);

  const handleSetProgramData = (program) => {
    setProgramData(data[program]);
  };
  const handleSetProgram = (program) => setProgram(program);
  const handleSetSubShown = (bool) => setSubShown(bool);
  const handleSetAreaNum = (areaNum) => setAreaNum(areaNum);
  const handleSetParameter = (parameter) => setParameter(parameter);
  const handleSetParamData = (paramData) => setParamData(paramData);
  const handleSetFile = (file) => setFile(file);
  const handleSetDirectory = (directory) => setDirectory(directory);
  const handleSetDropboxOpen = (bool) => setDropboxOpen(bool);
  const handleSetLogsOpen = (bool) => setLogsOpen(bool);
  const handlePDFModalShown = (bool) => setPDFModalShown(bool);
  const handleSetPerformanceShown = (bool) => setPerformanceShown(bool);
  const handleSetVideoShown = (bool) => setVideoShown(bool);

  return (
    <Context.Provider
      value={{
        programData,
        program,
        isSubShown,
        areaNum,
        parameter,
        paramData,
        file,
        directory,
        isDropboxOpen,
        isPDFModalShown,
        isLogsOpen,
        isPerformanceShown,
        isVideoShown,
        actions: {
          setProgramData: handleSetProgramData,
          setProgram: handleSetProgram,
          setSubShown: handleSetSubShown,
          setAreaNum: handleSetAreaNum,
          setParameter: handleSetParameter,
          setParamData: handleSetParamData,
          setFile: handleSetFile,
          setDirectory: handleSetDirectory,
          setDropboxOpen: handleSetDropboxOpen,
          setLogsOpen: handleSetLogsOpen,
          setPDFModalShown: handlePDFModalShown,
          setPerformanceShown: handleSetPerformanceShown,
          setVideoShown: handleSetVideoShown,
        },
      }}
    >
      {props.children}
    </Context.Provider>
  );
};
