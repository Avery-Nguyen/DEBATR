import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import Avatar from '@material-ui/core/Avatar';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Container from '@material-ui/core/Container';

const useStyles = makeStyles((theme) => ({
  root: {
    minWidth: 300,
    borderRadius: "50%",
  },
  title: {
    fontSize: 14,
  },
  pos: {
    marginBottom: 12,
  },
  topicStance: {
    display: 'flex',
    justifyContent: 'space-between'
  },
  paper: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    borderRadius: '30px',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%',
    marginTop: theme.spacing(2),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

export default function CreateRoom() {
  const classes = useStyles();
  const bull = <span className={classes.bullet}>•</span>;

  return (
    <Container component="main" maxWidth="xs" style={{border:'solid black 3px', borderRadius: "30px"}}>
      <CssBaseline />
      <Box mt={2}>
      </Box>
      <div className={classes.paper}>
         <img style={{borderRadius: "50%"}}src="data:image/jpeg;base64,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"
        />
        <Typography component="h1" variant="h5">
          Will you be the next master?
      </Typography>
        <FormControl className={classes.formControl} style={{
              marginTop:'15px',
            }}>
          <InputLabel htmlFor="grouped-native-select"
            variant="outlined"
            // margin="normal"
            fullWidth
            autoFocus
            >Topic</InputLabel>
          <Select native defaultValue="" id="grouped-native-select">
            <option aria-label="None" value="" />
            <option value={1}>Nudity API</option>
            <option value={2}>Andy Lindsay</option>
            <option value={2}>Oranges</option>
          </Select>
        </FormControl>
        <FormControl className={classes.formControl} style={{ width: "100px", marginTop:'15px', }}>
          <InputLabel htmlFor="grouped-select">Stance</InputLabel>
          <Select defaultValue="" id="grouped-select">
            <MenuItem value="">
              <em>None</em>
            </MenuItem>
            <MenuItem value={1}>For</MenuItem>
            <MenuItem value={2}>Against</MenuItem>
          </Select>
        </FormControl>
        <Button
          // onClick={handleClickOpen}
          variant="contained"
          style={{
            color: "white",
            backgroundColor: "rgb(64,81,182)",
            marginTop:'25px',
            borderRadius: "30px"
          }}
        >Create Stage
      </Button>
      </div>
      <Box mt={2}>
      </Box>
    </Container>
  );
}