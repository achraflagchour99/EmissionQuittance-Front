import React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

interface AlertDialogProps {
  message: string;
  buttonText1: string;
  buttonText2: string;
  onClose: () => void;
  fullWidth?: boolean;
  handleDetails?: () => void;
  handleList?: () => void;
}

const AlertDialog: React.FC<AlertDialogProps> = ({
  message,
  buttonText1,
  buttonText2,
  onClose,
  handleDetails,
  handleList,
  fullWidth = false,
}) => {
  return (
    <Dialog
      open
      onClose={onClose}   
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
      fullWidth={fullWidth}
    >
      <DialogTitle id="alert-dialog-title">{message}</DialogTitle>
      <DialogContent>
        <DialogContentText id="alert-dialog-description">
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleDetails}>{buttonText1}</Button>
        <Button onClick={handleList} autoFocus>
          {buttonText2}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default AlertDialog;
