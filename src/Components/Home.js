import { useContext } from "react";
import MyAppBar from "./MyAppBar";
import { Context } from "./../Context";
import Start from "./Start";
import AreasFolder from "./AreasFolder";
import { Box, ThemeProvider } from "@mui/material";
import theme from "./../Theme";
import Footer from "./Footer";

function Home() {
  const { program } = useContext(Context);

  return (
    <ThemeProvider theme={program ? theme[program] : theme.defaultTheme}>
      <Box>
        <MyAppBar />
        {program ? <AreasFolder /> : <Start />}
      </Box>
      <Footer />
    </ThemeProvider>
  );
}

export default Home;
