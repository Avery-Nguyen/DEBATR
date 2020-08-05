
const getRoomRecords = (client, limit = 10) => {
  console.log('INSIDE GET ROOM RECORDS')

  return client.query(`SELECT room_logs.*, sum(agreement_ratings.agreement_rating) AS agreement_rating, topics.question, host.username AS host_name, contender.username AS contender_name 
  FROM room_logs
  JOIN topics ON room_logs.topic_id = topics.id
  JOIN agreement_ratings on room_logs.id = agreement_ratings.room_log_id
  JOIN users AS Host ON room_logs.host_id = Host.id
  JOIN users AS Contender ON room_logs.contender_id = Contender.id
  GROUP BY room_logs.id, topics.question, host.username, contender.username 
  ORDER BY room_logs.date_time DESC
  limit $1;
  `, [limit])
    .then((res) => {
      console.log(`res from sql ${res}`)
      return res.rows
    })
}

const getLeaderboard = (client, limit = 10) => {

  return client.query(`SELECT  users.username, SUM(agreement_ratings.agreement_rating) FROM users 
  JOIN agreement_ratings ON users.id = agreement_ratings.user_id
  GROUP BY users.username
  ORDER BY sum DESC
  LIMIT $1;
  `, [limit])
    .then((res) => {
      console.log(`res from sql ${res}`)
      return res.rows
    })
}

const getDebateCount = (client) => {
  return client.query(`select count(*) from room_logs;`)
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

const postLikes = (client, data) => {
  // Get topic ID from room state?
  console.log(data, 'data in postLikes');
  console.log(data.likes)

  if (data.likes === 'likes') {
    return client.query(`
  UPDATE room_logs 
  SET likes = likes + 1
  WHERE id = $1
  RETURNING *;
  `, [data.room_id])
      .then(res => {
        console.log('Response from SQL', res.rows);
        return res.rows;
      });
  }

  if (data.likes === 'dislikes') {
    return client.query(`
   UPDATE room_logs 
   SET dislikes = dislikes + 1
   WHERE id = $1
   RETURNING *;
   `, [data.room_id])
      .then(res => {
        console.log('Response from SQL', res.rows);
        return res.rows;
      });
  }
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
      // console.log(res);
      // console.log(res.rows, "empty array?")
      return res.rows
    })
}

const checkEmailTaken = (client, email) => {
  // console.log(email)
  return client.query(`SELECT * FROM users
  WHERE email = $1
  `, [email])
    .then(res => {
      if (res.rows) {
        console.log(res.rows, 'this is res.rows')
        return true
      } else {
        return false
      }
    })

}
const createUser = (client, email, first_name, last_name, username, password, avatar_url) => {
  console.log(client, email, first_name, last_name, username, password, avatar_url);
  return client.query(`
  INSERT INTO users (first_name, last_name, email, username, password, avatar_url)
  VALUES ($1, $2, $3, $4, $5, $6)
  RETURNING *;
  `, [first_name, last_name, email, username, password, avatar_url])
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
  createUser,
  getLeaderboard,
  getDebateCount,
  postLikes
}