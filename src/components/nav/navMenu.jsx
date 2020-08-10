import React from 'react';
import Button from '@material-ui/core/Button';
import ClickAwayListener from '@material-ui/core/ClickAwayListener';
import Grow from '@material-ui/core/Grow';
import Paper from '@material-ui/core/Paper';
import Popper from '@material-ui/core/Popper';
import MenuItem from '@material-ui/core/MenuItem';
import MenuList from '@material-ui/core/MenuList';
// import { makeStyles } from '@material-ui/core/styles';
import { useStore } from '../../Store'
import axios from 'axios';


import Avatar from '@material-ui/core/Avatar';

// const useStyles = makeStyles((theme) => ({
//   root: {
//     display: 'flex',
//   },
//   paper: {
//     marginRight: theme.spacing(2),
//   },
// }));

export default function NavMenu() {
  const [state, dispatch] = useStore();
  // const classes = useStyles();
  const [open, setOpen] = React.useState(false);
  const anchorRef = React.useRef(null);

  const handleToggle = () => {
    setOpen((prevOpen) => !prevOpen);
  };

  const handleClose = (event) => {
    if (anchorRef.current && anchorRef.current.contains(event.target)) {
      return;
    }

    setOpen(false);
  };

  function handleListKeyDown(event) {
    if (event.key === 'Tab') {
      event.preventDefault();
      setOpen(false);
    }
  }

  const handleLogout = () => {
    if(state.visualMode !== 'LOBBY' && state.visualMode !== 'SPECTATOR' ) {
      dispatch({ type: 'SET_VISUAL_MODE', payload: 'LOBBY' })
      dispatch({ type: 'SET_TOKEN', payload: null })
      state.currentSocket.emit('leaveRoom', {
        roomName : state.currentRoom,
        userName : state.username
      })
    } else if (state.visualMode !== 'LOBBY' && state.visualMode === 'SPECTATOR') {
      dispatch({ type: 'SET_VISUAL_MODE', payload: 'LOBBY' })
      state.currentSocket.emit('leaveRoomSpectator', {
        roomName : state.currentRoom,
        userName : state.username
      })
    }

    axios.get('/api/logout', {})
      .then((res) => {
        // console.log('response from logout', res)
        if (res.data === 'success') {
          dispatch({ type: 'SET_USERNAME', payload: null })
          dispatch({ type: 'SET_USER_ID', payload: null })
        }

        // This is cheap but it works
        window.location.reload();
        return true
      })
      .catch((error) => {
        console.error(error, "error from axios request")
      })
  }

  // return focus to the button when we transitioned from !open -> open
  const prevOpen = React.useRef(open);
  React.useEffect(() => {
    if (prevOpen.current === true && open === false) {
      anchorRef.current.focus();
    }

    prevOpen.current = open;
  }, [open]);
// console.log(state)
  return (
    <div>
        <Button
          ref={anchorRef}
          aria-controls={open ? 'menu-list-grow' : undefined}
          aria-haspopup="true"
          onClick={handleToggle}
          style={{
            color: 'white'
          }}
        >

          {state.userAvatarUrl && <Avatar alt={state.username} src={state.userAvatarUrl} />}
          {!state.userAvatarUrl && <Avatar alt={state.userAvatarUrl} />}

        </Button>
        <Popper open={open} anchorEl={anchorRef.current} role={undefined} transition disablePortal>
          {({ TransitionProps, placement }) => (
            <Grow
              {...TransitionProps}
              style={{ transformOrigin: placement === 'bottom' ? 'center top' : 'center bottom' }}
            >
              <Paper>
                <ClickAwayListener onClickAway={handleClose}>
                  <MenuList autoFocusItem={open} id="menu-list-grow" onKeyDown={handleListKeyDown}>
                    <MenuItem onClick={handleClose}>{state.username}</MenuItem>
                    <MenuItem onClick={handleClose}>My account</MenuItem>
                    <MenuItem onClick={handleLogout}>Logout</MenuItem>
                  </MenuList>
                </ClickAwayListener>
              </Paper>
            </Grow>
          )}
        </Popper>
    </div>
  );
}