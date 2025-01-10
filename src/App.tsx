import { useState, useEffect } from "react";
import { HashRouter as Router, Route, Routes } from "react-router-dom";
import MarkdownPage from "./components/MarkdownPage";
import Home from "./components/Home";
import ScrollToTop from "./components/ScrollToTop"; 
// import data from "./data/data.json";
import Paper from '@mui/material/Paper';
import  ButtonAppBar, { AppBarTitleProvider, useAppBarTitle } from "./components/ButtonAppBar";
import { DataProvider } from "./components/DataContent";
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';

import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import AISearch from "./components/AISearch";



const App = () => {
  const [search, setSearch] = useState("");
 
  const darkTheme = createTheme({
    palette: {
      mode: 'dark',
      primary: {
        main: '#90caf9', // Adjust your link color
      },
    },
    components: {
      MuiCssBaseline: {
        styleOverrides: {
          a: {
            color: '#90caf9', // Custom link color for dark mode
            textDecoration: 'none', // Optional: Remove underline
            '&:hover': {
              textDecoration: 'underline', // Optional: Add underline on hover
            },
          },
        },
      },
    },
  });

 
  // <FacebookBannerAd />

  return (
    <ThemeProvider theme={darkTheme}>
    <CssBaseline />
    <Router>
      <AppBarTitleProvider>
      <DataProvider>
      <ButtonAppBar />
      <ScrollToTop />
      <div style={{ display: 'flex', justifyContent:'center', alignItems:'center', marginTop: "60px"}}>
      
        <Routes >
          <Route
            path="/"
            element={<Home />}
          />
          <Route path="/content/:id" element={<MarkdownPage />} />
          <Route path="/gemini" element={<AISearch />} />
        </Routes>
      </div>
      </DataProvider>
      </AppBarTitleProvider>

    </Router>
    </ThemeProvider>

  );
};

export default App;
