import React, {useState} from 'react';
import UserRating from '../partials/controlledRating';
import DiscreteSlider from '../partials/slider';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import axios from 'axios';
import {useStore} from '../../Store'


const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(3),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

export default function PostDebate({activeRoomState}) {
  const [state, dispatch] = useStore(); 
  const [rating, setRating] = useState(null);
  const [points, setPoints] = useState(50);

  const classes = useStyles();


  const submitRatingToDB = () => {
    let toUser;
    let fromUser;
    let agreePoints;
    if (state.username === activeRoomState.host) {
      toUser = activeRoomState.contender_id
      fromUser = activeRoomState.host_id
      agreePoints = 100 - points;
    } else {
      toUser = activeRoomState.host_id
      fromUser = activeRoomState.contender_id
      agreePoints = points
    }
    const ratingPost = axios.post('/api/users/ratings', {
      from_user_id: state.username,
      to_user_id : toUser,
      rating,
      points:100+points
    })

    const agreementRatingPost = axios.post('/api/agreement_ratings', {
      room_log_id: activeRoomState.game_id,
      user_id: fromUser,
      agreement_rating: agreePoints
    })

    console.log(`WILL POST WITH RATING OF ${rating} and sending ${points + 100} to other user`)

    axios.all([ratingPost, agreementRatingPost])
    .then(
      axios.spread((...responses) => {
        'Axios req successful'
        console.log(responses[0])
        console.log(responses[1])
      })
    )
    .catch(errors => {
      // react on errors.
      console.error(errors);
    });
  }

  return (
    <main>
    <Container component="main" maxWidth="xs" style={{ border: '2px solid black', borderRadius: '10px'}}>
      <CssBaseline />
      <div className={classes.paper}>
        <Typography component="h1" variant="h5">
          Debate Review
        </Typography>
        <form className={classes.form} noValidate>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <UserRating setRating={setRating} rating={rating} />
            </Grid>
            <Grid item xs={12}>
              <DiscreteSlider setPoints={setPoints} points={points} />
            </Grid>

          </Grid>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
            onClick={submitRatingToDB}
          >
            Submit
          </Button>
          <Button
            type="submit"
            halfWidth
            variant="contained"
            color="secondary"
            className={classes.submit}
          >
            Report user?
          </Button>
        </form>
      </div>
      <Box mt={5}>
      </Box>
    </Container>
    </main>
  );
}