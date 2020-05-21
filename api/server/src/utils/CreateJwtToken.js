import jwt from 'jsonwebtoken';
import _reduce from 'lodash/reduce';

function createJwtToken(user) {
  const token = jwt.sign({
      data: _reduce(
        user,
        (result, value, key) => {
                 if (key !== 'password') {
                   result[key] = value;
                 }
                 return result;
                 },
        {}
        )},
    process.env.JWT_SECRET || '',
    {
      expiresIn: process.env.JWT_MAX_AGE,
      algorithm: 'HS256'
    });
    return token
}

export default createJwtToken;
