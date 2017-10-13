
export default {

    // Checks if logged in user is admin
    canBorrow(req, res, next) {
        const userLevel = req.level;
        console.log(userLevel);
        if (userLevel === 'silver') {
            const message = 'You cannot borrow more than one book for now';
            res.status(401).send({ message });
        } else {
            next();
        }
    },


};
