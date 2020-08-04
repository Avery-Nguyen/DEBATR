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

const rows = [
  createData(0, '16 Mar, 2019', 'Elvis Presley', 'Tupelo, MS', 'VISA ⠀•••• 3719', 312.44),
  createData(1, '16 Mar, 2019', 'Paul McCartney', 'London, UK', 'VISA ⠀•••• 2574', 866.99),
  createData(2, '16 Mar, 2019', 'Andy Lindsay', 'Boston, MA', 'MC ⠀•••• 1253', 100.81),
  createData(3, '16 Mar, 2019', 'Michael Jackson', 'Gary, IN', 'AMEX ⠀•••• 2000', 654.39),
  createData(4, '15 Mar, 2019', 'Bruce Springsteen', 'Long Branch, NJ', 'VISA ⠀•••• 5919', 212.79),
];

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
        <TableRow key={leaders}>
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
              {rows.map((row) => (
                <TableRow key={row.id}>
                  <TableCell>{row.paymentMethod}</TableCell>
                  <TableCell align="right">{row.amount}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </div>
    </React.Fragment>
  );
}