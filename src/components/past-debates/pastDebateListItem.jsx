import React, { useState } from 'react';
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


// import getRoomRecords from '../../server/databaseCalls'
import Stage from '../stage/stage'

const useStyles = makeStyles((theme) => ({
  root: {
    maxWidth: 345,
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
  const [openStage, setOpenStage] = React.useState(false);
  const handleClickOpenStage = () => {
    setOpenStage(true);
  };
  const handleCloseStage = () => {
    setOpenStage(false);
  };



  // console.log(getRoomRecords());

  // pastDebates = getRoomRecords();

  // pastDebates.map((e) => 
  // )

  return (
    <Card className={classes.root} style={{ border: "solid rgb(255,107,107) 3px", backgroundColor: "rgb(241,241,241)", borderRadius: "30px", marginLeft: '5px', justifySelf: 'center' }}>
      <CardHeader
        avatar={
          <div>
            <Avatar onClick={handleClickOpen} />
            <Dialog
              open={open}
              TransitionComponent={Transition}
              keepMounted
              onClose={handleClose}
            >
              <UserCard />
            </Dialog>
          </div>
        }
        title={props.roomQuestion}
        subheader={"Agreement Rating: " + props.agreement}
        avatar={
          <div>
            <Avatar onClick={handleClickOpen} img="test" />
            <Dialog
              open={open}
              TransitionComponent={Transition}
              keepMounted
              onClose={handleClose}
            >
              <UserCard />
            </Dialog>
          </div>
        }
      />
      <CardActions disableSpacing style={{display:'flex', justifyContent:'space-between'}}>
        <IconButton aria-label="add to favorites">
          <ThumbUpIcon />
          <p>78</p>
        </IconButton>

        <Button variant="contained"
          style={{ color: "white", backgroundColor: "rgb(64,81,182)", justifySelf: 'right', borderRadius: "30px", display: "flex", justifyContent: "center" }}
          onClick={() => console.log('url callback will go here')}>
          Watch
          </Button>
          <IconButton aria-label="share">
          <ThumbDownIcon />
          <p>5</p>
        </IconButton>

        <Dialog fullScreen open={openStage} TransitionComponent={Transition}>
          <Stage />
          <IconButton edge="start" color="inherit" onClick={handleCloseStage} aria-label="close">
            <CloseIcon />
          </IconButton>
        </Dialog>

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