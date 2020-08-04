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
  getDebateCount
} = require('./databaseCalls.js');

//bcrypt stuff
const bcrypt = require('bcrypt');
const saltRounds = 10;



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

  router.get('/leaderboard', function(req, res) {
    console.log('REQUEST TO /API/leaderboard')
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

  router.get('/totaldebates', function(req, res) {
    console.log('REQUEST TO /API/totaldebates')
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

  router.post('/login', function(req, res) {
    console.log('login route hit')
    // console.log(req.body)
    const loginInfo = req.body;
    // console.log(loginInfo.password);
    getUserInfoByEmail(client, loginInfo.email)
      .then(data => {
        console.log(data, "should be user object")
        userID = data[0].username;
        password = data[0].password
        console.log(data[0].username)
        console.log(data[0].password)

        if (!userID) {
          console.log('error with userID')
          // TODO: Add a 'user does not exist error'
          return res.redirect('login/401');
        }
        console.log('are we making it here?')
        console.log(loginInfo.password, 'login password');
        console.log(password)
        bcrypt.compare(loginInfo.password, password).then(function(result) {
          // result == true
          console.log(result, 'this is bcrypt result')
        })
          // .then((data) => {
          //   console.log('this is before bcrypt compare')
          //   console.log(result)
          // })


          .catch(error => {
            console.log(error.message, "problem");
          })
        // if (result) {
        //   console.log('this is result from bcrypt compare', result)
        //   req.session.userID = userID;
        //   console.log(userID, "userID in routes")
        //   return res.send(data)
        //   // return res.redirect('/')

        // } else {
        //   // TODO: Add a incorrect login page or something
        //   return res.redirect('login/401');
        // }
      });


  })

  // router.post('/register', (req, res) => {
  //   console.log(req.body)
  //   const username = req.body.username;
  //   const email = req.body.email;
  //   const password = req.body.password;
  //   const hashedPassword = bcrypt.hash(password, 10);
  //   const newUser = {
  //     id,
  //     email,
  //     hashedPassword
  //   };

  //   if (!email || !password) {
  //     res.status(400);
  //     res.send("this thing dun did broke");
  //   }

  //   for (const userId in users) {

  //     if (users[userId].email === email) {
  //       res.status(400);
  //       return res.send("there is a problem, that email already exists");
  //     }
  //   }

  //   users[id] = newUser;
  //   req.session.userid = id;
  //   return res.redirect('/');
  // });


  router.post('/register', function(req, res) {
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

    console.log('after checkemail function');
    bcrypt.hash(req.body.password, saltRounds).then(function(hash) {
      // Store hash in your password DB.

console.log('after bcrypot')
    createUser(client, req.body.email, req.body.firstName, req.body.lastName, req.body.username, hash, req.body.avatar_url)
      .then((sqlResponse) => {
        console.log('after create user');
        // console.log(sqlResponse.rows)
        // Need to assign cookie
        // req.session.userID = sqlResponse.rows;

        res.send(sqlResponse)
      })
      .catch((error) => {
        console.log(error)
      })
    });
  })

  return router;
}

