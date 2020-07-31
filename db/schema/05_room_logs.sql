DROP TABLE IF EXISTS room_logs;
CREATE TABLE room_logs (
  id SERIAL PRIMARY KEY NOT NULL,
  topic_id SERIAL NOT NULL REFERENCES topics(id),
  host_id SERIAL NOT NULL REFERENCES users(id),
  contender_id SERIAL NOT NULL REFERENCES users(id),
  video_url VARCHAR(255),
  agreement_rating DECIMAL,
  date_time TIMESTAMP DEFAULT NOW()::timestamp
);

  
