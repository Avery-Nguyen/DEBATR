import React from 'react';
import Rating from '@material-ui/lab/Rating';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';


//will need to pass props from db for user rating
//rounds up, might want to have (actual rating) beside the stars

export default function UserRating() {
  const [value, setValue] = React.useState(2);

  return (
    <div>
      <Box component="fieldset" mb={3} borderColor="transparent">
        {/* <Typography component="legend">User Rating</Typography> */}
        <Rating name="read-only" value={3.5} readOnly/>
      </Box>
    </div>
  );
}