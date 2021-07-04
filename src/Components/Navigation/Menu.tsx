import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';

import { useTheme } from '@material-ui/core/styles';
import IconButton from '@material-ui/core/IconButton';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import Button from '@material-ui/core/Button';
import MenuIcon from '@material-ui/icons/Menu';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import Routes from '../../Layout/Routes';

export default function SimpleMenu() {
  const history = useHistory();
  const theme = useTheme();
  const largeScreen = useMediaQuery(theme.breakpoints.up('md'));
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const onImagesClick = () => {
    history.push(Routes.Landing);
    handleClose();
  };
  const onUploadClick = () => {
    history.push(Routes.Upload);
    handleClose();
  };

  return largeScreen ? (
    <div>
      <Button color="inherit" onClick={onImagesClick}>
        View Images
      </Button>
      <Button color="inherit" onClick={onUploadClick}>
        Upload Image
      </Button>
    </div>
  ) : (
    <div>
      <IconButton
        aria-controls="simple-menu"
        aria-haspopup="true"
        onClick={handleClick}
        color="inherit"
      >
        <MenuIcon />
      </IconButton>
      <Menu
        id="navigation-manu"
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleClose}
      >
        <MenuItem onClick={onImagesClick}>View Images</MenuItem>
        <MenuItem onClick={onUploadClick}>Upload Image</MenuItem>
      </Menu>
    </div>
  );
}
