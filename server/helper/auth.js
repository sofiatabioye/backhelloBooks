//import dotenv from '../dotenv';
const dotenv = require('dotenv');
const jwt = require('jsonwebtoken');

dotenv.config();
module.exports = {
	
	authorize(req, res, next){
		const auth = req.headers.authorization;
		const token = req.body.token || req.headers['x-access-token'] || auth;
		if (token){
			jwt.verify(token, 'secret', (err, decoded) => {
               console.log(err);
				if (err){
					const message = {
						message: 'You are not signed in'
					}

					return res.status(403).send(message);
				}
				req.decoded = decoded;
				return next();
			})
		}
		else{
			res.status(412).send('Token not provided');
		}
	}
};