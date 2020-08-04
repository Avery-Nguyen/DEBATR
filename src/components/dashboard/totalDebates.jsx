import React from 'react';
import Link from '@material-ui/core/Link';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';

function preventDefault(event) {
  event.preventDefault();
}

const useStyles = makeStyles({
  depositContext: {
    flex: 1,
  },
});

export default function TotalDebates() {
  const classes = useStyles();
  return (
    <React.Fragment>
      <Typography component="p" variant="h4">
        Total Debates
      </Typography>
      <Typography component="p" variant="h4">
        8,557
      </Typography>
    </React.Fragment>
  );
}