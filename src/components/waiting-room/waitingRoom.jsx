import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Avatar from '@material-ui/core/Avatar';
import UserRating from '../partials/staticRating'
import LinearProgress from '@material-ui/core/LinearProgress';

// From dashboard -----------
// import React from 'react';
import clsx from 'clsx';
// import { makeStyles } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
// import Chart from './Chart';
// import TotalDebates from './totalDebates';
// import Orders from './Orders';

const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
  },
  toolbar: {
    paddingRight: 24, // keep right padding when drawer closed
  },
  toolbarIcon: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    padding: '0 8px',
    ...theme.mixins.toolbar,
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  appBarShift: {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  menuButton: {
    marginRight: 36,
  },
  menuButtonHidden: {
    display: 'none',
  },
  title: {
    flexGrow: 1,
  },
  drawerPaper: {
    position: 'relative',
    whiteSpace: 'nowrap',
    width: drawerWidth,
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  drawerPaperClose: {
    overflowX: 'hidden',
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    width: theme.spacing(7),
    [theme.breakpoints.up('sm')]: {
      width: theme.spacing(9),
    },
  },
  appBarSpacer: theme.mixins.toolbar,
  content: {
    flexGrow: 1,
    height: '100vh',
    overflow: 'auto',
  },
  container: {
    paddingTop: theme.spacing(4),
    paddingBottom: theme.spacing(4),
  },
  paper: {
    padding: theme.spacing(2),
    display: 'flex',
    overflow: 'auto',
    flexDirection: 'column',
  },
  fixedHeight: {
    height: 240,
  },
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
  root: {
    width: '100%',
    '& > * + *': {
      marginTop: theme.spacing(2),
    },
  },
}));

export default function WaitingRoom() {
  const classes = useStyles();
  const fixedHeightPaper = clsx(classes.paper, classes.fixedHeight);

  return (
    <div className={classes.root}>
      <CssBaseline />
      <main className={classes.content}>
      <div className={classes.appBarSpacer} />
      <Container maxWidth="lg" className={classes.container}>
      <Card className={classes.root} style={{ 
        width: "100%"
         }} >
        <CardContent>
          <Typography className={classes.title} color="textSecondary" gutterBottom>
            <h3 style={{zIndex: "1"}}> Waiting for oppponent...</h3>
          </Typography>
          <LinearProgress color="secondary" style={{borderRadius: "150%"}}/>
          <LinearProgress style={{borderRadius: "140%"}}/>
          <LinearProgress color="secondary" style={{borderRadius: "130%"}}/>
          <LinearProgress style={{borderRadius: "120%"}}/>
          <LinearProgress color="secondary" style={{borderRadius: "110%"}}/>
          <LinearProgress style={{borderRadius: "100%"}}/>
          <LinearProgress color="secondary" style={{borderRadius: "90%"}}/>
          <LinearProgress style={{borderRadius: "80%"}}/>
          <LinearProgress color="secondary" style={{borderRadius: "70%"}}/>
          <LinearProgress style={{borderRadius: "60%"}}/>
          <LinearProgress color="secondary" style={{borderRadius: "50%"}}/>
          <LinearProgress style={{borderRadius: "40%"}}/>
          <LinearProgress color="secondary" style={{borderRadius: "30%"}}/>
          <LinearProgress style={{borderRadius: "20%"}}/>
          <LinearProgress color="secondary" style={{borderRadius: "20%"}}/>
          <LinearProgress style={{borderRadius: "30%"}}/>
          <LinearProgress color="secondary" style={{borderRadius: "40%"}}/>
          <LinearProgress style={{borderRadius: "50%"}}/>
          <LinearProgress color="secondary" style={{borderRadius: "60%"}}/>
          <LinearProgress style={{borderRadius: "70%"}}/>
          <LinearProgress color="secondary" style={{borderRadius: "80%"}}/>
          <LinearProgress style={{borderRadius: "90%"}}/>
          <LinearProgress color="secondary" style={{borderRadius: "100%"}}/>
          <LinearProgress style={{borderRadius: "110%"}}/>
          <LinearProgress color="secondary" style={{borderRadius: "120%"}}/>
          <LinearProgress style={{borderRadius: "130%"}}/>
          <LinearProgress color="secondary" style={{borderRadius: "140%"}}/>
          <LinearProgress style={{borderRadius: "150%"}}/>
        </CardContent>
      </Card>
      </Container>
    </main>
    </div>
  );
}

// const useStyles = makeStyles((theme) => ({
//   root: {
//     minWidth: 275,
//     zIndex: '3'
//   },
//   bullet: {
//     display: 'inline-block',
//     margin: '0 2px',
//     transform: 'scale(0.8)',
//   },
//   title: {
//     fontSize: 14,
//   },
//   pos: {
//     marginBottom: 12,
//   },
//   root: {
//     width: '100%',
//     '& > * + *': {
//       marginTop: theme.spacing(2),
//     },
//   },
// }));

// export default function WaitingRoom() {
//   const classes = useStyles();

//   return (
//     <main>
//       <Card className={classes.root} style={{ 
//         // border: "solid black 1px", 
//         width: "300px",
//          }} >
//         <CardContent>
//           <Typography className={classes.title} color="textSecondary" gutterBottom>
//             <h3> Waiting for oppponent</h3>
//           </Typography>
//           <LinearProgress />
//           <LinearProgress color="secondary" />
//         </CardContent>
//         {/* <CardActions>
//         <Button size="small">Links to social accounts?</Button>
//       </CardActions> */}
//       </Card>
//     </main>
//   );
// }