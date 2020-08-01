DROP TABLE IF EXISTS users CASCADE;
CREATE TABLE users (
  id SERIAL PRIMARY KEY NOT NULL,
  email VARCHAR(255) NOT NULL,
  first_name TEXT NOT NULL,
  last_name TEXT NOT NULL,
  username VARCHAR(255) NOT NULL,
  password VARCHAR(255) NOT NULL,
  salt_hash VARCHAR(255) NOT NULL,
  avatar_url VARCHAR(255),
  is_admin BOOLEAN DEFAULT FALSE,
  is_active BOOLEAN DEFAULT TRUE
);

DROP TABLE IF EXISTS categories CASCADE;
CREATE TABLE categories (
  id SERIAL PRIMARY KEY NOT NULL,
  name TEXT NOT NULL
);

DROP TABLE IF EXISTS topics CASCADE;
CREATE TABLE topics (
  id SERIAL PRIMARY KEY NOT NULL,
  question TEXT NOT NULL,
  category_id SERIAL NOT NULL REFERENCES categories(id)
);

DROP TABLE IF EXISTS ratings CASCADE;
CREATE TABLE ratings (
  id SERIAL PRIMARY KEY NOT NULL,
  from_user_id SERIAL NOT NULL REFERENCES users(id),
  to_user_id SERIAL NOT NULL REFERENCES users(id),
  rating SMALLINT NOT NULL
);

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

  