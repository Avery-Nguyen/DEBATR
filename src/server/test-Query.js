//This is a pretty straight-forward query

const express = require('express');
const router  = express.Router();

module.exports = (db) => {
  router.get("/", (req, res) => {
    db.query(`SELECT * FROM users;`)
    .then(data => {
      const users = data.rows;
      res.json({ users });
    })
    .catch(err => {
      res
          .status(500)
          .json({ error: err.message });
      });
  });
  router.get("/:user_id", (req, res) => {
    const user_id = req.params.user_id;
    db.query(`SELECT * FROM users WHERE id = $1;`, [user_id])
    .then(data => {
      const users = data.rows;
      res.json({ users });
    })
    .catch(err => {
      res
          .status(500)
          .json({ error: err.message });
      });
  });

  return router;
};