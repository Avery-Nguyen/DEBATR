import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import clsx from 'clsx';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Collapse from '@material-ui/core/Collapse';
import Avatar from '@material-ui/core/Avatar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import { red } from '@material-ui/core/colors';
import FavoriteIcon from '@material-ui/icons/Favorite';
import ShareIcon from '@material-ui/icons/Share';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import Button from '@material-ui/core/Button';
import ThumbUpIcon from '@material-ui/icons/ThumbUp';
import ThumbDownIcon from '@material-ui/icons/ThumbDown';
import UserCard from '../user-card/userCard.jsx'
import Dialog from '@material-ui/core/Dialog';
import Slide from '@material-ui/core/Slide';
import CloseIcon from '@material-ui/icons/Close';
import './pastDebates.css'
import axios from 'axios';


// import getRoomRecords from '../../server/databaseCalls'
import Stage from '../stage/stage'

// const useStyles = makeStyles((theme) => ({
//   root: {
//     minwidth: "345px",
//     display: "block"
//   },
//   media: {
//     height: 0,
//     paddingTop: '56.25%', // 16:9
//   },
//   expand: {
//     transform: 'rotate(0deg)',
//     marginLeft: 'auto',
//     transition: theme.transitions.create('transform', {
//       duration: theme.transitions.duration.shortest,
//     }),
//   },
//   expandOpen: {
//     transform: 'rotate(180deg)',
//   },
//   avatar: {
//     backgroundColor: 'red[500]',
//     padding: '2px',
//   },
// }));

const useStyles = makeStyles((theme) => ({
  root: {
    maxWidth: '345px',
    minwidth: "345px",
    display: "block"
  },
  media: {
    height: 0,
    paddingTop: '56.25%', // 16:9
  },
  expand: {
    transform: 'rotate(0deg)',
    marginLeft: 'auto',
    transition: theme.transitions.create('transform', {
      duration: theme.transitions.duration.shortest,
    }),
  },
  expandOpen: {
    transform: 'rotate(180deg)',
  },
  avatar: {
    backgroundColor: 'red[500]',
    padding: '2px',
  },
}));



const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});


export default function PastDebateItem(props) {
  const classes = useStyles();

  //user-card state logic
  const [open, setOpen] = useState(false);
  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  //stage state logic - will need to change after
  const [openStage, setOpenStage] = useState(false);
  const handleClickOpenStage = () => {
    setOpenStage(true);
  };
  const handleCloseStage = () => {
    setOpenStage(false);
  };

  const [likes, setLikes] = useState(props.likes)
  const [dislikes, setDislikes] = useState(props.dislikes)

  const addLikes = (typeOfLike, room_id) => {
    console.log(typeOfLike, room_id)
    axios.post('/api/likes', {
      room_id,
      typeOfLike
    })
      .then((res) => {
        setLikes(res.data[0].likes);
        setDislikes(res.data[0].dislikes);

        console.log(likes, 'before');
        console.log(res.data[0].likes, 'res likes ')
        console.log(likes, 'after')
      })
      .catch((error) => {
        console.error(error, "error from axios request")
      })
  }

  const [hostUsercard, setHostUsercard] = useState({});
  const [contenderUsercard, setContenderUsercard] = useState([]);
  // console.log('roomState', roomState)


  const getHostUsercard = (host) => {
    console.log(host)
    axios.post('/api/usercard', {
      host
    })
      .then((res) => {
        console.log(res.data[0])
        // console.log(data.data[0], 'sql response')
        setHostUsercard(prev => ({...prev, ...res.data[0]}));
        handleClickOpen();

      });
  }

  const getContenderUsercard = (contender) => {
    axios.get('/api/usercard')
      .then((res) => {
        setContenderUsercard(prev => ({...prev, ...res.data[0]}))
        handleClickOpen();

      });
  }

  console.log(hostUsercard);

  // useEffect(() => {
  //   setLikes(likes);
  //   setDislikes(dislikes);
  //   // console.log(likes)
  //   // console.log(dislikes)
  // }, [likes, dislikes]);


  return (
    <Card className={classes.root} style={{
      // border: "solid rgb(255,107,107) 3px",
      backgroundColor: "rgb(241,241,241)",
      borderRadius: "30px",
      minWidth: "315px"
    }}>

      <div style={{display:'flex', padding:'5px 7px 0px 7px', justifyContent:'space-between'}}>
          <div>
            <Avatar title='host' onClick={() => getHostUsercard(props.host)} />
            <Dialog
              open={open}
              TransitionComponent={Transition}
              keepMounted
              onClose={handleClose}
            >
              <UserCard hostUsercard={hostUsercard}/>
            </Dialog>
          </div>
          <div style={{display:'block'}}>
       <p> {props.roomQuestion}</p>
       <p> Agreement Rating: {props.agreement}</p>
          </div>

          <div>
            <Avatar onClick={() => getHostUsercard(props.contender)} />
            <Dialog
              open={open}
              TransitionComponent={Transition}
              keepMounted
              onClose={handleClose}
            >
              <UserCard hostUsercard={hostUsercard} />
            </Dialog>
          </div>
</div>

      {/* <div class="inner">
            <p>Live</p>
        </div> */}
      <CardActions disableSpacing style={{ display: 'flex', justifyContent: 'space-between' }}>
        <IconButton aria-label="add to favorites">
          <ThumbUpIcon onClick={
            () => addLikes('likes', props.room_id)
          } />
          <p>{likes}</p>
        </IconButton>
        <IconButton aria-label="share">
          <ThumbDownIcon onClick={() => addLikes('dislikes', props.room_id)} />
          <p>{dislikes}</p>
        </IconButton>
      </CardActions>
    </Card>
  );
}



{/* <Button color="inherit" onClick={handleStatsOpen}>Statistics</Button>
<Dialog fullScreen open={openStats} onClose={handleCloseStats} TransitionComponent={Transition}>
  <IconButton edge="start" color="inherit" onClick={handleCloseStats} aria-label="close">
    <CloseIcon />
  </IconButton>
  <Dashboard />
</Dialog> */}
