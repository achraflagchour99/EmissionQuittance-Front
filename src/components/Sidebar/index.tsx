import React from "react";
import { Box, Divider, IconButton, Stack, Typography } from "@mui/material";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import MenuIcon from "@mui/icons-material/Menu";
import { styled, useTheme } from "@mui/material/styles";
import MuiDrawer from "@mui/material/Drawer";
import { closedMixin, openedMixin } from "../../styles/mixins";
import { DRAWER_WIDTH } from "../../utils/constants";
import RenderText from "../../utils/RenderText";
import { mainListItems } from "./listitems";

const StyledTypography = styled(Typography)({
  //color: "#1d2442",
  //color: "#3ba5df",
  fontSize: "25px",
  fontWeight: "bold",
  //textAlign: "left",
  textTransform: "uppercase",
});

const Drawer = styled(MuiDrawer, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  width: DRAWER_WIDTH,
  flexShrink: 0,
  whiteSpace: "nowrap",
  boxSizing: "border-box",
  ...(open && {
    ...openedMixin(theme),
    "& .MuiDrawer-paper": openedMixin(theme),
  }),
  ...(!open && {
    ...closedMixin(theme),
    "& .MuiDrawer-paper": closedMixin(theme),
  }),
}));

export const DrawerHeader = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "flex-end",
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
}));

export const SidebarDivider = () => {
  return (
    <Divider
      sx={{
        mt: "12px",
        bgcolor: "#fff", // "common.separationLine",
        opacity: 0.1,
        height: "1px",
      }}
    />
  );
};

interface NavigationProps {
  open: boolean | undefined;
  handleDrawerClose: () => void;
  handleDrawerOpen: () => void;
}

const AppSidebar = ({
  open,
  handleDrawerClose,
  handleDrawerOpen,
}: NavigationProps) => {
  const theme = useTheme();

  return (
    <Drawer
      variant="permanent"
      open={open}
      PaperProps={{
        sx: {
          backgroundColor: "#243075",
          color: "white",
        },
      }}
    >
      <DrawerHeader sx={{ backgroundColor: "#243075FF" }}>
        {open ? (
          <Stack
            direction="row"
            alignItems="center"
            justifyContent="space-between"
            spacing={2}
            sx={{ width: "100%", pl: 2, backgroundColor: "#243075FF" }}
          >
            <Box>
              <Stack>
                <Stack direction="row" spacing={1} alignItems="center">
                  <StyledTypography sx={{fontSize:15, marginTop:1}} >
                    <RenderText value="EMISSION QUITTANCE" />
                  </StyledTypography>

                </Stack>
                <Divider
                  sx={{ height: "2px", bgcolor: "#AF7F1F", mt: "4px" }}
                />
              </Stack>
            </Box>
            <IconButton onClick={handleDrawerClose}>
              {theme.direction === "rtl" ? (
                <ChevronRightIcon sx={{ color: "#fff" }} />
              ) : (
                <ChevronLeftIcon sx={{ color: "#fff" }} />
              )}
            </IconButton>
          </Stack>
        ) : (
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            edge="start"
            sx={{ mr: 0.5 }}
          >
            <MenuIcon />
          </IconButton>
        )}
      </DrawerHeader>
      <Divider sx={{
        mt: "12px",
        bgcolor: "#fff", // "common.separationLine",
        opacity: 0.1,
        height: "1px",
      }}/>
      {mainListItems}
    </Drawer>
  );
};

export default AppSidebar;
