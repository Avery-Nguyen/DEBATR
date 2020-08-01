insert into users (first_name, last_name, email, username, password, salt_hash, avatar_url) values ('Quill', 'Denes', 'qdenes0@pen.io', 'qdenes0', 'RYqGhw', '457', 'https://robohash.org/facilisquiaquo.jpg?size=50x50&set=set1');
insert into users (first_name, last_name, email, username, password, salt_hash, avatar_url) values ('Claudianus', 'Karle', 'ckarle1@usnews.com', 'ckarle1', 'RBixnarR', '21', 'https://robohash.org/eaquiaeius.png?size=50x50&set=set1');
insert into users (first_name, last_name, email, username, password, salt_hash, avatar_url) values ('Svend', 'McMahon', 'smcmahon2@nasa.gov', 'smcmahon2', 'zmjzom', '9331', 'https://robohash.org/rerumsintpossimus.bmp?size=50x50&set=set1');
insert into users (first_name, last_name, email, username, password, salt_hash, avatar_url) values ('Matelda', 'Ervin', 'mervin3@reverbnation.com', 'mervin3', 'KZPSJhuQhjK', '42896', 'https://robohash.org/etnostrumnatus.jpg?size=50x50&set=set1');
insert into users (first_name, last_name, email, username, password, salt_hash, avatar_url) values ('Tarrance', 'Magauran', 'tmagauran4@fema.gov', 'tmagauran4', 'vAENwXkos', '3926', 'https://robohash.org/nihilasperioreshic.jpg?size=50x50&set=set1');
insert into users (first_name, last_name, email, username, password, salt_hash, avatar_url) values ('Lynda', 'Takkos', 'ltakkos5@twitter.com', 'ltakkos5', 'U3thFF', '070', 'https://robohash.org/impeditsolutaut.jpg?size=50x50&set=set1');
insert into users (first_name, last_name, email, username, password, salt_hash, avatar_url) values ('Olive', 'Nijssen', 'onijssen6@comsenz.com', 'onijssen6', 'zx0co1ZSROEU', '10', 'https://robohash.org/totamrationeab.png?size=50x50&set=set1');
insert into users (first_name, last_name, email, username, password, salt_hash, avatar_url) values ('Elton', 'Ochterlony', 'eochterlony7@quantcast.com', 'eochterlony7', 'iB9g6oFKKDHl', '2', 'https://robohash.org/etsintest.bmp?size=50x50&set=set1');
insert into users (first_name, last_name, email, username, password, salt_hash, avatar_url) values ('Arnuad', 'Foulis', 'afoulis8@etsy.com', 'afoulis8', 'n9Ewi3i', '073', 'https://robohash.org/omnisfacilisnam.bmp?size=50x50&set=set1');
insert into users (first_name, last_name, email, username, password, salt_hash, avatar_url) values ('Torre', 'Keaves', 'tkeaves9@census.gov', 'tkeaves9', '25Ta6s0VZ2', '8015', 'https://robohash.org/cumquibusdamest.jpg?size=50x50&set=set1');


INSERT INTO categories (name) VALUES ('Foods');
INSERT INTO categories (name) VALUES ('Sports');
INSERT INTO categories (name) VALUES ('Entertainment');
INSERT INTO categories (name) VALUES ('Politics');
INSERT INTO categories (name) VALUES ('Others');



INSERT INTO topics (question, category_id) VALUES ('Hockey is the Best Sport', 2);
INSERT INTO topics (question, category_id) VALUES ('Frank''s Hot Sauce is the best', 1);
INSERT INTO topics (question, category_id) VALUES ('Kanye West will be the best President', 3);
INSERT INTO topics (question, category_id) VALUES ('Crocs are the Best', 4);


