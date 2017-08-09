//import dotenv from '../dotenv';

module.exports = {
	
	checkAdmin(req, res, next){
        if (userRole !== "admin"){
            const message =  "You do not have the privilege";
            res.status(403).send({message: message});
        }

        next();
    }
		

	
       
	
};