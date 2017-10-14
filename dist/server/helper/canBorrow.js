"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _index = require("../models/index");

var _index2 = _interopRequireDefault(_index);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var BorrowStatus = _index2.default.BorrowStatus;
exports.default = {
    canBorrow: function canBorrow(req, res, next) {
        var userLevel = req.level;
        var userId = req.userId;
        var goldCanBorrow = 9;
        var bronzeCanBorrow = 6;
        var silverCanBorrow = 3;
        BorrowStatus.findAndCountAll({
            where: { user_id: userId, returned: false }
        }).then(function (userBorrowed) {
            if (userLevel === "gold" && userBorrowed.count >= goldCanBorrow) {
                res.status(403).send({ message: "Oops! You need to return some books first" });
            } else if (userLevel === "bronze" && userBorrowed.count >= bronzeCanBorrow) {
                res.status(403).send({ message: "Oops! You need to return some books first" });
            } else if (userLevel === "silver" && userBorrowed.count >= silverCanBorrow) {
                res.status(403).send({ message: "Oops! You need to return some books first" });
            } else {
                next();
            }
        }).catch(function (error) {
            return res.send(400).catch(error);
        });
    }
};