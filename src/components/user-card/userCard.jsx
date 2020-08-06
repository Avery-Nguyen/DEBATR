import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Avatar from '@material-ui/core/Avatar';
import UserRating from '../partials/staticRating'

const useStyles = makeStyles({
  root: {
    minWidth: 275,
    zIndex: '3'
  },
  bullet: {
    display: 'inline-block',
    margin: '0 2px',
    transform: 'scale(0.8)',
  },
  title: {
    fontSize: 14,
  },
  pos: {
    marginBottom: 12,
  },
});

export default function UserCard(props) {
  const classes = useStyles();
console.log(props.hostUsercard, 'props')

let {username, points_avg, rating_avg, host_count, contender_count } = props.hostUsercard || ''


// {username: "coder", points_avg: "166.8571428571428571", rating_avg: "4.7142857142857143", host_count: "1155", contender_count: "1155"}/

// const { username }= props.hostUsercard
console.log(username)
// console.log(userDetails)
  return (
    <Card className={classes.root} style={{border: "solid black 1px", width: "25px"}} >
      <CardContent>
      <Avatar alt="Remy Sharp" src="/static/images/avatar/1.jpg" />
        <Typography className={classes.title} color="textSecondary" gutterBottom>
         {username}
        </Typography>
        <UserRating rating={rating_avg}/>
        <p>{host_count + contender_count} debates</p>
        <br></br>
        <p>{Math.round(points_avg)} Debate Average</p>
      </CardContent>
      <CardActions>
        <Button size="small">Links to social accounts?</Button>
      </CardActions>
    </Card>
  );
}


