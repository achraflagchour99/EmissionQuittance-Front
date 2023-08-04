import React, { useEffect, useState } from "react";
import {
  alpha,
  Avatar,
  Button,
  ListItemText,
  Menu,
  MenuItem,
  MenuProps,
  styled,
} from "@mui/material";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import loginUserImg from "../../../assets/images/login-user.png";

const StyledMenu = styled((props: MenuProps) => (
  <Menu
    elevation={0}
    anchorOrigin={{
      vertical: "bottom",
      horizontal: "right",
    }}
    transformOrigin={{
      vertical: "top",
      horizontal: "right",
    }}
    {...props}
  />
))(({ theme }) => ({
  "& .MuiPaper-root": {
    borderRadius: 6,
    marginTop: theme.spacing(1),
    minWidth: 180,
    color:
      theme.palette.mode === "light"
        ? "rgb(55, 65, 81)"
        : theme.palette.grey[300],
    boxShadow:
      "rgb(255, 255, 255) 0px 0px 0px 0px, rgba(0, 0, 0, 0.05) 0px 0px 0px 1px, rgba(0, 0, 0, 0.1) 0px 10px 15px -3px, rgba(0, 0, 0, 0.05) 0px 4px 6px -2px",
    "& .MuiMenu-list": {
      padding: "4px 0",
    },
    "& .MuiMenuItem-root": {
      "& .MuiSvgIcon-root": {
        fontSize: 18,
        color: theme.palette.text.secondary,
        marginRight: theme.spacing(1.5),
      },
      "&:active": {
        backgroundColor: alpha(
          theme.palette.primary.main,
          theme.palette.action.selectedOpacity
        ),
      },
    },
  },
}));

const ConnectedUserInfo = () => {
  const [anchorElUser, setAnchorElUser] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorElUser);

  const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const signOut = () => {
    window.location.href = '/SignIn';
    localStorage.setItem('token', ''); 
  };
  

  const [user, setUser] = useState({
    nom: "",
    prenom: "",
     
  });



  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem('user') || '{}');
    setUser(storedUser);
}, []);


  return (
    <>
      <Button
        id="demo-customized-button"
        aria-controls={open ? "demo-customized-menu" : undefined}
        aria-haspopup="true"
        aria-expanded={open ? "true" : undefined}
        variant="text"
        disableElevation
        //onClick={handleClick}
        onClick={handleOpenUserMenu}
        endIcon={<KeyboardArrowDownIcon />}
        startIcon={
          <Avatar
            //alt="Connected User"}
            src={loginUserImg}
            sx={{ width: "40px", height: "39px" }}
          />
        }
        sx={{ textTransform: "none", textAlign: "left", p: "3px 15px" }}
      >
       
        <ListItemText
          primary={user.nom + ' ' + user.prenom}
          secondary="Admin"
          primaryTypographyProps={{
            sx: {
              fontSize: "12px",
              fontWeight: 600,
            },
          }}
          secondaryTypographyProps={{
            sx: {
              fontSize: "10px",
            },
          }}
        />
      </Button>
      <StyledMenu
        id="demo-customized-menu"
        MenuListProps={{
          "aria-labelledby": "demo-customized-button",
        }}
        anchorEl={anchorElUser}
        open={open}
        onClose={handleCloseUserMenu}
     
      >
        <MenuItem key="1">Roles</MenuItem>
        <MenuItem
          key="2"
           onClick={signOut}
        >
          Log out
        </MenuItem>
      </StyledMenu>
    </>
  );

 
};

export default ConnectedUserInfo;
