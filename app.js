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
  var htmlNewForm = fs.readFileSync('./views/new.ejs', 'utf8');
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
  var commentsObjToPost;

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
          comments.forEach(function(e){
            if(articleId == parseInt(e.id)){
              commentsObjToPost = e;
            }
          });
          console.log("commentsobj", commentsObjToPost);
        }
      });  
      var rendered = ejs.render(htmlShow, {
        articleObjToPost: articleObjToPost,
        commentsObjToPost: commentsObjToPost
      });
      res.send(rendered);
    }
  });
});

//app.get('/articles/:id/comments/new'), function(req, res){

// });

// app.post('/articles/:id/comments'), function(req, res){

  //res.redirect('/articles/:id')
// });

