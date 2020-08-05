import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Link from '@material-ui/core/Link';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';


// Generate Order Data
function createData(id, date, name, shipTo, paymentMethod, amount) {
  return { id, date, name, shipTo, paymentMethod, amount };
}

//will need to do a axios request in here for user data and over all stats


// function preventDefault(event) {
//   event.preventDefault();
// }

const useStyles = makeStyles((theme) => ({
  seeMore: {
    marginTop: theme.spacing(3),
  },
}));


export default function LeaderBoard() {

  const [leaderBoard, setleaderBoard] = useState([]);

  useEffect(() => {
    Promise.all([
      axios.get(`/api/leaderboard`)
    ]).then((data) => {
      // console.log(data, "this is data in orders")
      setleaderBoard(prev => [...prev, ...data[0].data]);
    })
      .catch(error => {
        console.log(error.message, "problem");
      })
  }, []);

  const leaders = leaderBoard.map((leader) => {
    // console.log(leader);
    return (
      <div>
        <TableRow key={leaders} style={{display:'flex', justifyContent:'space-between'}}>
        <TableCell>{leader.username}</TableCell>
        <TableCell align="right">{leader.sum}</TableCell>
        </TableRow>
      </div>
    )
  })

  const classes = useStyles();
  return (
    <React.Fragment>
      <div style={{ display: 'flex', justifyContent: 'space-evenly' }}>
        <div style={{ display: 'block' }}>
          <h1>Leaderboard </h1>
          <br></br>
          <Table size="small">
            <TableHead>
              <TableRow>
                <TableCell>Username</TableCell>
                <TableCell align="right">Total Agreement Points</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>

              
                {leaders}
    

            </TableBody>
          </Table>
        </div>
        <div style={{ display: 'block' }}>
          <h1>Most Popular Topics</h1>
          <br></br>
          <Table size="small">
            <TableHead>
              <TableRow>
                <TableCell>Payment Method</TableCell>
                <TableCell align="right">Sale Amount</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              <h1> Hello there</h1>
            </TableBody>
          </Table>
        </div>
      </div>
    </React.Fragment>
  );
}