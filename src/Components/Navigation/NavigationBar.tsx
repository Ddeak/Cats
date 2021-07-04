import React from 'react';
import { useHistory } from 'react-router-dom';

import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import PetsIcon from '@material-ui/icons/Pets';

import Routes from '../../Layout/Routes';
import Menu from './Menu';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    menuButton: {
      marginRight: theme.spacing(2),
    },
    title: {
      flexGrow: 1,
    },
  })
);

const NavigationBar = () => {
  const classes = useStyles();
  const history = useHistory();

  const onLogoClick = () => history.push(Routes.Landing);

  return (
    <div>
      <AppBar position="static">
        <Toolbar>
          <IconButton
            edge="start"
            className={classes.menuButton}
            color="inherit"
            onClick={onLogoClick}
          >
            <PetsIcon />
          </IconButton>

          <Typography variant="h6" className={classes.title}>
            All about the Cats!
          </Typography>

          <Menu />
        </Toolbar>
      </AppBar>
    </div>
  );
};

export default NavigationBar;
