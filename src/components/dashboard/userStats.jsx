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
import Typography from '@material-ui/core/Typography';
const ENDPOINT = process.env.REACT_APP_HEROKU_URL;



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
  // const [debateCount, setsetDebateCount] = useState([]);
  // const [topicCount, setTopicCount] = useState([]);
  const [debateNum, setDebateNum] = useState(null);
  const [totalPoints, setTotalPoints] = useState(null);
  const [highestCategory, setHighestCategory] = useState(null);
  const [highestTopic, setHighestTopic] = useState(null);

  useEffect(() => {
   let username = state.username
   let userID = state.userID
  //  console.log(username)

   const debateCount = axios.post(`/api/user/debatecount`, {username})
   const totalUserPoints = axios.post(`/api/user/totalpoints`, {userID})
   const topCategory = axios.post(`/api/user/highest_user_category`, {userID})
   const topTopic = axios.post(`/api/user/mostdebatedtopic`, {userID})

    Promise.all([
      debateCount, 
      totalUserPoints, 
      topCategory, 
      topTopic
    ]).then((res) => {
      setDebateNum(res[0].data[0].count)
      setTotalPoints(res[1].data[0].sum)
      setHighestCategory(res[2].data[0].name)
      setHighestTopic(res[3].data.question)
    })
      .catch(error => {
        console.log(error.message, "problem");
      })
  }, [state.username, state.userID]);




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
                <TableCell>
                <Typography class="stat-header" component="p" variant="h4" align='center'>
                Your Total Debates      
                </Typography>
                  </TableCell>
              </TableRow>
              <TableRow>
                <TableCell style={{textAlign: 'center'}}>{debateNum}</TableCell>
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
                
                <TableCell align="center">
                  <Typography class="stat-header" component="p" variant="h4" align='center'>
                Your Total Points     
                </Typography>
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell align="center">{totalPoints}</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {/* user topic breakdown */}
            </TableBody>
          </Table>
        </div>
        </div>
        <div style={{ display: 'flex', justifyContent: 'space-evenly'}}>

        <div style={{ display: 'block' }}>
          <br></br>
          <Table size="small">
            <TableHead>
              <TableRow>
                <TableCell align="center">
                <Typography class="stat-header" component="p" variant="h4" align='center'>
                Most Debated Category    
                </Typography>
                  
                  </TableCell>
              </TableRow>
              <TableRow>
                <TableCell align="center">{highestCategory}</TableCell>
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
                <TableCell align="center">
                <Typography class="stat-header" component="p" variant="h4" align='center'>    
                  Most Debated Topic
                </Typography>
                  </TableCell>
              </TableRow>
              <TableRow>
                <TableCell align="center">{highestTopic}</TableCell>
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