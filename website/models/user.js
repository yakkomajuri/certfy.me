var mongoose = require('mongoose');
var bcrypt = require('bcryptjs');
var alert = require('alert-node');

mongoose.connect('DATABASE ADDRESS');

var db = mongoose.connection;

// User Schema
var UserSchema = mongoose.Schema({
    username: {
        type: String,
        index: true
    },
    password: {
        type: String
    },
    email: {
        type: String
    },
    name: {
        type: String
    },
    eth: {
        type: String
    },
    friends: {
        type: Array
    },
    friendRequests: {
        type: Array
    },
    friendsAsked: {
        type: Array
    },
    toSign: {
        type: Array
    },
    myDocs: {
        type: Array
    },
    resetPasswordToken: {
        type: String
    },
    resetPasswordExpires: {
        type: Date
    }
});

var User = module.exports = mongoose.model('User', UserSchema);

module.exports.getUserById = function(id, callback) {
    User.findById(id, callback);
}

module.exports.getUserByUsername = function(username, callback) {
    var query = {username: username};
    User.findOne(query, callback);
}

module.exports.getUserByAddress = function(eth, callback) {
    var query = {eth: eth};
    User.findOne(query, callback);
}

module.exports.comparePassword = function(candidatePassword, hash, callback){
    bcrypt.compare(candidatePassword, hash, function(err, isMatch) {
        callback(null, isMatch);
    });
}

module.exports.createUser = function(newUser, callback){
    bcrypt.genSalt(10, function(err, salt) {
        bcrypt.hash(newUser.password, salt, function(err, hash) {
            newUser.password = hash;
            newUser.save(callback);
        });
    });
}

module.exports.addFriend = async function(username, query, friend, callback){
    var userExists = false;
    var usr;
    await User.findOne(query, function(err, user){ 
        if(err) {
            throw err;
        } 
        if (user) {
            userExists = true;
            usr = user;
        }
        if(!user) {
            alert('User does not exist');
        }
    });
    if (userExists) {
       var yesSir = usr.friendsAsked.find(function(element){
           return element == friend;
       });
       if(yesSir) {
            alert('Friend request already sent'); return;
       }
       else {
        User.updateOne(query, {$push: { friendsAsked: friend} }, callback);
        User.updateOne({username: friend}, {$push: { friendRequests: username} }, callback);
       }
    }
}


module.exports.acceptFriendRequest = async function(username, query, friend, callback){
   await User.updateOne(query, {$addToSet: { friends: friend} }, function(err, updated){
    if(err) {throw err;}  
});
   await User.updateOne({username: friend}, {$addToSet: { friends: username} }, function(err, updated){
    if(err) {throw err;}
});
await  User.updateOne(query, {$pull: { friendRequests: friend} }, function(err, updated){
    if(err) {throw err;}
});
await User.updateOne({username: friend}, {$pull: { friendsAsked: username} }, callback);
}

module.exports.removeRequest = async function(username, query, friend, callback){
    await  User.updateOne(query, {$pull: { friendRequests: friend} }, function(err, updated){
        if(err) {throw err;}
    });
    await User.updateOne({username: friend}, {$pull: { friendsAsked: username} }, callback);
 }


module.exports.addDocToSign = async function(query, nameIndex, callback){
    var usr;
    await  User.findOne(query, function(err, user) {
        if (err) {
            throw err;
        }
        else {
            usr = user.username;
        }
    });
    User.updateOne({username: usr}, {$addToSet: { toSign: nameIndex} }, callback);
}


module.exports.addToMyDocs = async function(query, nameIndex, callback){
    User.updateOne(query, {$addToSet: { myDocs: nameIndex} }, callback);
}

module.exports.signDocument = function(query, nameIndex, callback){
    User.updateOne(query, {$pull: { toSign: nameIndex} }, callback);
}

module.exports.findFriends = function(query, callback) {
    User.findOne(query, callback);
}

module.exports.deleteToSign = function(query, nameIndex, callback) {
    User.updateOne(query, {$pull: { toSign: nameIndex} }, callback);
}


/*
module.exports.getUserByUsername = function(eth, username, callback) {
    if (username = "") {
        var query = {eth: eth};
    }
    else {
        var query = {username: username};
    }
    console.log("The query is: " + query);
    User.findOne(query, callback);
}

module.exports.getUserByAddress = function(eth, callback) {
    var query = {eth: eth};
    console.log("The query is: " + query);
    User.findOne(query, callback);
}


*/
