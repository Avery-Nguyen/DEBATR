import React, { useEffect, useState } from 'react';
import axios from 'axios';
// import Link from '@material-ui/core/Link';
// import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';


// Generate Order Data
// function createData(id, date, name, shipTo, paymentMethod, amount) {
//   return { id, date, name, shipTo, paymentMethod, amount };
// }

//will need to do a axios request in here for user data and over all stats


// function preventDefault(event) {
//   event.preventDefault();
// }

// const useStyles = makeStyles((theme) => ({
//   seeMore: {
//     marginTop: theme.spacing(3),
//   },
// }));


export default function UserStats() {

  const [leaderBoard, setleaderBoard] = useState([]);
  const [topicCount, setTopicCount] = useState([]);

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


  useEffect(() => {
    Promise.all([
      axios.get(`/api/topiccount`)
    ]).then((data) => {
      // console.log(data, "this is data in for topic count")
      setTopicCount(prev => [...prev, ...data[0].data]);
    })
      .catch(error => {
        console.log(error.message, "problem");
      })
  }, []);


  // const classes = useStyles();
  return (
    <React.Fragment style={{ maxWidth: 'fit-content' }}>
      <div style={{ display: 'flex', justifyContent: 'space-evenly'}}>
        <div style={{ display: 'block' }}>
          <h1 align="center"  border='solid 8px rgb(64,81,182)'>Leaderboard </h1>
          <br></br>
          <Table size="small">
            <TableHead>
              <TableRow>
                <TableCell>Username</TableCell>
                <TableCell>Total Agreement Points</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {leaderBoard.map((leader) => (
                <TableRow key={leader.id}>
                  <TableCell align="center">{leader.username}</TableCell>
                  <TableCell align="center">{leader.sum}</TableCell>

                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>

        <div style={{ display: 'block' }}>
          <h1 align="center">Most Popular Topics</h1>
          <br></br>
          <Table size="small">
            <TableHead>
              <TableRow>
                <TableCell align="center">Topic</TableCell>
                <TableCell align="center">Count</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {topicCount.map((topic) => (
                <TableRow key={topic.id}>
                  <TableCell align="center">{topic.question}</TableCell>
                  <TableCell align="center">{topic.topic_count}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </div>
    </React.Fragment>
  );
}