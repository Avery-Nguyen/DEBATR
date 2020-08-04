import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import Button from '@material-ui/core/Button';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import CardActions from '@material-ui/core/CardActions';
import Avatar from '@material-ui/core/Avatar';
import UserRating from '../partials/staticRating'
import LinearProgress from '@material-ui/core/LinearProgress';

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

export default function WaitingRoom() {
  const classes = useStyles();

  return (
    <main>
      <Card className={classes.root} style={{ border: "solid black 1px", width: "215px" }} >
        <CardContent>
          <Typography className={classes.title} color="textSecondary" gutterBottom>
            <h3> Waiting for oppponent</h3>
          </Typography>
          <LinearProgress />
          {/* <LinearProgress color="secondary" /> */}
        </CardContent>
        {/* <CardActions>
        <Button size="small">Links to social accounts?</Button>
      </CardActions> */}
      </Card>
    </main>
  );
}