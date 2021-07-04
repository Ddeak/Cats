import React from 'react';
import Snackbar, { SnackbarProps } from '@material-ui/core/Snackbar';
import { makeStyles } from '@material-ui/core/styles';

interface PropsType extends SnackbarProps {
  message?: string;
}

const useStyles = makeStyles((theme) => ({
  snackbar: {
    padding: 16,
    borderRadius: 16,
    backgroundColor: theme.palette.error.light,
    color: theme.palette.error.contrastText,
  },
}));

const StyledSnackbar: React.FC<PropsType> = ({ message, ...rest }) => {
  const classes = useStyles();
  return (
    <Snackbar {...rest}>
      <div className={classes.snackbar}>{message}</div>
    </Snackbar>
  );
};

export default StyledSnackbar;
