import { Typography } from "@mui/material";
import rmaLogo from '../../../assets/icons/rma-icon.svg'

export const RmaLogo = () => {
  return (
    <Typography
      component="h1"
      variant="h6"
      color="inherit"
      noWrap
      sx={{ flexGrow: 1 }}
    >
      <img src={rmaLogo} alt="entreprise"></img>
    </Typography>
  );
};
