import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
const dotenv2 = dotenv.config();
const secret = process.env.TOKEN_SECRET;

export default {
	
	authorize(req, res, next){
		const auth = req.headers.authorization;
		const token = req.body.token || req.headers['x-access-token'] || auth;
		if (token){
			jwt.verify(token, secret, (err, decoded) => {
               console.log(err);
				if (err){
					const reply = 'You are not signed in'; 
					res.status(403).send({message: reply});   
				}
                else{
				const userRole = decoded.role;
				next();
				}
			})
		}
		else{
			res.status(412).send({message:'Token not provided'});
		}
	},

	
       
	
};