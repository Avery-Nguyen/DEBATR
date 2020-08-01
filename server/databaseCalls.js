const client = require('./db.js');

// - Our database routes
// - /api/games/ POST
//   - Post game records after results are in
// - /api/games GET
//   - Retrieve game results
// - /api/users/ POST
//   - Create an account
// - /api/users/ GET
//   - Retrieve account details for logging in.
// - /api/users/reviews POST
//   - Post user reviews after game
// - /api/users/reviews GET
//   - Get user reviews

const getGameRecords = (limit = 10) => {
  return client.query(`SELECT * FROM room_logs
  JOIN topics ON room_logs.topic_id = topics.id
  ORDER BY room_logs.date_time DESC
  LIMIT $1;
  `, [limit])
  .then(res => {
    return res.rows
  })
}

const postResultsToDatabase = (data) => {
  // Get topic ID from room state?

  // Query to get host_id and contender id?
  return client.query(`
  insert into room_logs (topic_id, host_id, contender_id) 
  VALUES ($1, $2, $3);
  `, [data.topic_id, data.host_id, data.contender_id])
    .then(res => {
      // console.log('Response from SQL', res);
      return res.rows;
    });
}
export default {
  postResultsToDatabase
}