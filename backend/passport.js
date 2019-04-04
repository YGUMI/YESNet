const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const Users = require('./models/users');

module.exports = () => {
  
  passport.serializeUser((user, done) => {
    
    console.log('serializeUser()');

    done(null, user);
  });

  passport.deserializeUser((user, done) => {

    console.log('deserializeUser()');

    done(null, user);
  });


  passport.use(new LocalStrategy({
    usernameField: "uid",
    passwordField: "password",
    session: false,
    passReqToCallback: true,
  }, (req, uid, password, done) => {
    Users.findOne({ uid: uid }, (findError, user) => {

      if (findError) return done(findError);

      if (!user) {
          return done(null, false, { message: "존재하지 않는 아이디 입니다." });
      }

      return user.comparePassword(password, (passError, isMatch) => {

        if (isMatch) {

          return done(null, user);
        }

        return done(null, false, { message: "비밀번호가 틀렸습니다." });
      });
    });

    console.log("passport.use LocalStrategy");
  }));

};