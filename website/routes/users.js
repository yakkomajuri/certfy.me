var express = require('express');
var router = express.Router();
var multer = require('multer');
var bcrypt = require('bcryptjs');
var upload = multer({dest: './uploads'});
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var CustomStrategy = require('passport-custom').Strategy;
var alert = require('alert-node');
var ExpressBrute = require('express-brute');
 
var store = new ExpressBrute.MemoryStore(); // stores state locally, don't use this in production
var bruteforce = new ExpressBrute(store);

var User = require('../models/user');

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('/home');
});

router.get('/home', function(req, res, next) {
  res.render('home', {title:'Home'});
});

router.get('/register', function(req, res, next) {
  res.render('register', {title:'Register'});
});

router.get('/login', function(req, res, next) {
  res.render('login', {title:'Login'});
});


router.get('/register-new', function(req, res, next) {
  var authenticated = false;


  if (req.user) {
    authenticated = true;
  }

  if(authenticated === true){
      //user is already authenticated
      res.render('registernew', {title:'Register New', pageData: {name : [req.user.name], username: [req.user.username], eth: [req.user.eth], signee: ''}});
  }else{
      //redirect to login
      res.redirect('/users/login');
  }
});

router.get('/settings', function(req, res, next) {
  var authenticated = false;


  if (req.user) {
    authenticated = true;
  }

  if(authenticated === true){
      //user is already authenticated
      res.render('settings', {title:'Settings', pageData: {name : [req.user.name], username: [req.user.username], eth: [req.user.eth], signee: ''}});
  }else{
      //redirect to login
      res.redirect('/users/login');
  }
});

router.get('/sign', async function(req, res, next) {
  var authenticated = false;
  var toSign;


  if (req.user) {
    authenticated = true;
  }

  if(authenticated === true){
    await User.findOne({username: req.user.username}, function(err, user){
      if(err) { throw err;  }
      if(user) { 
          toSign = user.toSign;
    }
    });
      res.render('sign', {title:'Sign Document', pageData: {name : [req.user.name], username: [req.user.username], eth: [req.user.eth], toSign: toSign}});
  }else{
      res.redirect('/users/login');
  }
});

router.get('/multisig', async function(req, res, next) {

  var authenticated = false;
  var ethAddress;


  if (req.user) {
    authenticated = true;
  }

  if(authenticated === true){
    await User.findOne({username: req.body.signee}, function(err, user){
      if(err) { res.redirect('/users/friends');  }
      if(user) { 
        ethAddress = user.eth;
    }
    });
      res.render('registernew', {title:'Register New', pageData: {name : [req.user.name], username: [req.user.username], eth: [req.user.eth], signee: [ethAddress]}});
  }else{
      res.redirect('/users/login');
  }
});

router.post('/multisig',  async function(req, res, next) {
  var authenticated = false;
  var ethAddress;

    await User.findOne({username: req.body.signee}, function(err, user){
      if(err) { res.redirect('/users/friends');  }
      if(user) { 
        ethAddress = user.eth;
        res.render('registernew', {title:'Register New', pageData: {name : [req.user.name], username: [req.user.username], eth: [req.user.eth], signee: [ethAddress]}});
    }});
});



router.post('/deletesig',  async function(req, res, next) {
  var nameId = req.body.selector;
  await User.deleteToSign({username: req.user.username}, nameId, function(err, result) {
    if (err) {
      throw err;
    }
    if (result) {
      res.redirect('/users/sign');
    }
  });
});


router.get('/verify', function(req, res, next) {

  var authenticated = false;


  if (req.user) {
    authenticated = true;
  }

  if(authenticated === true){
      //user is already authenticated
      res.render('verify', {title:'Verify', pageData: {name : [req.user.name], username: [req.user.username], eth: [req.user.eth]}});
  }else{
      //redirect to login
      res.redirect('/users/login');
  }
});



router.get('/query', async function(req, res, next) {

  var authenticated = false;


  if (req.user) {
    authenticated = true;
  }

  if(authenticated === true){
    await User.findOne({username: req.user.username}, function(err, user){
      if(err) { throw err;  }
      if(user) { 
          myDocs = user.myDocs;
    }
    });
      res.render('query', {title:'Query', pageData: {name : [req.user.name], username: [req.user.username], eth: [req.user.eth], myDocs: myDocs}});
  }else{
      //redirect to login
      res.redirect('/users/login');
  }
});



