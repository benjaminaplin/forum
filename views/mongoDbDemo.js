// // grab the user model
// var User = require('./app/models/user');
app.post('/', function(req, res){

  // create a new user
  var newZombie = Zombie({
    name: ,
    age: ,
    zombie: ,
    location: ,
    rage: ,
  });

  // save the user
  newZombie.save(function(err) {
    if (err) throw err;

    console.log('Zombie created!');
  });

  res.redirect('/');
});  

app.get('/zombie/new', function(req, res){
  var htmlNewZombieForm = fs.readFileSync('./views/new_zombie.ejs', 'utf8');
  var rendered = ejs.render(htmlNewZombieForm);
  res.send(rendered);
});

app.delete('/zombie/:id', function (req, res) {
  console.log(parmas.id)
// get the user starlord55
  ZombieModel.find({ id: params.id }, function(err, user) {
    if (err) throw err;

    // delete him
    zombieModel.remove(function(err) {
      if (err) throw err;

      console.log('Zombie successfully deleted!');
    });
  });

});