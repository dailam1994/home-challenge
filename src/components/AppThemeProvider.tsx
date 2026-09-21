"use client";

import { CssBaseline, createTheme, ThemeProvider } from "@mui/material";
import { createContext, useEffect, useState } from "react";

interface AppThemeContextProps {
  darkMode: boolean;
  handleDarkMode: () => void;
}

export const AppThemeContext = createContext<AppThemeContextProps>({
  darkMode: false,
  handleDarkMode: () => {}
});

export default function AppThemeProvider({
  children
}: {
  children: React.ReactNode;
}) {
  const [darkMode, setDarkMode] = useState<boolean>(false);

  useEffect(() => {
    const isDarkMode =
      localStorage.getItem("leapdev-nextjs-dark-mode") === "true";

    setDarkMode(isDarkMode);
  }, []);

  const handleDarkMode = () => {
    setDarkMode((prev) => {
      const newDarkMode = !prev;

      localStorage.setItem("leapdev-nextjs-dark-mode", String(newDarkMode));

      return newDarkMode;
    });
  };

  const theme = createTheme({
    palette: { mode: darkMode ? "dark" : "light" }
  });

  return (
    <AppThemeContext.Provider value={{ darkMode, handleDarkMode }}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        {children}
      </ThemeProvider>
    </AppThemeContext.Provider>
  );
}