router.get('/dashboard', async function(req,res,next){

  var friends, friendRequests;
  var authenticated = false;
  var toSign;


  if (req.user) {
    authenticated = true;
  }

  if(authenticated === true){
      //user is already authenticated
      await User.findOne({username: req.user.username}, function(err, user){
        if(err) { throw err;  }
        if(user) { 
            toSign = user.toSign;
      }
      });

        await User.findFriends({username: req.user.username}, function(err, user){
            if (err) { throw err;}
            if (user) {
            }
            friends = user.friends;
            friendRequests = user.friendRequests;
            res.render('dashboard', {title:'Dashboard', pageData: {
              name: [req.user.name], 
              username: [req.user.username], 
              friends: [friends],
              eth: [req.user.eth], 
              friendRequests: [friendRequests],
              toSign: toSign
            }});
          })

  } else{
      //redirect to login
      res.redirect('/users/login');
  }
});
/*
router.post('/dashboard',  async function(req, res, next) {
  var friend = req.body.friend;
  var query = {username: req.user.username};
  console.log(query);
  User.acceptFriendRequest(req.user.username, query, friend, function(err, friend){
      if(err) {
        throw err;
      }
  });
});
*/
router.post('/accept',  async function(req, res, next) {
  var friend = req.body.request;
  var query = {username: req.user.username};
  await User.acceptFriendRequest(req.user.username, query, friend, function(err, added){
      if(err) {
        throw err;
      }
      else {
        res.redirect('/users/dashboard');
      }
  });
});

router.post('/reject',  async function(req, res, next) {
  var friend = req.body.requested;
  var query = {username: req.user.username};
  await User.removeRequest(req.user.username, query, friend, function(err, removed){
      if(err) {
        throw err;
      }
      else {
        res.redirect('/users/dashboard');
      }
  });
});

router.post('/multi',  async function(req, res, next) {
  var nameIndex = req.body.title + '(' + req.body.index + ')';
  var query = {eth: req.body.address};
  await User.addDocToSign(query, nameIndex, function(err, updated){
    if(err) {
      throw err;
    }
    if (updated) {
      res.redirect('/users/register-new');
    }
});
});

router.post('/std',  async function(req, res, next) {
  var nameIndex = req.body.title + '(' + req.body.index + ')';
  var query = {username: req.user.username};
  await User.addToMyDocs(query, nameIndex, function(err, updated){
    if(err) {
      throw err;
    }
    if (updated) {
      res.redirect('/users/docs');
    }
});
});

router.get('/docs', function(req,res,next){

  var authenticated = false;


  if (req.user) {
    authenticated = true;
  }

  if(authenticated === true){
      //user is already authenticated
      res.render('docs', {title:'Documents', pageData: {name : [req.user.name], username: [req.user.username], eth: [req.user.eth]}});
  }else{
      //redirect to login
      res.redirect('/users/login');
  }
});

router.get('/profile', function(req,res,next){

  var authenticated = false;


  if (req.user) {
    authenticated = true;
  }

  if(authenticated === true){
      //user is already authenticated
      res.render('profile', {title:'Profile', pageData: {name : [req.user.name], username: [req.user.username], 
        eth: [req.user.eth], email: [req.user.email]}});
  }else{
      //redirect to login
      res.redirect('/users/login');
  }
});

router.get('/friends', async function(req,res,next){

  var authenticated = false;


  if (req.user) {
    authenticated = true;
  }

  if(authenticated === true){
    await User.findFriends({username: req.user.username}, function(err, user){
      if (err) { throw err;}
      if (user) {
      }
      friends = user.friends;
    })
res.render('friends', {title:'Friends', pageData: {name : [req.user.name], username: [req.user.username], friends: [friends], eth: [req.user.eth]}});
  }else{
      //redirect to login
      res.redirect('/users/login');
  }
});

router.post('/friends',  async function(req, res, next) {
    var friend = req.body.friend;
    var query = {username: req.user.username};
    User.addFriend(req.user.username, query, friend, function(err, friend){
        if(err) {
          throw err;
        }
    });
    res.redirect('/users/friends');
});

router.post('/login', 
  bruteforce.prevent,
  passport.authenticate(['local','custom'], { failureRedirect: '/users/login', failureFlash: 'Invalid username or password'}),
  function(req, res) {
    res.redirect('/users/dashboard');
  }
  );

passport.serializeUser(function(user, done) {
    done(null, user.id);
  });
  
passport.deserializeUser(function(id, done) {
    User.getUserById(id, function(err, user) {
      done(err, user);
    });
  });

