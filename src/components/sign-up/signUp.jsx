import React, { useState } from 'react';
import axios from 'axios';
import { useStore } from '../../Store'

import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
// import FormControlLabel from '@material-ui/core/FormControlLabel';
// import Checkbox from '@material-ui/core/Checkbox';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import './signUp.css'
const ENDPOINT = process.env.REACT_APP_HEROKU_URL;



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

export default function SignUp(props) {
  const classes = useStyles();
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [firstName, setfirstName] = useState('')
  const [lastName, setlastName] = useState('')
  const [username, setUsername] = useState('')
  const [avatar, setAvatar] = useState('')
  const [state, dispatch] = useStore();
  const [error, setError] = useState('')


  const submitRegistration = (event) => {
    event.preventDefault();

    if (firstName === '') {
      setError('First Name cannot be blank')
    } else if (lastName === '') {
      setError('Last Name cannot be blank')
    } else if (username === '') {
      setError('Username cannot be blank')
    } else if (email === '') {
      setError('Email cannot be blank')
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      setError('Email address is invalid')
    } else if (password === '') {
      setError('Password cannot be blank')
    // } else if (password.length < 8) {
    //   setError('Password must be at least 8 characters long')
    } else {
      axios.post(`/api/register`, {
        email,
        firstName,
        lastName,
        username,
        password,
        avatar
      })
        .then((res) => {
          console.log(res.data, 'res from sign-up request')
          if (res.data[0]) {
            dispatch({ type: 'SET_USERNAME', payload: res.data[0].username })
            dispatch({ type: 'SET_USER_ID', payload: res.data[0].id})
            props.handleClose();
          } else {
            setError('Error: Duplicate email or password')
          }
        })
        .catch((error) => {
          
          console.error(error, "error from axios request")
        })
    }
  }

  return (
    <Container class='signup' component="main" maxWidth="xs" style={{ margin: '-50px 0px', padding: '0px 50px', height: '700px', width: '400px' }}>
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign up
        </Typography>
        <form className={classes.form} noValidate>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <TextField
                autoComplete="fname"
                name="firstName"
                variant="outlined"
                required
                fullWidth
                id="firstName"
                label="First Name"
                autoFocus
                onChange={event => setfirstName(event.target.value)}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                variant="outlined"
                required
                fullWidth
                id="lastName"
                label="Last Name"
                name="lastName"
                autoComplete="lname"
                onChange={event => setlastName(event.target.value)}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                id="username"
                label="Username"
                name="username"
                autoComplete="username"
                onChange={event => setUsername(event.target.value)}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                autoComplete="email"
                onChange={event => setEmail(event.target.value)}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                autoComplete="current-password"
                onChange={event => setPassword(event.target.value)}
              />
            </Grid>
            <Grid item xs={12}>
            <TextField
                variant="outlined"
                required
                fullWidth
                name="avatar"
                label="avatar"
                type="avatar"
                id="avatar"
                onChange={event => setAvatar(event.target.value)}
              />
            </Grid>
          </Grid>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
            onClick={submitRegistration}
          >
            Sign Up
          </Button>
          <div className='error'>
            {error}
          </div>
          <Grid container justify="flex-end">
            <Grid item>
              <Link href="#" variant="body2" style={{color: "black"}}>
                Already have an account? Sign in
              </Link>
            </Grid>
          </Grid>
        </form>
      </div>
      <Box mt={5}>
      </Box>
    </Container>
  );
}