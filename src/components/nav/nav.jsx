import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import CloseIcon from '@material-ui/icons/Close';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Slide from '@material-ui/core/Slide';

import SignUp from '../sign-up/signUp.jsx'
import SignIn from '../sign-in/signIn'
import Dashboard from '../dashboard/dashboard'

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 0,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
}));

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function NavBar(props) {
  const classes = useStyles();



  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const [openSignIn, setOpenSignIn] = React.useState(false);

  const handleClickOpenSignIn = () => {
    setOpenSignIn(true);
  };

  const handleCloseSignIn = () => {
    setOpenSignIn(false);
  };

  const [openStats, setStats] = React.useState(false);

  const handleStatsOpen = () => {
    setStats(true);
  };

  const handleCloseStats = () => {
    setStats(false);
  };

  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Toolbar>
          <h3> Debatr </h3>
          <Typography variant="h6" className={classes.title}>
          </Typography>
          <Button color="inherit" onClick={handleStatsOpen}>Statistics</Button>
          <Dialog fullScreen open={openStats} onClose={handleCloseStats} TransitionComponent={Transition}>
            <IconButton edge="start" color="inherit" onClick={handleCloseStats} aria-label="close">
              <CloseIcon />
            </IconButton>
            <Dashboard />
          </Dialog>


          <Button color="inherit" onClick={handleClickOpenSignIn}>Login</Button>
          <Dialog
            open={openSignIn}
            TransitionComponent={Transition}
            keepMounted
            onClose={handleCloseSignIn}
          >
            <SignIn />
          </Dialog>
          <Button color="inherit" onClick={handleClickOpen}>Sign Up</Button>
          <Dialog
            open={open}
            TransitionComponent={Transition}
            keepMounted
            onClose={handleClose}
          >
            <SignUp />
          </Dialog>

        </Toolbar>
      </AppBar>
    </div>
  );
}