var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var usersSchema = new Schema({
    
    uid: String,
    passwd: String,
    accounts: String,
    eth_pass: String,
    name: String,
    email: String,
    session_id: String
    
});

//////////////////////////////암호화 추가해야함
usersSchema.methods.comparePassword = function(inputPassword, cb) {
    if (inputPassword === this.passwd) {
      cb(null, true);
    } else {
      cb('error');
    }
};

/*
usersSchema.path('uid').validate(function(uid)) {
    return uid.length;
}, 'uid 칼럼의 값이 없습니다.');

usersSchema.path('passwd').validate(function(passwd)) {
    return passwd.length;
}, 'passwd 칼럼의 값이 없습니다.');
*/


module.exports = mongoose.model('users', usersSchema);