import React from 'react';
import Card from '@material-ui/core/Card';
import { makeStyles } from '@material-ui/core/styles';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import {useStore} from '../../Store'

const useStyles = makeStyles((theme) => ({
  root: {
    minWidth: 275,
    zIndex: '3'
  },
  bullet: {
    display: 'inline-block',
    margin: '0 2px',
    transform: 'scale(0.8)',
  },
  title: {
    fontSize: 14,
  },
  pos: {
    marginBottom: 12,
  },
  root: {
    width: '100%',
    '& > * + *': {
      marginTop: theme.spacing(2),
    },
  },
}));

export default function Disconnect() {
  const [dispatch] = useStore();
  const classes = useStyles();

  const returnToLobby= () => {
    dispatch({type: "SET_VISUAL_MODE", payload: "LOBBY"})
  }


  return (
    <main style={{display: "flex",
      justifyContent: "center"
      }}>
      <Card className={classes.root} style={{ border: "solid black 1px", width: "315px", marginTop: "63px", justifyContent: "center" }} >
      <CardContent>
      <Typography className={classes.title} color="textSecondary" gutterBottom>
            <h3> Your opponent disconnected!</h3>
            <h4>
              <svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-mood-sad" width="40" height="40" viewBox="0 0 24 24" stroke-width="1.5" stroke="#3F51B5" fill="none" stroke-linecap="round" stroke-linejoin="round">
                <path stroke="none" d="M0 0h24v24H0z"/>
                <circle cx="12" cy="12" r="9" />
                <line x1="9" y1="10" x2="9.01" y2="10" />
                <line x1="15" y1="10" x2="15.01" y2="10" />
                <path d="M9.5 15.25a3.5 3.5 0 0 1 5 0" />
              </svg>
            </h4>
          </Typography>
          <Button
          onClick={returnToLobby}
          variant="contained"
          style={{
            color: "white",
            backgroundColor: "rgb(64,81,182)",
            marginTop:'25px',
            borderRadius: "30px"
          }}
        >Return to Lobby
      </Button>
      </CardContent>
      </Card>
    </main>
  )
}

