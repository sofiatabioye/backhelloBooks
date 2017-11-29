import models from '../models/index';

const BorrowStatus = models.BorrowStatus;
export default {
    canBorrow(req, res, next) {
        console.log("im here");
        const userLevel = req.level;
        const userId = req.userId;
        let goldCanBorrow = 9;
        let bronzeCanBorrow = 6;
        let silverCanBorrow = 3;
        BorrowStatus
            .findAndCountAll({
                where: { user_id: userId, returned: false }
            })
            .then((userBorrowed) => {
                if (userLevel === "Gold" && userBorrowed.count >= goldCanBorrow) {
                    res.status(401).send({ message: "Oops! You need to return some books first" });
                } else if (userLevel === "Bronze" && userBorrowed.count >= bronzeCanBorrow) {
                    res.status(401).send({ message: "Oops! You need to return some books first" });
                } else if ((userLevel === "Silver") && userBorrowed.count >= silverCanBorrow) {
                    res.status(401).send({ message: "Oops! You need to return some books first" });
                } else {
                    next();
                }
            })
            .catch(error => res.status(500).send(error));
    }


};
