const passport = require('passport')
const { Strategy: JwtStrategy, ExtractJwt } = require('passport-jwt')


passport.use(new JwtStrategy({
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: process.env.TOKEN_SECRET,
  // issuer: 'http://localhost:8080',
  // audience: 'http://localhost:8080',
}, (payload, done) => {
  return done(null, payload)
}))

exports.authUser = (req, res, next) => {
  return passport.authenticate('jwt', { session: false })(req, res, next)
}