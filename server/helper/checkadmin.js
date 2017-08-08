//import dotenv from '../dotenv';

module.exports = {
	
	checkAdmin(req, res, next){
        const userRole = req.locals;
        if (userRole !== "admin"){
            const message = {
                message: "You do not have the privilege"
            }
            return res.status(403).send(message);
        }
        console.log(userRole);
        next();
    }
		

	
       
	
};