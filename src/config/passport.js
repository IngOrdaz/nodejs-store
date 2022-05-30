const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;

import User from "../models/newEmployee";

//const User = require("../models/newEmployee");
//var UserDetails = mongoose.model('userInfo', UserDetail);//test
passport.use(
  new LocalStrategy(
    {
      usernameField: "user",
      passwordField: "password",
    },
    async (user, password, done) => {
      // Match user
      console.log(user);
      //const a = 'nbd';//prueba
      const usuario = await User.findOne({ user: user });
      if (!usuario) {
        return done(null, false, { message: "usuario no encointrado" });
      } else {
        //match password user
        const match = await usuario.matchPassword(password);
        if (match) {
          return done(null, usuario);
        } else {
          return done(null, false, { message: "contraseña erronea" });
        }
      }
    }
  )
);
passport.serializeUser((usuario, done) => {
  done(null, usuario.id);
});

passport.deserializeUser((id, done) => {
  User.findById(id, (err, usuario)=> {
    done(err, usuario);
  });
});
