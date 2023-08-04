import React, { useState, useEffect } from "react";
import { IconButton, Stack, Toolbar, styled } from "@mui/material";
import ConnectedUserInfo from "./ConnectedUserInfo";
import MuiAppBar, { AppBarProps as MuiAppBarProps } from "@mui/material/AppBar";
import { RmaLogo } from "./RmaLogo/RmaLogo";
import MenuIcon from "@mui/icons-material/Menu";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
const drawerWidth: number = 250;

interface AppBarProps extends MuiAppBarProps {
  open?: boolean;
}

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== "open",
})<AppBarProps>(({ theme, open }) => ({
  zIndex: theme.zIndex.drawer + 1,
  transition: theme.transitions.create(["width", "margin"], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

const Header = (props: { Handler: React.MouseEventHandler<HTMLButtonElement> | undefined; Open: any; }) => {
  const [currentTime, setCurrentTime] = useState<Date>(new Date());

  useEffect(() => {
    const intervalId = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000); // Update the time every 1 second

    return () => {
      clearInterval(intervalId); // Clean up the interval when the component unmounts
    };
  }, []);

  const formattedTime = currentTime.toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit",
  });

  return (
    <AppBar position="absolute" open={props.Open}>
      <Toolbar
        sx={{
          pr: "24px", // keep right padding when drawer closed
          backgroundColor: "white",
          display: "flex",
          alignItems: "center", // Center the content vertically
          justifyContent: "space-between", // Distribute the content evenly along the horizontal axis
        }}
      >
        <Stack direction="row" spacing={2} alignItems="center">
          <IconButton
            edge="start"
            color="inherit"
            aria-label="open drawer"
            onClick={props.Handler}
            sx={{
              marginRight: "36px",
              ...(props.Open && { display: "none" }),
              color: "#1D2A5C",
            }}
          >
            <MenuIcon />
          </IconButton>
          <RmaLogo />
        </Stack>

        <div color="black">
          
          <h2 style={{ color: "black", margin: 0 }}> <AccessTimeIcon />    {formattedTime}</h2>
        </div>

        <Stack direction="row" spacing={2} alignItems="center">
          <ConnectedUserInfo />
        </Stack>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
