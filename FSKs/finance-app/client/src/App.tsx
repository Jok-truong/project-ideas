import { Box, CssBaseline, ThemeProvider, createTheme } from "@mui/material";
import { useMemo } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Predictions from "./pages/Predictions";
import Navbar from "./components/Navbar";
import Dashboard from "./pages/Dashboard";

function App() {
  const theme = useMemo(() => createTheme(), []);
  console.log(theme, "theme");

  return (
    <div className="app">
      <BrowserRouter>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <Box width="100%" height="100%" padding="1rem 2rem 4rem 2rem">
            <Navbar />
            <Routes>
              <Route path="/" element={<Dashboard />} />
              <Route path="/predictions" element={<Predictions />} />
            </Routes>
          </Box>
        </ThemeProvider>
      </BrowserRouter>
    </div>
  );
}

export default App;
