import models from '../models/index';

const BorrowStatus = models.BorrowStatus;
export default {
    canBorrow(req, res, next) {
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
                if (userLevel === "gold" && userBorrowed.count >= goldCanBorrow) {
                    res.status(403).send({ message: "Oops! You need to return some books first" });
                } else if (userLevel === "bronze" && userBorrowed.count >= bronzeCanBorrow) {
                    res.status(403).send({ message: "Oops! You need to return some books first" });
                } else if ((userLevel === "silver") && userBorrowed.count >= silverCanBorrow) {
                    res.status(403).send({ message: "Oops! You need to return some books first" });
                } else {
                    next();
                }
            })
            .catch(error => res.send(400).catch(error));
    }


};
