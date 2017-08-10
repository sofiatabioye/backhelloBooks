//import dotenv from '../dotenv';

export default {
	
	checkAdmin(req, res, next){
        const userRole = userRole;
        if (userRole !== "admin"){
            const message =  "You do not have the privilege";
            res.status(401).send({message: message});
        }

        next();
    }
		

	
       
	
};