
import { DrawerHeader } from "../components/Sidebar";
import { DRAWER_WIDTH } from "../utils/constants";
import { Box, CssBaseline, ThemeProvider, createTheme } from "@mui/material";
import "../App.css";
import React from "react";
import Header from "../components/Header/Header";
import AppSidebar from "../components/Sidebar";


import { Outlet } from 'react-router-dom'

const mdTheme = createTheme();

export const MainContent = () => {

  const [open, setOpen] = React.useState(false);
  const toggleDrawer = () => {
    setOpen(!open);
  };

  return (
    <ThemeProvider theme={mdTheme}>
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      <Header Handler={toggleDrawer} Open={open} />
      <AppSidebar
        open={open}
        handleDrawerClose={toggleDrawer}
        handleDrawerOpen={toggleDrawer}
      />

<Box
  component="main"
  sx={{
    backgroundColor: (theme) =>
      theme.palette.mode === "light"
        ? theme.palette.grey[100]
        : theme.palette.grey[900],
    flexGrow: 1,
    height: "100vh",
    overflow: "auto",
    marginLeft: open ? 0 : `-${DRAWER_WIDTH}px`,
    paddingLeft: open ? 0 : `185px`,
    transition: "margin-left 0.1s ease-in-out",
    width: open ? `calc(100% - ${DRAWER_WIDTH}px)` : "100%",
  }}
>
  <DrawerHeader />
  <Box sx={{ pt: 4 }}>
    <Outlet />
  </Box>
</Box>


    </Box>
    </ThemeProvider>
  );
};
