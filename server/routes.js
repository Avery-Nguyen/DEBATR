const express = require('express')
const router = express.Router()
const {
  postResultsToDatabase,
  getRoomRecords,
  postUserRating,
  postAgreementRating,
  getUserInfoByEmail,
  checkEmailTaken,
  createUser } = require('./databaseCalls.js');
const bcrypt = require('bcrypt');



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
  router.get('/rooms', function(req, res) {
    console.log('REQUEST TO /API/ROOMS')
    getRoomRecords(client)
      .then(sqlResponse => {
        res.send(sqlResponse)
      })
      .catch(err => {
        res
          .status(500)
          .json({ error: err.message });
      });
  });


  router.get('/host', function(req, res) {
    console.log('REQUEST TO /API/ROOMS')
    getHostRecords(client)
      .then(sqlResponse => {
        res.send(sqlResponse)
      })
      .catch(err => {
        res
          .status(500)
          .json({ error: err.message });
      });
  });

  router.post('/users/ratings', function(req, res) {
    const from_user_id = req.body.from_user_id
    const to_user_id = req.body.to_user_id
    const rating = req.body.rating
    const points = req.body.points

    postUserRating({
      from_user_id,
      to_user_id,
      rating,
      points
    }).then(res => {
      return res.rows
    })
  })

  router.post('/agreement_ratings', function(req, res) {
    const room_log_id = req.body.room_log_id
    const user_id = req.body.user_id
    const agreement_rating = req.body.agreement_rating

    postAgreementRating({
      room_log_id,
      user_id,
      agreement_rating,
    }).then(res => {
      return res.rows
    })
  })

  router.get('/login', function(req, res) {
    const loginInfo = req.body;
    const userID = getUserInfoByEmail(loginInfo.email);

    if (!userID) {
      // TODO: Add a 'user does not exist error'
      return res.redirect('login/401');
    }

    bcrypt.compare(loginInfo.password, userID.password, function(err, result) {
      if (result) {
        req.session.userID = userID;
        return res.redirect('/urls');
      } else {
        // TODO: Add a incorrect login page or something
        return res.redirect('login/401');
      }
    });
  })

  router.post('/users', function(req, res) {
    if (req.body.email === "" || req.body.password === "") {
      // TODO: Change this
      return res.redirect('/register/empty');
    }

    if (checkEmailTaken(req.body.email)) {
      // TODO: Change this
      return res.redirect('/register/taken');
    }

    createUser(req.body.email, req.body.first_name, req.body.last_name, req.body.username, req.body.password, req.body.avatar_url)
      .then((sqlResponse) => {
        console.log(sqlResponse.rows)
        // Need to assign cookie
        // req.session.userID = sqlResponse.rows;

        res.send(sqlResponse)
      })
  })

  return router;
}