passport.use(new LocalStrategy(function(username, password, done) {
    User.getUserByUsername(username, function(err, user){
      if(err) throw err;
      if(!user){
        return done(null, false, {message: 'Unknown User'});
      }

      User.comparePassword(password, user.password, function(err, isMatch){
        if(err) return done(err);
        if(isMatch){
          return done(null, user);
        } else {
          return done(null, false, {message: 'Invalid Password'});
        }
      });
    });
}));

passport.use('custom', new CustomStrategy(function(req, done) {
  User.getUserByAddress(req.body.eth, function(err, user){
    if(err) throw err;
    if(!user){
      return done(null, false, {message: 'Unknown User'});
    }

    User.comparePassword(req.body.password, user.password, function(err, isMatch){
      if(err) return done(err);
      if(isMatch){
        return done(null, user);
      } else {
        return done(null, false, {message: 'Invalid Password'});
      }
    });
  });
}));


router.post('/register', async function(req, res, next) {
  var allGood = true;
  await User.findOne({username: req.body.username}, function(err, user){
    if(err) { res.redirect('/users/register');  }
    if(user) { res.redirect('/users/register'); 
    alert("Username alredy registered."); 
    allGood = false;
  }
  });

  await User.findOne({eth: req.body.eth}, function(err, user){
    if(err) { res.redirect('/users/register');  }
    if(user) { res.redirect('/users/register'); 
    alert("Ethereum address alredy registered."); 
    allGood = false;
  }
  });

  await User.findOne({email: req.body.email}, function(err, user){
    if(err) { res.redirect('/users/register');  }
    if(user) { res.redirect('/users/register'); 
    alert("Email alredy registered.");
    allGood = false;
  }
  });

  if (allGood) {
  var name = req.body.name;
  var email = req.body.email;
  var eth = req.body.eth;
  var username = req.body.username;
  var password = req.body.password;
  var password2 = req.body.password2;

  // Form Validator
  req.checkBody('name', 'Name field is required').notEmpty();
  req.checkBody('email', 'Email field is required').notEmpty();
  req.checkBody('email', 'Email is not valid').isEmail();
  req.checkBody('username', 'Username field is required').notEmpty();
  req.checkBody('password', 'Password field is required').notEmpty();
  req.checkBody('password2', 'Passwords do not match').equals(password);
  
  // Check Errors
  var errors = req.validationErrors();

  if (errors) {
    res.render('register', {
      errors: errors
    });
  } else {
    var newUser = new User({
      name: name,
      email: email,
      eth: eth,
      username: username,
      password: password,
      friends: [],
      toSign: []
    });

    User.createUser(newUser, function(err, user) {
      if(err) throw err;
    });

    //req.flash('success', 'You are now registered');

    res.location('/users/login');
    res.redirect('/users/login');
  }
}
else {
  return;
}
});

router.get('/logout', function(req, res) {
  req.logout();
  res.redirect('/users/home');
});

module.exports = router;


/*
passport.use('custom', new CustomStrategy(
  function(req, done) {
    User.getUserByAddress({
      eth: req.body.eth
    }, function (err, user) {
      done(err, user);
    });

    User.comparePassword(req.body.password, password, function(err, isMatch){
      if(err) return done(err);
      if(isMatch){
        return done(null, user);
      } else {
        return done(null, false, {message: 'Invalid Password'});
      }
    });
  }
));

*/
/*
passport.use('custom', new CustomStrategy(function(eth, password, done) {
  User.getUserByAddress(eth, function(err, eth){
    console.log("eth is: " + eth);
    if(err) throw err;
    if(!eth){
      return done(null, false, {message: 'Unknown Address'});
    }

    User.comparePassword(password, eth.password, function(err, isMatch){
      console.log(password + "=" + eth.password);
      if(err) return done(err);
      if(isMatch){
        return done(null, user);
      } else {
        return done(null, false, {message: 'Invalid Password'});
      }
    });
  });
}));
*/


/*

passport.use(new LocalStrategy(function(eth, username, password, done) {
  User.getUserByUsername(eth, username, function(err, user){
    console.log("username is: " + username);
    console.log("eth is: " + eth);
    if(err) throw err;
    if(!user){
      return done(null, false, {message: 'Unknown User'});
    }
  

    User.comparePassword(password, user.password, function(err, isMatch){
      console.log(password + "=" + user.password);
      if(err) return done(err);
      if(isMatch){
        return done(null, user);
      } else {
        return done(null, false, {message: 'Invalid Password'});
      }
    });
  });
}));

*/

   