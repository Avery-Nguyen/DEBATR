
const postResultsToDatabase = () => {
  return db.query(`
  insert into room_logs (topic_id, host_id, contender_id, agreement_rating) 
  VALUES ($1, $2, $3, $4);
  `, [this.topic, host_id, contender_id, this.agreement_rating])
    .then(res => {
      // console.log('Response from SQL', res);
      return res.rows;
    });
}
export default {
  postResultsToDatabase
}