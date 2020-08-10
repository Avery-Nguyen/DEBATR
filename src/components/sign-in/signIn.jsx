import React, { useState } from 'react';
import axios from 'axios';
import './signin.css'
//all the material-ui components
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
// import MuiAlert from '@material-ui/lab/Alert';
// import FormControlLabel from '@material-ui/core/FormControlLabel';
// import Checkbox from '@material-ui/core/Checkbox';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import { useStore } from '../../Store'


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
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

// function Alert(props) {
//   return <MuiAlert elevation={6} variant="filled" {...props} />;
// }


export default function SignIn(props) {
  const classes = useStyles();
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [state, dispatch] = useStore();

  const submitLogin = (event) => {
    event.preventDefault();

    if (email === '') {
      dispatch({ type: 'SET_LOGIN_ERROR', payload: { error: 'Email cannot be blank' } })
      // Hidden to log in as a@a 
      // } else if (!/\S+@\S+\.\S+/.test(email)) {
      //   dispatch({ type: 'SET_LOGIN_ERROR', payload: { error: 'Email address is invalid' } })
    } else if (password === '') {
      dispatch({ type: 'SET_LOGIN_ERROR', payload: { error: 'Password cannot be blank' } })
    } else {
      // console.log(email, 'email')
      // console.log(password, "password")
      // console.log('submitlogin called')
      axios.post('/api/login', {
        email,
        password
      })
        .then((res) => {
          if (res.data.authenticated) {
            dispatch({ type: 'SET_LOGIN_ERROR', payload: { error: null } })

            dispatch({ type: 'SET_USER_AVATAR_URL', payload: res.data.userAvatarURL })
            dispatch({ type: 'SET_USERNAME', payload: res.data.username })
            dispatch({ type: 'SET_USER_ID', payload: res.data.userID })
            props.handleCloseSignIn();
          } else {
            dispatch({ type: 'SET_LOGIN_ERROR', payload: { error: 'Incorrect login credentials.' } })
          }
          return true
        })
        .catch((error) => {
          console.error(error, "error from axios request")
          dispatch({ type: 'SET_LOGIN_ERROR', payload: { error: 'Login failed.' } })
        })
    }
  }

  let signinErrors;
  if (state.loginErrors) {
    signinErrors = Object.keys(state.loginErrors).map(error => {
      return (
        <span class="error">
          {state.loginErrors[error]}
        </span>
      )
    })
  }


  return (
    <Container component="main" maxWidth="xs" styles={{marginTop: '10px !important'}}>
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign in
        </Typography>

<div style={{display:'flex',justifyContent:'center', width:'80%'}}>
        <form action="http://localhost:3001/api/login/github" style={{display:'flex',justifyContent:'center', width:'90%'}}>
          <button
            style={{
              display: 'block',
              border: '0px',
              borderRadius: '3px',
              boxShadow: 'rgba(0, 0, 0, 0.5) 0px 1px 2px',
              color: 'rgb(255, 255, 255)',
              cursor: 'pointer',
              fontSize: '19px',
              margin: '5px',
              width: 'calc(90% - 10px)',
              overflow: 'hidden',
              padding: '0px 10px',
              userSelect: 'none',
              height: '50px',
              background: 'rgb(51, 51, 51)'
            }}
            type="submit">
            <div style={{ "alignItems": "center", "display": "flex", "height": "100%" }}>
              <div style={{ "display": "flex", "justifyContent": "center", "minWidth": "26px" }}>
                <svg fill="#FFFFFF" role="img" viewBox="0 0 24 24" width="26px" height="26px" xmlns="http://www.w3.org/2000/svg">
                  <path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12"></path></svg>
              </div>
              <div style={{ width: '10px' }}></div>
              <div style={{ textAlign: "left", width: "100%" }}>Login with GitHub</div>
            </div>
          </button>
        </form>
        </div>

        <form className={classes.form} onSubmit={submitLogin} noValidate>
          <TextField
            // onChange={event => setEmail(event.target.value)}
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="email"
            type="email"
            label="Email Address"
            name="email"
            autoComplete="email"
            autoFocus
            onChange={event => setEmail(event.target.value)}
          />
          <TextField

            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
            autoComplete="current-password"
            onChange={event => setPassword(event.target.value)}
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
          >
            Sign In
          </Button>
          {signinErrors}
          <Grid container>
            <Grid item xs>
              <Link href="#" variant="body2">
                Forgot password?
              </Link>
            </Grid>

          </Grid>
        </form>
      </div>
      <Box mt={8}>
      </Box>
    </Container>
  );
}


//Remember me logic
// {/* <FormControlLabel
// control={<Checkbox value="remember" color="primary" />}
// label="Remember me" */}
// {/* /> */ }