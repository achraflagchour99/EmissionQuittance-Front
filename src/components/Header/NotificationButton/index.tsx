import { Avatar, Button, Typography } from "@mui/material";
import NotificationsNoneOutlinedIcon from "@mui/icons-material/NotificationsNoneOutlined";

const NotificationButton = () => {
  return (
    <Button
      variant="outlined"
      disableElevation
      startIcon={<NotificationsNoneOutlinedIcon />}
      endIcon={
        <Avatar sx={{ bgcolor: "red", width: 24, height: 24 }}>
          <Typography sx={{ fontSize: 12 }}>0</Typography>
        </Avatar>
      }
      sx={{ textTransform: "none", borderRadius: 10 }}
    >
      Notifications
    </Button>
  );
};

export default NotificationButton;
