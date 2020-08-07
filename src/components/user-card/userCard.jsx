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
    zIndex: '3',
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
// console.log(props.hostUsercard, 'props')

let {username, points_avg, rating_avg, host_count, contender_count, avatar_url } = props.hostUsercard || ''


// {username: "coder", points_avg: "166.8571428571428571", rating_avg: "4.7142857142857143", host_count: "1155", contender_count: "1155"}/

// const { username }= props.hostUsercard
// console.log(userDetails)
  return (
    <Card className={classes.root} style={{border: "solid black 1px", width: "25px", display: "flex", flexDirection: "row", position: "relative"}} >
      <CardContent>
      <Avatar alt="Remy Sharp" src={avatar_url} />
        <Typography className={classes.title} color="textSecondary" gutterBottom>
         {username}
        </Typography>
        <UserRating rating={rating_avg}/>
        <p>{host_count + contender_count || 0} debates</p>
        <br></br>
        <p>{Math.round(points_avg || 0)} Debate Average</p>
        <div style={{position: "absolute", 
                    top: "20px",
                    right: "15px",
                    }}>
          <svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-award" width="28" height="28" viewBox="0 0 24 24" stroke-width="1.5" stroke="#4051B6" fill="none" stroke-linecap="round" stroke-linejoin="round">
            <path stroke="none" d="M0 0h24v24H0z"/>
            <circle cx="12" cy="9" r="6" />
            <polyline points="9 14.2 9 21 12 19 15 21 15 14.2" transform="rotate(-30 12 9)" />
            <polyline points="9 14.2 9 21 12 19 15 21 15 14.2" transform="rotate(30 12 9)" />
          </svg>
        </div>
      </CardContent>
    </Card>
  );
}