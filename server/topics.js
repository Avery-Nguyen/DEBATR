const express = require('express');
const router  = express.Router();

module.exports = (db) => {
  router.get("/topics", (req, res) => {
    db.query(`SELECT * FROM topics;`)
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
  return router;
};

  