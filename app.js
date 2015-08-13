//dependencies
var sqlite3 = require('sqlite3').verbose();
var db = new sqlite3.Database('forum.db');
var express = require('express');
var path = require('path');
var bodyParser = require('body-parser');
var fs = require("fs");
var ejs = require("ejs");
var app = express();
var request = require('request');

//spofity variables



// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.use(express.static(__dirname + '/public'));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded());
app.use(express.static(path.join(__dirname, 'public')));

// app.locals.appdata = require('./data.json');
//middleware
var bodyParser = require('body-parser');
var urlencodedBodyParser = bodyParser.urlencoded({extended: false});
app.use(urlencodedBodyParser);
var methodOverride = require('method-override');
app.use(methodOverride('_method'));

//config
app.listen(3000, function() {
  console.log("I'm listening on 3000!");
});

//routes

app.get('/', function(req, res){
  res.redirect('/articles');
});

app.get('/articles', function(req, res){
  var html = fs.readFileSync('./views/index.ejs', 'utf8');
  db.all('SELECT * FROM articles', function(err, rows){
    if(err){
      console.log(err);
    } else {
      var rendered = ejs.render(html, {rows: rows});
      res.send(rendered);
    }
  })

});

app.get('/articles/new', function(req, res){
  var htmlNewForm = fs.readFileSync('./views/new_article.ejs', 'utf8');
  res.send(htmlNewForm);
});

app.post('/articles', function(req, res){
  var newPost = req.body;
  db.run("INSERT INTO articles (user_name, title, body, twitter_id) VALUES (?,?,?,?)", newPost.user_name, newPost.title, newPost.body, newPost.twitter_id, function(err){
  if(err){
    console.log(err);
  }
});
  res.redirect('/articles');
});

app.get('/articles/:id', function(req, res){
  var articleId = parseInt(req.params.id);
  console.log(articleId);
  var htmlShow = fs.readFileSync('./views/show.ejs', 'utf8');
  var articleObjToPost;
  var commentsObjToPost = [];
  var commentsObj;

  db.all('SELECT * FROM articles;', function(err, rows){
    if(err){
      console.log(err);
    } else {
      var articles = rows;
      articles.forEach(function(e){
      if(articleId == parseInt(e.id)){
          articleObjToPost = e;
      }
    });
      console.log("article obj", articleObjToPost)
      db.all('SELECT * FROM comments;', function(err, rows){
        if(err){
          console.log(err);
        } else {
          var comments = rows;
          // console.log("comments", comments);
          comments.forEach(function(e){
            if(articleId == parseInt(e.article_id)){
              commentsObjToPost.push(e);
            }
          });
      var rendered = ejs.render(htmlShow, {
        articleObjToPost: articleObjToPost,
        commentsObjToPost: commentsObjToPost
      });
      res.send(rendered);
        }
          // console.log("commentsobjtopost", commentsObjToPost);
      });  
    }
  });
});

app.get('/articles/:id/comments/new', function(req, res){
  var articleIdComment = req.params.id;
  db.get('SELECT * FROM articles WHERE id=?', articleIdComment, function(err, row){
    if(err){
      console.log(err);
    } else {
      // console.log(row);
      var htmlNewCommentForm = fs.readFileSync('./views/new_comment.ejs', 'utf8');
      var rendered = ejs.render(htmlNewCommentForm, {row:row});
      res.send(rendered);
    }
  })
});

app.post('/articles/:article_id/comments', function(req, res){
  var newComment = req.body;
  var articleId = req.params.article_id;
  db.run("INSERT INTO comments (comment_user_name, comment_text, article_id) VALUES (?,?,?)", newComment.comment_user_name, newComment.comment_text, articleId, function(err){
    if(err){
      console.log(err);
    }
  });
  res.redirect('/articles/' + articleId)
});

app.put('/articles/:article_id/comments/:id/upvote', function(req, res){
  commentsId = req.params.id;
  articlesId = req.params.article_id;
  console.log("upvotin");
  db.run('UPDATE comments SET up_votes = up_votes+1 WHERE comments.id=?', commentsId, function(err){
    if(err){
      console.log(err);
    }
    res.redirect('/articles/' + articlesId);
  });
});

app.put('/articles/:article_id/comments/:id/downvote', function(req, res){
  commentsId = req.params.id;
  articlesId = req.params.article_id;
  db.run('UPDATE comments SET down_votes = down_votes+1 WHERE comments.id=?', commentsId, function(err){
    if(err){
      console.log("dwnvotin");      
    }
    res.redirect('/articles/' + articlesId);

  });
});


