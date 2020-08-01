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

const useStyles = makeStyles({
  root: {
    minWidth: 300,
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
  }
});

export default function OutlinedCard() {
  const classes = useStyles();
  const bull = <span className={classes.bullet}>•</span>;

  return (
    <Card className={classes.root} variant="outlined" style={{border: "solid black 1px", width: "25px"}}>
      <CardContent>
        <Typography className={classes.title} color="black" gutterBottom>
          Create a stage?
        </Typography>
        <div className={classes.topicStance}>
      <FormControl className={classes.formControl}>
        <InputLabel htmlFor="grouped-native-select">Topic</InputLabel>
        <Select native defaultValue="" id="grouped-native-select">
          <option aria-label="None" value="" />
            <option value={1}>Nudity API</option>
            <option value={2}>Andy Lindsay</option>
            <option value={2}>Oranges</option>
        </Select>
      </FormControl>
      <FormControl className={classes.formControl} style={{width: "75px"}}>
        <InputLabel htmlFor="grouped-select">Stance</InputLabel>
        <Select defaultValue="" id="grouped-select">
          <MenuItem value="">
            <em>None</em>
          </MenuItem>
          <MenuItem value={1}>For</MenuItem>
          <MenuItem value={2}>Against</MenuItem>
        </Select>
      </FormControl>
    </div>
      </CardContent>
      <Button
            type="submit"
            fullWidth
            variant="contained"
            color="secondary"
            backgroundColor='black'
            className={classes.submit}
            Create Stage
          />
    </Card>
  );
}