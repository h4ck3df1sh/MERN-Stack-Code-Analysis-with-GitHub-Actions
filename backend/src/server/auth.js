import crypto from 'crypto';
import passport from 'passport';
import jwt from 'jsonwebtoken';
import LocalStrategy from 'passport-local';
import { Strategy, ExtractJwt } from 'passport-jwt';
import GitHubStrategy from 'passport-github2';
import * as usersRepository from '../api/repository/usersRepository.js';
import { validateUser } from '../api/validation/validate.js';




// JSON WEB TOKEN
function makeToken(user) {
  const payload = { id: user.id, role: user.role };
  const token = jwt.sign(payload, process.env.AUTH_SECRET_KEY, { expiresIn: process.env.AUTH_EXPIRES_IN });
  return token;
}




// AUTH MIDDLEWARE
export async function auth(req, res, next) {
  const authOptions = {
    secretOrKey: process.env.AUTH_SECRET_KEY,
    jwtFromRequest: ExtractJwt.fromHeader('authorization'),
  };

  const authStr = new Strategy(authOptions, async (jwt_payload, callback) => {
    try {
      const getUser = await usersRepository.getUser({ _id: jwt_payload.id });
      if (!getUser) return callback('Unauthorized: User not found.');
      return callback(null, getUser);
    } catch (error) {
      return callback(error);
    }
  });

  passport.authenticate(authStr, { session: false })(req, res, next);
}




// REGISTER
export async function register(req, res, next) {
  const signupOptions = {
    usernameField: 'email',
    passwordField: 'password',
    passReqToCallback: true,
  };

  const signup = new LocalStrategy(signupOptions, async (request, email, password, callback) => {
    try {
      if (await usersRepository.getUser({ email })) return callback('User already registered', false);
      request.body.salt = crypto.randomBytes(16).toString('hex');
      crypto.pbkdf2(password, request.body.salt, 310000, 32, 'sha256', async (err, hashedPassword) => {
        if (err) return callback(err);
        try {
          request.body.password = hashedPassword.toString('hex');
          const createUser = await usersRepository.createUser(validateUser.register(request.body));
          const token = makeToken(createUser);
          return callback(null, token);
        } catch (error) {
          return callback(error.message);
        }
      });
    } catch (error) {
      return callback(error);
    }
  });

  passport.authenticate(signup, { session: false }, (err, token, info) => {
    if (err) return res.status(400).json({ message: err });
    if (token) return res.json({ token });
  })(req, res, next);
}




// LOGIN
export async function login(req, res, next) {
  const signinOptions = {
    usernameField: 'email',
    passwordField: 'password',
  };

  const signin = new LocalStrategy(signinOptions, async (email, password, callback) => {
    try {
      const getUser = await usersRepository.getUser({ email });
      if (!getUser) return callback('User not found', false);
      crypto.pbkdf2(password, getUser.salt, 310000, 32, 'sha256', async (err, hashedPassword) => {
        if (err) return callback(err);
        try {
          if (!crypto.timingSafeEqual(Buffer.from(getUser.password, 'hex'), hashedPassword)) {
            return callback('Incorrect username or password', null);
          };
          const token = makeToken(getUser);
          return callback(null, token);
        } catch (error) {
          return callback(error.message);
        }
      });
    } catch (error) {
      return callback(error);
    }
  });

  passport.authenticate(signin, { session: false }, (err, token, info) => {
    if (err) return res.status(400).json({ message: err });
    if (token) return res.json({ token });
  })(req, res, next);
}



/*
export async function loginWithGithub(req, res, next) {
  const githubOptions = {
    clientID: process.env.GITHUB_CLIENT_ID,
    clientSecret: process.env.GITHUB_CLIENT_SECRET,
    callbackURL: '',
  };

  const githubStr = new GitHubStrategy(githubOptions, async (accessToken, refreshToken, profile, callback) => {
    const getUser = await usersRepository.getUser({ gitHubId: profile.id })
  });

  passport.authenticate(githubStr, { session: false, scope: ['user:email'] }, (err, token, info) => {
    if (err) return res.status(400).json({ message: err });
    if (token) return res.json({ token });
  })(req, res, next);
}
*/
