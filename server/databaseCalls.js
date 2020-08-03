
const getRoomRecords = (client, limit = 10) => {
  console.log('INSIDE GET ROOM RECORDS')

  return client.query(`SELECT * FROM room_logs
  JOIN topics ON room_logs.topic_id = topics.id
  ORDER BY room_logs.date_time DESC
  LIMIT $1;
  `, [limit])
  .then((res) => {
    console.log(`res from sql ${res}`)
    return res.rows
  })
}

const postResultsToDatabase = (client, data) => {
  // Get topic ID from room state?

  // Query to get host_id and contender id?
  return client.query(`
  INSERT INTO room_logs (topic_id, host_id, contender_id) 
  VALUES ($1, $2, $3);
  `, [data.topic_id, data.host_id, data.contender_id])
    .then(res => {
      // console.log('Response from SQL', res);
      return res.rows;
    });
}

const postUserRating = (client, data) => {
  return client.query(`
  INSERT INTO ratings (from_user_id, to_user_id, rating, points) 
  VALUES ($1, $2, $3);
  `, [data.from_user_id, data.to_user_id, data.rating, data.points])
    .then(res => {
      // console.log('Response from SQL', res);
      return res.rows;
    });
}

const postAgreementRating = (client, data) => {
  return client.query(`
  INSERT INTO agreement_ratings (room_log_id, user_id, agreement_rating) 
  VALUES ($1, $2, $3);
  `, [data.room_log_id, data.user_id, data.agreement_rating])
    .then(res => {
      // console.log('Response from SQL', res);
      return res.rows;
    });
}

const getUserInfoByEmail = (client, email) => {
  return client.query(`SELECT * FROM users
  WHERE email = $1
  `, [email])
  .then(res => {
    console.log(res.rows)
    return res.rows
  })
}
const checkEmailTaken = (client, email) => {
  client.query(`SELECT * FROM users
  WHERE email = $1
  `, [email])
  .then(res => {
    if (res.rows) {
      return true
    } else {
      return false
    }
  })

}
const createUser = (client, email, first_name, last_name, username, password, avatar_url) => {
  return client.query(`
  INSERT INTO users (first_name, last_name, email, username, password, avatar_url)
  VALUES ($1, $2, $3, $4, $5, $6);
  `, [email, first_name, last_name, username, password, avatar_url])
  .then(res => {
    return res.rows
  })
}


module.exports = {
  postResultsToDatabase, 
  getRoomRecords, 
  postUserRating, 
  postAgreementRating, 
  getUserInfoByEmail, 
  checkEmailTaken, 
  createUser
}