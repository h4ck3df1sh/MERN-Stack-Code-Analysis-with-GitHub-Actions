import jwt from 'jsonwebtoken';

function makeToken(user) {
  const payload = {
    user: user._id,
  };
  const token = jwt.sign(payload, process.env.AUTH_SECRET_KEY, { expiresIn: process.env.AUTH_EXPIRES_IN });
  return token;
}

export { makeToken };