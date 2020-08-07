import React, { useEffect, useState } from 'react';
import axios from 'axios';

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
  const [totaldebates, settotaldebates] = useState();

  useEffect(() => {
    Promise.all([
      axios.get(`/api/totaldebates`)
    ]).then((data) => {
      // console.log(data[0].data, "this is data in orders")
      settotaldebates(data[0].data[0].count);
    })
      .catch(error => {
        console.log(error.message, "problem");
      })
  }, []);


  return (
    <React.Fragment>
      <Typography component="p" variant="h4" align='center'>
        Total Debates
      </Typography>
      <br/>
      <Typography component="p" variant="h4" align='center'>
       {totaldebates}
      </Typography>
    </React.Fragment>
  );
}