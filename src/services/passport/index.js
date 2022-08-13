import passport from 'passport'
import { Schema } from 'bodymen'
import { BasicStrategy } from 'passport-http'
import { Strategy as BearerStrategy } from 'passport-http-bearer'
import { Strategy as GoogleStrategy } from 'passport-google-oauth20';
import { Strategy as JwtStrategy, ExtractJwt } from 'passport-jwt'
import { jwtSecret, masterKey } from '../../config'
import User, { schema } from '../../api/user/model'
import isEmail from 'validator/lib/isEmail';
import isMobilePhone from 'validator/lib/isMobilePhone';

export const password = () => (req, res, next) =>
    passport.authenticate('password', { session: false }, (err, user, info) => {
        if (err && err.param) {
            return res.status(400).json({
                code: 400,
                status: JSON.stringify(err)
            })
        } else if (err || !user) {
            return res.status(401).json({
                code: 401,
                status: 'Not Found'
            }).end()
        }
        req.logIn(user, { session: false }, (err) => {
            if (err) return res.status(401).json({
                code: 401,
                status: 'Not Found'
            }).end()
            next()
        })
    })(req, res, next)

export const master = () =>
    passport.authenticate('master', { session: false })

export const token = ({ required, roles = User.roles } = {}) => (req, res, next) =>
    passport.authenticate('token', { session: false }, (err, user, info) => {
        if (err || (required && !user) || (required && !~roles.indexOf(user.role))) {
            return res.status(401).end()
        }
        req.logIn(user, { session: false }, (err) => {
            if (err) return res.status(401).end()
            next()
        })
    })(req, res, next)

passport.use('password', new BasicStrategy((emailOrPhone, password, done) => {
    let userSchema = null

    let checkEmail = isEmail(emailOrPhone)

    // Validate Phone
    if (checkEmail) {
        userSchema = new Schema({ email: schema.tree.email, password: schema.tree.password })
    } else {
        userSchema = new Schema({ phone: schema.tree.phone, password: schema.tree.password })
    }

    userSchema.validate({ emailOrPhone, password }, (err) => {
        if (err) done(err)
    })

    let body = checkEmail ? { email: emailOrPhone } : { phone: emailOrPhone }

    console.log(checkEmail.toString())

    User.findOne(body).then((user) => {
        if (!user) {
            done(null)
            return null
        }
        return user.authenticate(password, user.password).then((user) => {
            done(null, user)
            return null
        }).catch(done)
    })
}))

passport.use('master', new BearerStrategy((token, done) => {
    if (token === masterKey) {
        done(null, {})
    } else {
        done(null, false)
    }
}))

passport.use('token', new JwtStrategy({
    secretOrKey: jwtSecret,
    jwtFromRequest: ExtractJwt.fromExtractors([
        ExtractJwt.fromUrlQueryParameter('access_token'),
        ExtractJwt.fromBodyField('access_token'),
        ExtractJwt.fromAuthHeaderWithScheme('Bearer')
    ])
}, ({ id }, done) => {
    User.findById(id).then((user) => {
        done(null, user)
        return null
    }).catch(done)
}))

passport.use('google', new GoogleStrategy({
    clientID: "GOOGLE_CLIENT_ID",
    clientSecret: "GOOGLE_CLIENT_SECRET",
    callbackURL: "http://www.example.com/auth/google/callback"
}, function(accessToken, refreshToken, profile, cb) {

    User.findOrCreate({ googleId: profile.id }, function(err, user) {
        return cb(err, user);
    });
}))