import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Slider from '@material-ui/core/Slider';

const useStyles = makeStyles({
  root: {
    width: 300,
  },
});

export default function DiscreteSlider({setPoints, points}) {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Typography id="discrete-slider" gutterBottom>
        Convinced?
        
      </Typography>
      <Slider
        // defaultValue={2.5}
        aria-labelledby="discrete-slider"
        valueLabelDisplay="auto"
        value={points}
        marks
        min={0}
        max={100}
        onChange={(event,newValue) => {
          setPoints(newValue);
        }}
      />
      <div class="convinced">
          <p>
          No
          </p> 
          <p>
          Very
          </p>
        </div>
    </div>
  );
}