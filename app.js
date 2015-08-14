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

//global variables


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
   db.all('SELECT * FROM articles;', function(err, rows){
    if(err){
      console.log(err);
    } else {
      console.log("rows", rows);
      var html = fs.readFileSync("./views/index.ejs", "utf8");
      var rendered = ejs.render(html, {rows:rows});
      res.send(rendered);
      }
  });
});

app.post('/', function(req, res){
  var newPost = req.body;
  console.log("nePost", newPost);
    db.run("INSERT INTO articles (user_name, img_url, title, body, twitter_id) VALUES (?,?,?,?,?)", newPost.user_name, newPost.picurl, newPost.title, newPost.body, newPost.twitter_id, function(err){
    if(err){
      console.log(err);
    }
  });
  res.redirect('/');
});

app.get('/articles/', function(req, res){ 
    var artistsIds = [];  
    var artistId;  
    var artistsImgs = [];
    var imgUndefined;

    // console.log(req.query.artist);

    var tag = req.query.artist;
    // console.log('tag', tag.artist);

    var requestArtistUrl = 'https://api.spotify.com/v1/search?q='+ tag +'&type=artist';

    request.get(requestArtistUrl, function(err, response, body){
      var parsedJSON = JSON.parse(body);
      var myParsedData = parsedJSON;

      myParsedData.artists.items.forEach(function(e){
        // console.log(e.id);
        artistsIds.push(e.id);
      });
      console.log(artistsIds);  
      artistId = artistsIds[0];
      console.log(artistId);
      
      if(artistId === undefined){
        var html = fs.readFileSync("./views/bad_search.ejs", "utf8");
        res.send(html);
      } else {
        var requestAlbumsUrl = 'https://api.spotify.com/v1/artists/' + artistId + '/albums';

        request.get(requestAlbumsUrl, function(err, response, body){
          var parsedJSON = JSON.parse(body);
          // console.log(parsedJSON.items);

            parsedJSON.items.forEach(function(e){
              if(e.images[3] === undefined){
                imgUndefined = true; 
                var html = fs.readFileSync("./views/bad_search.ejs", "utf8");
                res.send(html);
              } else {
              artistsImgs.push(e.images[0].url);
              }
            });
            // console.log(artistsImgs);
            if(!imgUndefined){
              var html = fs.readFileSync("./views/new_image.ejs", "utf8");
              var rendered = ejs.render(html, {artistsImgs: artistsImgs});
              res.send(rendered);
            }
      }); 
    } 
  });  
});


app.post('/articles/newpost', function(req, res){
  var imgToAdd = req.body.picurl;
  console.log(imgToAdd);
  var htmlNewCommentForm = fs.readFileSync('./views/new_post.ejs', 'utf8');
  var rendered = ejs.render(htmlNewCommentForm, {imgToAdd:imgToAdd});
  res.send(rendered);
});

app.get('/articles/:id', function(req, res){
  var articleId = parseInt(req.params.id);
  // console.log(articleId);
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
        console.log("article obj.img_url", articleObjToPost.img_url)
        var htmlShowArticleById = fs.readFileSync('./views/show_article_by_id.ejs', 'utf8');
        console.log("commentsobjtopost", commentsObjToPost)
        var rendered = ejs.render(htmlShowArticleById, {
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
      console.log(row);
      var htmlNewCommentForm = fs.readFileSync('./views/new_comment.ejs', 'utf8');
      var rendered = ejs.render(htmlNewCommentForm, {row:row});
      res.send(rendered);
    }
  })
});

app.post('/articles/:article_id/comments', function(req, res){
  var newComment = req.body;
  console.log('new comment', newComment);
  // console.log("look you git the url: ", req.body.img_url);
  var articleId = req.params.article_id;
  //CHECK AD SEE IF ITS IN THE DB
  db.run("INSERT INTO comments (comment_user_name, comment_text, article_id) VALUES (?,?,?)", newComment.name, newComment.comment, articleId, function(err){
    if(err){
      console.log(err);
    }
  });
  res.redirect('/articles/' + articleId)
});

//erything belowhere is shile

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


