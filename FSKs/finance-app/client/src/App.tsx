import { CssBaseline, ThemeProvider, createTheme } from "@mui/material";
import { useMemo } from "react";

function App() {
  const theme = useMemo(() => createTheme(), []);

  return (
    <div className="app">
      <ThemeProvider theme={theme}>
        <CssBaseline />
        Setup Client
      </ThemeProvider>
    </div>
  );
}

export default App;
