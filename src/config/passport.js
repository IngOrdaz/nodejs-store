const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;

const User = require("../models/newEmployee");
passport.use(
  new LocalStrategy(
    {
      usernamefield: "user",
    },
    async (user, password, done) => {
      const usuario = await User.findOne({ user: user });
      if (!usuario) {
        return done(null, false, { message: "Usuario no encontrado" });
      } else {
        const match = await usuario.matchPassword(password);
        if (match) {
          return done(null, usuario);
        } else {
          return done(null, false, { message: "Contraseña Incorrecta" });
        }
      }
    }
  )
);

passport.serializeUser((usuario, done) => {
  done(null, usuario.id);
});

passport.deserializeUser((id, done) => {
  User.findOne(id, (err, usuario) => {
    done(err, usuario);
  });
});
