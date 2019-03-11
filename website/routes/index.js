var express = require('express');
var router = express.Router();

/* GET home page. */
/* router.get('/', function(req, res, next) {
  res.redirect('https://certfy.me/home');
}); */

router.get('/', function(req, res, next) {
  res.render('home', {title:'Home'});
});

router.get('/home', function(req, res, next) {
  res.render('home', {title:'Home'});
});

router.get('/rsk', function(req, res, next) {
  res.render('rsk', {title:'RSK'});
});

router.get('/verify', function(req, res, next) {
  res.render('verify', {title:'Verify'});
});

router.get('/verifydoc', function(req, res, next) {
  res.render('verifydoc', {title:'Verify'});
});

router.get('/rsk/verifydoc', function(req, res, next) {
  res.render('rskverify', {title:'Verify'});
});

module.exports = router;

