import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();
const secret = process.env.TOKEN_SECRET;

export default {
    // verifies user token to confirm that user is logged in
    authorize(req, res, next) {
        const auth = req.headers.authorization;
        const token = req.body.token || req.headers['x-access-token'] || auth;
        if (token) {
            jwt.verify(token, secret, (err, decoded) => {
                if (err) {
                    const reply = 'You are not signed in';
                    res.status(403).send({ message: reply });
                } else {
                    req.userId = decoded.user;
                    req.locals = decoded.role;
                    req.level = decoded.level;
                    req.email = decoded.email;
                    next();
                }
            });
        } else {
            res.status(412).send({ message: 'Token not provided' });
        }
    },


};
