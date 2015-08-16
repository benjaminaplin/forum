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

INSERT INTO articles (user_name, img_url, title, body, up_votes, down_votes, twitter_id) VALUES ('joe', 'https://i.scdn.co/image/2744f9fb06f97b5133e523f69bccd0c838dc10c3', 'joes thoughts', 'i have thoughts', 2, 4,'joe_rawks');
INSERT INTO articles (user_name, img_url, title, body, up_votes, down_votes, twitter_id) VALUES ('bob', 'https://i.scdn.co/image/0fa06ced09a799f78629a2ee354dc294f7513940','bobs thoughts', 'i forgot my thoughts already, sorry', 1, 3, 'bob_rawks');

INSERT INTO comments (comment_user_name, comment_text, article_id, up_votes, down_votes) VALUES ('bobsbud', 'i am talkin bout bob thoughts', 1, 1, 3);
INSERT INTO comments (comment_user_name, comment_text, article_id, up_votes, down_votes) VALUES ('bobsfriend', 'i am also yappin bout bob', 1, 4, 2);
INSERT INTO comments (comment_user_name, comment_text, article_id, up_votes, down_votes) VALUES ('joesbud', 'i am also yappin bout joe', 2, 2, 1);
INSERT INTO comments (comment_user_name, comment_text, article_id, up_votes, down_votes) VALUES ('joesfriend', 'i am also yappin bout joe', 2, 3, 1);

-- SELECT articles.id, articles.user_name, articles.timestamp, articles.title, articles.body, articles.twitter_id, comments.article_id, comments.up_votes, comments.down_votes FROM articles INNER JOIN comments ON articles.id = comments.article_id;
INSERT INTO comments (comment_user_name, comment_text, article_id, up_votes, down_votes) VALUES ('blorance', 'bob is a dick', 1, 2, 2);
