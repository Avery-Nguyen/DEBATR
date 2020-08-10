import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import LobbyItem from './lobbyitem'

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 0,
    margin: '20px',
    // marginTop: "150px"
  },
  paper: {
    padding: "15px",
    textAlign: 'center',
    color: theme.palette.text.secondary,
  },
}));

export default function Lobby({roomState}, props) {
  const classes = useStyles();

  const roomItems = Object.keys(roomState).filter(room => room).map(room =>
    <Grid item xs={4}>
      <LobbyItem roomDetails={roomState[room]} />
    </Grid>
  )


  function FormRow() {
    return (
      <React.Fragment>
       {roomItems}
      </React.Fragment>
    );
  }

  return (
    <div className={classes.root} >
      <Grid container spacing={2} style={{marginTop: "25px"}}>
        <Grid container item xs={12} spacing={3} margin='24px' style={{display: "flex"}}>
          <FormRow />
        </Grid>
      </Grid>
    </div>
  );
}