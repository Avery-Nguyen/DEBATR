import React from 'react';
import CssBaseline from '@material-ui/core/CssBaseline';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import VideoChat from '../../VideoChat.js';

export default function Stage() {
  return (
    
    <React.Fragment>
      {/* <CssBaseline /> */}
      <Container style={{
        display: 'flex',
        flexDirection: 'row'
      }}>
        <Typography component="div" style={{ 
             backgroundColor: '#cfe8fc', 
             width: '40%',
             height: '700px'
          }}>
          <VideoChat />
        </Typography>
      </Container>
    </React.Fragment>
  );
}