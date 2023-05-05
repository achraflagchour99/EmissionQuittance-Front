import React from "react";
import { IconButton, Stack, Toolbar, styled } from "@mui/material";
import ConnectedUserInfo from "./ConnectedUserInfo";
import NotificationButton from "./NotificationButton";
import MuiAppBar, { AppBarProps as MuiAppBarProps } from "@mui/material/AppBar";
import { RmaLogo } from "./RmaLogo/RmaLogo";
import MenuIcon from "@mui/icons-material/Menu";

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
  return (
    <AppBar position="absolute" open={props.Open}>
      <Toolbar
        sx={{
          pr: "24px", // keep right padding when drawer closed
          backgroundColor: "white",
        }}
      >
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
        <Stack direction="row" spacing={2} alignItems="center">
          <NotificationButton />
          <ConnectedUserInfo />
        </Stack>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
