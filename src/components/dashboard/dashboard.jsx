import React from 'react';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Chart from './Chart';
import TotalDebates from './totalDebates';
import LeaderBoard from './leaderBoard';
import { useStore } from '../../Store';
import UserStats from  './userStats'
import './dashboard.css'

//Likely won't need these but could make for a very interactive stats page
// import Link from '@material-ui/core/Link';
// import MenuIcon from '@material-ui/icons/Menu';
// import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
// import NotificationsIcon from '@material-ui/icons/Notifications';
// import { mainListItems, secondaryListItems } from './listItems';
// import Drawer from '@material-ui/core/Drawer';
// import Box from '@material-ui/core/Box';
// import AppBar from '@material-ui/core/AppBar';
// import Toolbar from '@material-ui/core/Toolbar';
// import List from '@material-ui/core/List';
// import Typography from '@material-ui/core/Typography';
// import Divider from '@material-ui/core/Divider';
// import IconButton from '@material-ui/core/IconButton';
// import Badge from '@material-ui/core/Badge';


const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    backgroundColor: 'rgb(64,81,182)'
  },
  toolbar: {
    paddingRight: 24,
    backgroundColor: 'rgb(64,81,182) !important' // keep right padding when drawer closed
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
    height: 540,
  },
}));

export default function Dashboard() {
  const classes = useStyles();
  const fixedHeightPaper = clsx(classes.paper, classes.fixedHeight);
  const [state, dispatch] = useStore();

  return (

    
    <div className={classes.root} style={{ paddingTop: '0px' }}>
      {/* <h1 style={{
        justifyContent: 'center',
        border: 'solid 1px rgb(64,81,182)',
        color: 'white',
        backgroundColor: 'rgb(64,81,182)',
        padding: '0px 10px'
      }}>Debate Results</h1> */}
     
      <CssBaseline />
      <main className={classes.content} style={{
        display: 'block',
        maxHeight: 'fit-content',
        border: '10px solid rgb(64,81,182)',
        alignItems: 'center',
        marginTop: '-10px'
      }}>
        <div className={classes.appBarSpacer} />
        { state.username ? 
      <UserStats /> : <div> </div>}

      
        {/* <Container maxWidth="lg"  className={classes.container} style={{display:'block'}}> */}
        <h1 align="center" class="margin-spacer" border='solid 8px rgb(64,81,182)'>Overall Stats </h1>

          <article class="stat-container">
          <div class="stat-flex-row">
                <Chart />
                <div class="stat-flex-col">
                <TotalDebates />
                </div>
          </div>
          <div class="stat-flex-row">
                  <LeaderBoard />
            
            </div>
          </article>
          {/* <Grid container spacing={3}>
            <Grid item xs={9} md={8} lg={19}>
              <Paper className={fixedHeightPaper}>
              </Paper>
              <Paper className={fixedHeightPaper}>
              </Paper>
            </Grid>
            <Grid item xs={3} md={4} lg={3}>
            </Grid>
            <div>
              <Grid item xs={22}>
                <Paper className={classes.paper}>
                </Paper>
              </Grid>
            </div>
          </Grid> */}
        {/* </Container> */}
      </main>
    </div>
  );
}