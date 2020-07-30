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
insert into room_logs (topic_id, host_id, contender_id, agreement_rating, date_time) values (5, 6, 2, 34, '2019-11-20 18:31:14');
insert into room_logs (topic_id, host_id, contender_id, agreement_rating, date_time) values (3, 5, 8, 99, '2020-05-01 01:35:11');

insert into ratings (from_user_id, to_user_id, rating) values (8, 4, 3);
insert into ratings (from_user_id, to_user_id, rating) values (4, 5, 3);
insert into ratings (from_user_id, to_user_id, rating) values (6, 5, 1);
insert into ratings (from_user_id, to_user_id, rating) values (1, 6, 4);
insert into ratings (from_user_id, to_user_id, rating) values (8, 2, 4);
insert into ratings (from_user_id, to_user_id, rating) values (9, 10, 3);
insert into ratings (from_user_id, to_user_id, rating) values (1, 7, 3);
insert into ratings (from_user_id, to_user_id, rating) values (5, 2, 3);
insert into ratings (from_user_id, to_user_id, rating) values (3, 6, 1);
insert into ratings (from_user_id, to_user_id, rating) values (2, 5, 5);