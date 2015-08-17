PRAGMA foreign_key = ON;
DROP TABLE IF EXISTS articles;
DROP TABLE IF EXISTS comments;

CREATE TABLE articles (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  user_name VARCHAR,
  timestamp DATE DEFAULT (datetime('now','localtime')),
  title VARCHAR,
  img_url VARCHAR, 
  body  TEXT,  
  up_votes INTEGER,
  down_votes INTEGER,
  twitter_id VARCHAR
 );

CREATE TABLE comments (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  comment_user_name VARCHAR,
  timestamp DATE DEFAULT (datetime('now','localtime')),
  comment_text TEXT,
  article_id INTEGER,
  up_votes INTEGER,
  down_votes INTEGER,
  FOREIGN KEY(article_id) REFERENCES articles(id)
);



-- articles
INSERT INTO articles (user_name, img_url, title, body, up_votes, down_votes, twitter_id) VALUES ('joe','joes thoughts','https://i.scdn.co/image/2744f9fb06f97b5133e523f69bccd0c838dc10c3','i have thoughts',2, 4, 'joe_rawks');
INSERT INTO articles (user_name, img_url, title, body, up_votes, down_votes, twitter_id) VALUES ('bob','bobs thoughts', 'https://i.scdn.co/image/0fa06ced09a799f78629a2ee354dc294f7513940','i have profound feelings and thoughts', 2, 4, 'bob_rawks');
INSERT INTO articles (user_name, img_url, title, body, up_votes, down_votes, twitter_id) VALUES ('human','I so want that hair omg', 'https://i.scdn.co/image/16b9f09ff598f51eb972a7d536c83f8efc78027f','i am full of emoshe and thoughts', 8, 8, 'rockin_it_4_ev');
INSERT INTO articles (user_name, img_url, title, body, up_votes, down_votes, twitter_id) VALUES ('human','This Image is Calming to me', 'https://i.scdn.co/image/5e3a3672ec50e9ceae4b44d56218fc68f77a8a34', 'i have feelings', 11, 1, 'all_day_all_night');
INSERT INTO articles (user_name, img_url, title, body, up_votes, down_votes, twitter_id) VALUES ('human','Classic', 'https://i.scdn.co/image/f9480fa8e952934bc68a81a30bfc283466aa29e7','i have heart and beats',2,2, 'hashtag_WINNER');
INSERT INTO articles (user_name, img_url, title, body, up_votes, down_votes, twitter_id) VALUES ('human','BSB', 'https://i.scdn.co/image/9e108119497bc6b89d69c3e214bbb26a1651fa86','i feel all day 24/7', 0,0, 'whos_boss?');
INSERT INTO articles (user_name, img_url, title, body, up_votes, down_votes, twitter_id) VALUES ('human','Damn Ben', 'https://i.scdn.co/image/12726712c0722d0db66896ac121f6bdeab4aceda','feelins', 7,0, 'Yusosexy');
INSERT INTO articles (user_name, img_url, title, body, up_votes, down_votes, twitter_id) VALUES ('human','Beejus Cripes', 'https://i.scdn.co/image/6269984c9d67419f473a0cfbe2b97290cd365681','you feelin me?', 2, 0, 'winnerfest2000');
INSERT INTO articles (user_name, img_url, title, body, up_votes, down_votes, twitter_id) VALUES ('human','https://i.scdn.co/image/02392d14f6dbfc8806618d1529f7895254e63bb6','bob is such a deeek', 4,0, 'waht');
INSERT INTO articles (user_name, img_url, title, body, up_votes, down_votes, twitter_id) VALUES ('human','Slingshot!', 'https://i.scdn.co/image/045026903add2cd8d97ad7dd7645ba567c8c5a67', 'what?', 2,1, 'where_am_i');
INSERT INTO articles (user_name, img_url, title, body, up_votes, down_votes, twitter_id) VALUES ('human','love this one', 'https://i.scdn.co/image/b99586f1547d25e1b27ac4ae1457d41e7ee463da', 'where am i?', 1, 0, 'westcoast');
INSERT INTO articles (user_name, img_url, title, body, up_votes, down_votes, twitter_id) VALUES ('human','Very Demanding', 'https://i.scdn.co/image/e67e6ee782b29267fabc51a0a325d0ea383052a0', 'wat kind of animal created this terrible site?', 2, 0, 'winnerfirever');
INSERT INTO articles (user_name, img_url, title, body, up_votes, down_votes, twitter_id) VALUES ('human','Captain Beefheart', 'https://i.scdn.co/image/974c9b84c8ab7c9f6b9fbd57f0c0395068c8b4a8','where, what?', 0,0, 'what');
INSERT INTO articles (user_name, img_url, title, body, up_votes, down_votes, twitter_id) VALUES ('human','Molly Hatchet', 'https://i.scdn.co/image/debb37aaecc525e2f68848c23e4d6ab66f618fe0','dingus', 0, 0, 'who?');
INSERT INTO articles (user_name, img_url, title, body, up_votes, down_votes, twitter_id) VALUES ('human','Aphex Twin', 'https://i.scdn.co/image/90178162c57ff81fc767461db5f1628245338382','mcmurphy', 0, 0, 'what');
INSERT INTO articles (user_name, img_url, title, body, up_votes, down_votes, twitter_id) VALUES ('human','CMB', 'https://i.scdn.co/image/92dfd8429ccfcc831920e2a255ab266e4396d4a0','i have thoughts',0,0, 'winner');
INSERT INTO articles (user_name, img_url, title, body, up_votes, down_votes, twitter_id) VALUES ('human','Brothers Johnson', 'https://i.scdn.co/image/9d56730ca56c54cdbeacecedfbe6ba6aa7dabf03','i have emoshe',1,0, 'winnerfest');
INSERT INTO articles (user_name, img_url, title, body, up_votes, down_votes, twitter_id) VALUES ('human','Tesh', 'https://i.scdn.co/image/776ec9b58eb8ca86f38b7a7c3dde6dd716dd4d8f', 'i have deep thoughs about cats',0,0, 'alldayallnight');
INSERT INTO articles (user_name, img_url, title, body, up_votes, down_votes, twitter_id) VALUES ('human','Weird Al', 'https://i.scdn.co/image/d03694562104cd5505f213ee05792daa1641a7aa', 'i have emotions flowing through my haert',0,0, '24_7_baby');
INSERT INTO articles (user_name, img_url, title, body, up_votes, down_votes, twitter_id) VALUES ('human','Lets get jivin', 'https://i.scdn.co/image/aee8c062e9f1738fbf04dcdb613fbb195d2c6b50', 'i am here to connect with ladies who like fine dining',0,0,'so_many_friends');