insert into room_logs (topic_id, host_id, contender_id, agreement_rating, date_time) values (2, 9, 1, 17, '2020-01-09 05:35:19');
insert into room_logs (topic_id, host_id, contender_id, agreement_rating, date_time) values (4, 1, 4, 45, '2020-07-27 17:30:41');
insert into room_logs (topic_id, host_id, contender_id, agreement_rating, date_time) values (1, 3, 2, 75, '2019-12-18 22:16:10');
insert into room_logs (topic_id, host_id, contender_id, agreement_rating, date_time) values (4, 2, 3, 58, '2019-08-06 13:58:08');
insert into room_logs (topic_id, host_id, contender_id, agreement_rating, date_time) values (1, 4, 9, 53, '2019-10-17 16:26:05');
insert into room_logs (topic_id, host_id, contender_id, agreement_rating, date_time) values (4, 6, 2, 34, '2019-11-20 18:31:14');
insert into room_logs (topic_id, host_id, contender_id, agreement_rating, date_time) values (3, 5, 8, 99, '2020-05-01 01:35:11');

insert into ratings (from_user_id, to_user_id, rating, points) values (4, 5, 1, 28);
insert into ratings (from_user_id, to_user_id, rating, points) values (3, 6, 1, 26);
insert into ratings (from_user_id, to_user_id, rating, points) values (6, 6, 3, 46);
insert into ratings (from_user_id, to_user_id, rating, points) values (4, 6, 2, 4);
insert into ratings (from_user_id, to_user_id, rating, points) values (10, 7, 4, 91);
insert into ratings (from_user_id, to_user_id, rating, points) values (8, 9, 2, 42);
insert into ratings (from_user_id, to_user_id, rating, points) values (1, 3, 4, 52);
insert into ratings (from_user_id, to_user_id, rating, points) values (10, 9, 4, 81);
insert into ratings (from_user_id, to_user_id, rating, points) values (8, 5, 2, 51);
insert into ratings (from_user_id, to_user_id, rating, points) values (5, 8, 4, 22);
insert into ratings (from_user_id, to_user_id, rating, points) values (10, 4, 5, 78);
insert into ratings (from_user_id, to_user_id, rating, points) values (5, 3, 4, 50);
insert into ratings (from_user_id, to_user_id, rating, points) values (7, 2, 3, 50);
insert into ratings (from_user_id, to_user_id, rating, points) values (1, 7, 2, 98);
insert into ratings (from_user_id, to_user_id, rating, points) values (9, 8, 3, 55);
insert into ratings (from_user_id, to_user_id, rating, points) values (2, 2, 4, 51);
insert into ratings (from_user_id, to_user_id, rating, points) values (2, 1, 5, 69);
insert into ratings (from_user_id, to_user_id, rating, points) values (10, 4, 3, 50);
insert into ratings (from_user_id, to_user_id, rating, points) values (3, 3, 2, 3);
insert into ratings (from_user_id, to_user_id, rating, points) values (9, 5, 3, 85);



insert into agreement_ratings (room_log_id, user_id, agreement_rating) values (1, 9, 66);
insert into agreement_ratings (room_log_id, user_id, agreement_rating) values (1, 10, 5);
insert into agreement_ratings (room_log_id, user_id, agreement_rating) values (2, 8, 46);
insert into agreement_ratings (room_log_id, user_id, agreement_rating) values (2, 5, 16);
insert into agreement_ratings (room_log_id, user_id, agreement_rating) values (3, 10, 31);
insert into agreement_ratings (room_log_id, user_id, agreement_rating) values (3, 2, 5);
insert into agreement_ratings (room_log_id, user_id, agreement_rating) values (4, 2, 26);
insert into agreement_ratings (room_log_id, user_id, agreement_rating) values (4, 4, 49);
insert into agreement_ratings (room_log_id, user_id, agreement_rating) values (5, 10, 78);
insert into agreement_ratings (room_log_id, user_id, agreement_rating) values (5, 5, 77);
insert into agreement_ratings (room_log_id, user_id, agreement_rating) values (6, 3, 3);
insert into agreement_ratings (room_log_id, user_id, agreement_rating) values (6, 1, 86);
insert into agreement_ratings (room_log_id, user_id, agreement_rating) values (7, 4, 68);
insert into agreement_ratings (room_log_id, user_id, agreement_rating) values (7, 5, 15);