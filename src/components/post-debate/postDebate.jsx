import React, { useState, useEffect } from "react";
import UserRating from "../partials/controlledRating";
import DiscreteSlider from "../partials/slider";
// import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
// import TextField from "@material-ui/core/TextField";
// import FormControlLabel from "@material-ui/core/FormControlLabel";
// import Checkbox from "@material-ui/core/Checkbox";
// import Link from "@material-ui/core/Link";
import Grid from "@material-ui/core/Grid";
import Box from "@material-ui/core/Box";
// import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import axios from "axios";
import { useStore } from "../../Store";
import "./post-debate.css";

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(3),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

export default function PostDebate({ activeRoomState }) {
  const [state, dispatch] = useStore();
  const [rating, setRating] = useState(null);
  const [points, setPoints] = useState(50);
  const [fromUserID, setFromUserID] = useState(null);
  // console.log("PostDebate -> fromUserID", fromUserID);
  const [toUserID, setToUserID] = useState(null);
  // console.log("PostDebate -> toUserID", toUserID);

  const classes = useStyles();
  useEffect(() => {
    if (state.username === activeRoomState.host) {
      setToUserID(activeRoomState.contender_id);
      setFromUserID(activeRoomState.host_id);
    } else {
      setToUserID(activeRoomState.host_id);
      setFromUserID(activeRoomState.contender_id);
    }
  }, [
    activeRoomState.contender_id,
    activeRoomState.host_id,
    state.username,
    activeRoomState.host,
  ]);

  const submitRatingToDB = (event) => {
    event.preventDefault()
    let agreePoints;
    if (state.username === activeRoomState.host) {
      setToUserID(activeRoomState.contender_id);
      setFromUserID(activeRoomState.host_id);
      agreePoints = 100 - points;
    } else {
      setToUserID(activeRoomState.host_id);
      setFromUserID(activeRoomState.contender_id);
      agreePoints = points;
    }
    const ratingPost = axios.post("/api/users/ratings", {
      from_user_id: state.userID,
      to_user_id: toUserID,
      rating,
      points: 100 + points,
    });

    const agreementRatingPost = axios.post("/api/agreement_ratings", {
      room_log_id: activeRoomState.game_id,
      user_id: fromUserID,
      agreement_rating: agreePoints,
    });

    axios
      .all([ratingPost, agreementRatingPost])
      .then(
        axios.spread((...responses) => {
          
        })
      )
      .catch((errors) => {
        // react on errors.
        console.error(errors);
      });

      dispatch({ type: 'SET_VISUAL_MODE', payload: "LOBBY" });

  };

  return (
    // <main>
    <Container
      component="main"
      maxWidth="xs"
      style={{ border: "2px solid black", borderRadius: "10px" }}
    >
      <CssBaseline />
      <div className={classes.paper}>
        <Typography component="h1" variant="h5">
          Debate Review
        </Typography>
        <form className={classes.form} noValidate>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <section class="review-slider">
                <UserRating setRating={setRating} rating={rating} />
                </section>
              </Grid>
              <Grid item xs={12}>
                <section class="review-slider">
                  <DiscreteSlider setPoints={setPoints} points={points} />
                </section>
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
        <Box mt={5}></Box>
      </Container>
    // </main>
  );
}
