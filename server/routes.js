const express = require('express')
const router = express.Router()
const { postResultsToDatabase, getRoomRecords, postUserRating, postAgreementRating } = require('./databaseCalls.js');
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


router.get('/rooms', function(req, res) {
  getRoomRecords()
    .then(sqlResponse => {
      res.send(sqlResponse)
    })
})

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

router.get('/users', function (req,res) {
  const loginInfo = req.body;
  const userID = getUserByEmail(loginInfo.email);

  if (!userID) {
    // TODO: Add a 'user does not exist error'
    return res.redirect('login/401');
  }
  
  bcrypt.compare(loginInfo.password, users[userID].password, function(err, result) {
    if (result) {
      req.session.userID = userID;
      return res.redirect('/urls');
    } else {
      return res.redirect('login/401');
    }
  });


})


