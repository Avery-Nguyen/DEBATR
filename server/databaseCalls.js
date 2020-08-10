
const getRoomRecords = (client, limit = 10) => {
  // console.log('INSIDE GET ROOM RECORDS')
  // console.log('insideRoomRecords')

  return client.query(`SELECT room_logs.*, ROUND(AVG(agreement_ratings.agreement_rating),0) AS agreement_rating, topics.question, host.username AS host_name, contender.username AS contender_name, host.avatar_url AS host_avatar, contender.avatar_url AS contender_avatar
  FROM room_logs
  JOIN topics ON room_logs.topic_id = topics.id
  JOIN agreement_ratings on room_logs.id = agreement_ratings.room_log_id
  JOIN users AS Host ON room_logs.host_id = Host.id
  JOIN users AS Contender ON room_logs.contender_id = Contender.id
  GROUP BY room_logs.id, topics.question, host.username, contender.username, host.avatar_url, contender.avatar_url
  ORDER BY room_logs.date_time DESC
  limit $1;
  `, [limit])
    .then((res) => {
      // console.log(`res from sql ${res}`)
      return res.rows
    })
    .catch(err => console.log(err))
}

const getLeaderboard = (client, limit = 10) => {

  return client.query(`SELECT  users.username, SUM(agreement_ratings.agreement_rating) FROM users 
  JOIN agreement_ratings ON users.id = agreement_ratings.user_id
  GROUP BY users.username
  ORDER BY sum DESC
  LIMIT $1;
  `, [limit])
    .then((res) => {
      // console.log(`res from sql ${res}`)
      return res.rows
    })
}

const getDebateCount = (client) => {
  return client.query(`select count(*) from room_logs;`)
    .then((res) => {
      // console.log(`res from sql ${res}`)
      return res.rows
    })
}

const getTopicCount = (client, limit = 10) => {
  return client.query(`SELECT question , COUNT(question) AS topic_count
  FROM topics
  JOIN room_logs ON room_logs.topic_id = topics.id 
  GROUP BY question, room_logs.topic_id
  ORDER BY topic_count desc
  LIMIT $1;`, [limit])
  .then((res) => {
    // console.log(`res from sql ${res}`)
    return res.rows
  })
}

const getCategoryCount = (client) => {
  return client.query(`select categories.name, COUNT(categories.id) 
  from room_logs 
  join topics on topics.id = room_logs.topic_id
  join categories on categories.id = topics.category_id
  GROUP BY categories.id;`)
  .then((res) => {
    // console.log(`res from sql ${res}`)
    return res.rows
  })
}

const getUserCardByID = (client, id) => {
  return client.query(`SELECT username, avatar_url, avg(ratings.points) as points_avg, avg(ratings.rating) AS rating_avg, COUNT(host.host_id) as host_count, COUNT(contender.contender_id) as contender_count
  FROM users
  JOIN ratings ON ratings.to_user_id = users.id
  JOIN room_logs AS host ON users.id = host.host_id
  JOIN room_logs AS contender ON users.id = contender.contender_id
  WHERE users.id = $1
  group by username, avatar_url;`, [id])
  .then((res) => {
    // console.log(`res from sql ${res}`)
    return res
  })
}

const getUserCardByName = (client, username) => {
  // console.log(username)
  return client.query(`SELECT username, avg(ratings.points) as points_avg, avg(ratings.rating) AS rating_avg, COUNT(host.host_id) as host_count, COUNT(contender.contender_id) as contender_count
  FROM users
  JOIN ratings ON ratings.to_user_id = users.id
  JOIN room_logs AS host ON users.id = host.host_id
  JOIN room_logs AS contender ON users.id = contender.contender_id
  WHERE users.username = $1
  group by username;`, [username])
  .then((res) => {
    // console.log(`res from sql ${res}`)
    return res
  })
}

const postResultsToDatabase = (client, data) => {
  // Get topic ID from room state?

  // Query to get host_id and contender id?
  return client.query(`
  INSERT INTO room_logs (topic_id, host_id, contender_id) 
  VALUES ($1, $2, $3)
  RETURNING *;
  `, [data.topic_id, data.host_id, data.contender_id])
    .then(res => {
      // console.log('Response from SQL', res);
      return res.rows;
    });
}

const postLikes = (client, data) => {
  // Get topic ID from room state?
  // console.log(data, 'data in postLikes');
  // console.log(data.likes)

  if (data.likes === 'likes') {
    return client.query(`
  UPDATE room_logs 
  SET likes = likes + 1
  WHERE id = $1
  RETURNING *;
  `, [data.room_id])
      .then(res => {
        // console.log('Response from SQL', res.rows);
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
        // console.log('Response from SQL', res.rows);
        return res.rows;
      });
  }
}


const postUserRating = (client, data) => {
  return client.query(`
  INSERT INTO ratings (from_user_id, to_user_id, rating, points) 
  VALUES ($1, $2, $3, $4);
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
      console.log(res.rows, 'this is res.rows')
      if (res.rows && res.rows[0]) {
        return true
      } else {
        return false
      }
    })

}
const createUser = (client, email, first_name, last_name, username, password, avatar_url) => {
  // console.log(client, email, first_name, last_name, username, password, avatar_url);
  return client.query(`
  INSERT INTO users (first_name, last_name, email, username, password, avatar_url)
  VALUES ($1, $2, $3, $4, $5, $6)
  RETURNING *;
  `, [first_name, last_name, email, username, password, avatar_url])
    .then(res => {
      return res.rows
    })
}
const createGithubUser = (client, email, first_name, last_name, username, avatar_url) => {
  // NOT GETTING EMAIL BACK FROM GITHUB
  return client.query(`
  INSERT INTO users (first_name, last_name, email, username, password, avatar_url)
  VALUES ($1, $2, $3, $4, $5, $6)
  RETURNING *;
  `, ['git', 'hub', email, username, 'pass', avatar_url])
    .then(res => {
      return res.rows[0]
    })
}


const createTopic = (client, question, categoryID) => {
  return client.query(`
  INSERT INTO topics (question, category_id) VALUES ($1, $2)
  RETURNING *;
  `, [question, categoryID])
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
  postLikes,
  getUserCardByID,
  createTopic,
  getUserCardByName,
  getTopicCount,
  getCategoryCount,
  createGithubUser
}