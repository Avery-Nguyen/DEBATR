const express = require('express')
const router = express.Router()
const {
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
  getCategoryCount
} = require('./databaseCalls.js');

//bcrypt stuff
const bcrypt = require('bcrypt');
const saltRounds = 10;

//cookies session (encrypted, client-side)
const cookieSession = require('cookie-session')
router.use(cookieSession({
  name: 'session',
  keys: [
    'salfkvlsdkvnslvnsvlknsdv',
    'sknalcknfcslkkcvlknmdsclvkmsdvlksdvlk'
  ],

  maxAge: 24 * 60 * 60 * 1000 // 24 hours
})); //setting cookie-session params



//axios request
// - /api/users/ POST
//   - Create an account
// - /api/users/ GET
//   - Retrieve account details for logging in.
// - /api/users/reviews GET
//   - Get user reviews
// - /api/games GET
//   - Retrieve game results


module.exports = (client) => {
  router.get('/rooms', function (req, res) {
    // console.log('REQUEST TO /API/ROOMS')
    getRoomRecords(client)
      .then(sqlResponse => {
        // console.log('SQL Response in to /API/Rooms', sqlResponse)
        res.send(sqlResponse)
      })
      .catch(err => {
        res
          .status(500)
          .json({ error: err.message });
      });
  });

  router.get('/leaderboard', function (req, res) {
    // console.log('REQUEST TO /API/leaderboard')
    getLeaderboard(client)
      .then(sqlResponse => {
        res.send(sqlResponse)
      })
      .catch(err => {
        res
          .status(500)
          .json({ error: err.message });
      });
  });

  router.get('/topiccount', function (req, res) {
    // console.log('REQUEST TO /API/topiccount')
    getTopicCount(client)
      .then(sqlResponse => {
        res.send(sqlResponse)
      })
      .catch(err => {
        res
          .status(500)
          .json({ error: err.message });
      });
  });

  router.get('/categorycount', function (req, res) {
    // console.log('REQUEST TO /API/categorycount')
    getCategoryCount(client)
      .then(sqlResponse => {
        res.send(sqlResponse)
      })
      .catch(err => {
        res
          .status(500)
          .json({ error: err.message });
      });
  });

  router.get('/totaldebates', function (req, res) {
    // console.log('REQUEST TO /API/totaldebates')
    getDebateCount(client)
      .then(sqlResponse => {
        res.send(sqlResponse)
      })
      .catch(err => {
        res
          .status(500)
          .json({ error: err.message });
      });
  });

  router.post('/usercard', function (req, res) {
    // console.log('REQUEST TO /API/usercard')
    // console.log(req.body.host)
    // console.log(res, 'res in usercard')
    getUserCardByID(client, req.body.host)
      .then(sqlResponse => {
        // console.log(sqlResponse.rows, 'inusercard')
        res.send(sqlResponse.rows)
      })
      .catch(err => {
        res
          .status(500)
          .json({ error: err.message });
      });
  });

  router.post('/usercardByName', function (req, res) {
    // console.log('REQUEST TO /API/usercardByName')
    // console.log(req.body.username)
    // console.log(res, 'res in usercard')
    getUserCardByName(client, req.body.username)
      .then(sqlResponse => {
        // console.log(sqlResponse.rows, 'inusercard')
        res.send(sqlResponse.rows)
      })
      .catch(err => {
        res
          .status(500)
          .json({ error: err.message });
      });
  });



  router.post('/users/ratings', function (req, res) {
    const from_user_id = req.body.from_user_id
    const to_user_id = req.body.to_user_id
    const rating = req.body.rating
    const points = req.body.points

    postUserRating(client, {
      from_user_id,
      to_user_id,
      rating,
      points
    }).then(res => {
      return res.rows
    })
  })

  router.post('/likes', function (req, res) {
    const likes = req.body.typeOfLike;
    const room_id = req.body.room_id
    const data = { likes, room_id }

    postLikes(
      client,
      data
    ).then(data => {
      // console.log(res, 'in routes')
      res.send(data)

    })
  })



  router.post('/agreement_ratings', function (req, res) {
    const room_log_id = req.body.room_log_id
    const user_id = req.body.user_id
    const agreement_rating = req.body.agreement_rating

    postAgreementRating(client, {
      room_log_id,
      user_id,
      agreement_rating,
    }).then(res => {
      return res.rows
    })
  })

  router.get('/login/check', function (req, res) {
    // console.log(req.session, 'req body')
    if (req.session.userID) {
      res.json({
        success: true,
        message: "user has successfully authenticated",
        userID: req.session.userID,
        username: req.session.username,
        userAvatarURL: req.session.userAvatarURL
      })
    } else {
      res.json({
        success: false
      })
    }
  })

  router.get('/logout', function (req, res) {
    req.session.userID = null;
    req.session.username = null;
    req.session.userAvatarURL = null;
    return res.send('success')
  })

  router.post('/login', function (req, res) {
    const loginInfo = req.body;
    getUserInfoByEmail(client, loginInfo.email)
      .then(data => {
        // console.log(data, "should be user object")
        const username = data[0].username;
        const userID = data[0].id;
        const password = data[0].password
        const userAvatarURL = data[0].avatar_url

        if (!userID) {
          console.log('error with userID')
          // TODO: Add a 'user does not exist error'
          return res.redirect('login/401');
        }

        return bcrypt.compare(loginInfo.password, password).then(function (result) {

          if (result) {
            req.session.userID = userID;
            req.session.username = username;
            // console.log(userAvatarURL);
            req.session.userAvatarURL = userAvatarURL
            // console.log(req.session, 'req.session in login');
            //  return res.send(data)

            return res.json({
              authenticated: true,
              username,
              userID,
              password,
              userAvatarURL
            })
          } else {
            console.log(error.message, "problem");
          }
        })
          .catch(error => {
            console.log(error.message, "problem");
          })
      })
      .catch(err => {
        return res.json(
          {
            authenticated: false
          }
        )
      })
  })

  router.post('/register', function (req, res) {
    if (req.body.email === "" || req.body.password === "") {
      // TODO: Change this
      return res.redirect('/register/empty');
    }
    // console.log(req.body, 'this is req from register') //  body:
    // { email: 'tthomas@gmail.com',
    //   firstName: 'Trevor',
    //   lastName: 'Thomas',
    //   username: 'tthomas1985',
    //   password: 'password',
    //   avatar: '' },

    // console.log('after checkemail function');
    bcrypt.hash(req.body.password, saltRounds).then(function (hash) {
      // Store hash in your password DB.

      // console.log('after bcrypot')
      createUser(client, req.body.email, req.body.firstName, req.body.lastName, req.body.username, hash, req.body.avatar_url)
        .then((sqlResponse) => {


          res.send(sqlResponse)
        })
        .catch((error) => {
          console.log(error)
        })
    });
  })

  router.get("/categories", function (req, res) {
    client.query(`SELECT * FROM categories;`)
      .then(data => {
        // console.log(data);
        const topics = data.rows;
        res.json({ topics });
      })
      .catch(err => {
        res
          .status(500)
          .json({ error: err.message });
      });
  });

  router.post("/topics", function (req, res) {
    createTopic(client, req.body.question, req.body.category_id)
      .then((sqlResponse) => {
        res.send(sqlResponse)
      })
      .catch((error) => {
        console.log(error)
      })
  });

  return router;
}

