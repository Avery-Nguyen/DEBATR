import React, { useState, useEffect } from 'react';
import axios from 'axios';

import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Avatar from '@material-ui/core/Avatar';
import LobbyItem from '../lobby/lobbyitem'
import PastDebateItem from './pastDebateListItem'

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 0,
    margin: '200px',
  },
  paper: {
    padding: theme.spacing(1),
    textAlign: 'center',
    color: theme.palette.text.secondary,
  },
}));

export default function PastDebate() {
  const classes = useStyles();

  const [pastDebates, setpastDebates] = useState([]);
  useEffect(() => {
    Promise.all([
      axios.get(`/api/rooms`)
    ]).then((data) => {
      console.log(data);
      setpastDebates(prev => [...prev, ...data[0].data]);
    })
      .catch(error => {
        console.log(error.message);
      })
  }, []);

  const pastDebate = pastDebates.map((debate) => {
    console.log(debate)
    return(    <Grid item xs={4}>
    <PastDebateItem 
    roomQuestion={debate.question}
    agreement={debate.agreement_rating}
    likes={debate.likes}
    dislikes={debate.dislikes}
    />
  </Grid>
    )
  
  })

  function FormRow() {
    return (
      <React.Fragment>
          {pastDebate}
      </React.Fragment>
    );
  }

  return (
    <div className={classes.root} style={{
      marginTop: '-1px', 
      width: '100%',
      marginLeft: "20px"}}>
      <Grid container spacing={2}>
        <Grid container item xs={12} spacing={3} margin='24px' style={{display: "flex"}}>
          <FormRow />
        </Grid>
      </Grid>
    </div>
  );
}