--comments
INSERT INTO comments (comment_user_name, comment_text, article_id, up_votes, down_votes) VALUES ('bobsbud', 'i am talkin bout bob thoughts',1,2,3);
INSERT INTO comments (comment_user_name, comment_text, article_id, up_votes, down_votes) VALUES ('bobsfriend', 'i am also yappin bout bob',1,4,2);
INSERT INTO comments (comment_user_name, comment_text, article_id, up_votes, down_votes) VALUES ('joesbud', 'i am also yappin bout joe',2,2,1);
INSERT INTO comments (comment_user_name, comment_text, article_id, up_votes, down_votes) VALUES ('joesfriend', 'i am also yappin bout joe',2,3,1);
INSERT INTO comments (comment_user_name, comment_text, article_id, up_votes, down_votes) VALUES ('blorance', 'bob is a dick',1,2,2);
INSERT INTO comments (comment_user_name, comment_text, article_id, up_votes, down_votes) VALUES ('Satan', 'I love this image',2,2,0);
INSERT INTO comments (comment_user_name, comment_text, article_id, up_votes, down_votes) VALUES ('JahBowns', 'you know they\'re not wearing pants, right?',1,1,0);
INSERT INTO comments (comment_user_name, comment_text, article_id, up_votes, down_votes) VALUES ('Augustine', 'YOU ARE A LEGEND',2,0,0);
INSERT INTO comments (comment_user_name, comment_text, article_id, up_votes, down_votes) VALUES ('Jimmy', 'I LOVE THEM TOO',7,1,0);
INSERT INTO comments (comment_user_name, comment_text, article_id, up_votes, down_votes) VALUES ('Ben', 'I wish I lived in a world like this...',7,1,0);
INSERT INTO comments (comment_user_name, comment_text, article_id, up_votes, down_votes) VALUES ('jacquiiii', 'If I know what love is it is because of the Backstreet Boys',7,0,0);
INSERT INTO comments (comment_user_name, comment_text, article_id, up_votes, down_votes) VALUES ('ChreeJay', 'Cornering a very narrow market.',0,0,0);
INSERT INTO comments (comment_user_name, comment_text, article_id, up_votes, down_votes) VALUES ('ChreeJay', 'Yanning was always my favorite album of his.',9,0,0);
INSERT INTO comments (comment_user_name, comment_text, article_id, up_votes, down_votes) VALUES ('heather', 'This is the funniest thing I have ever seen!',1,0,0);
INSERT INTO comments (comment_user_name, comment_text, article_id, up_votes, down_votes) VALUES ('ChreeJay', 'Is he hiding a slingshot in his banana hammock?',1,0,0);
INSERT INTO comments (comment_user_name, comment_text, article_id, up_votes, down_votes) VALUES ('ethan', 'HAHAHA',5,0,0);
INSERT INTO comments (comment_user_name, comment_text, article_id, up_votes, down_votes) VALUES ('Phil', 'You look great here Ben!!!!',1,0,0);
