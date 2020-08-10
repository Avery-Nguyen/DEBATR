import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useStore } from '../../Store'
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

  const [state, dispatch] = useStore();
  const [debateCount, setsetDebateCount] = useState([]);
  // const [topicCount, setTopicCount] = useState([]);

  useEffect(() => {
   let username = state.username
   console.log(username)
    Promise.all([
      axios.post(`/api/userdebatecount`),
        {username}
    
    ]).then((res) => {
      console.log(res)
      // console.log(data, "this is data in orders")
      // setsetDebateCount(prev => [...prev, ...data[0].data]);
    })
      .catch(error => {
        console.log(error.message, "problem");
      })
  }, []);


  // useEffect(() => {
  //   Promise.all([
  //     axios.get(`/api/topiccount`)
  //   ]).then((data) => {
  //     // console.log(data, "this is data in for topic count")
  //     setTopicCount(prev => [...prev, ...data[0].data]);
  //   })
  //     .catch(error => {
  //       console.log(error.message, "problem");
  //     })
  // }, []);


  // const classes = useStyles();
  return (
    <React.Fragment style={{ maxWidth: 'fit-content' }}>
       <h1 align="center"  border='solid 8px rgb(64,81,182)'>{state.username}'s Stats </h1>
      <div style={{ display: 'flex', justifyContent: 'space-evenly'}}>
     
        <div style={{ display: 'block' }}>
          
          <br></br>
          <Table size="small">
            <TableHead>
              <TableRow>
                <TableCell>Total Debates</TableCell>

              </TableRow>
            </TableHead>
            <TableBody>
              {/*total debates in here */}
            </TableBody>
          </Table>
        </div>

        <div style={{ display: 'block' }}>
          <br></br>
          <Table size="small">
            <TableHead>
              <TableRow>
                <TableCell align="center">Categories Breakdown</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {/* user topic breakdown */}
            </TableBody>
          </Table>
        </div>
        <div style={{ display: 'block' }}>
          <br></br>
          <Table size="small">
            <TableHead>
              <TableRow>
                <TableCell align="center">Topics Breakdown</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {/* user topic breakdown */}
            </TableBody>
          </Table>
        </div>
        <div style={{ display: 'block' }}>
          <br></br>
          <Table size="small">
            <TableHead>
              <TableRow>
                <TableCell align="center">Total Points</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {/* user topic breakdown */}
            </TableBody>
          </Table>
        </div>
      </div>
    </React.Fragment>
  );
}