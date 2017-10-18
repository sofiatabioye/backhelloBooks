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
        console.log("im here");
        var userLevel = req.level;
        var userId = req.userId;
        var goldCanBorrow = 9;
        var bronzeCanBorrow = 6;
        var silverCanBorrow = 3;
        BorrowStatus.findAndCountAll({
            where: { user_id: userId, returned: false }
        }).then(function (userBorrowed) {
            if (userLevel === "Gold" && userBorrowed.count >= goldCanBorrow) {
                res.status(401).send({ message: "Oops! You need to return some books first" });
            } else if (userLevel === "Bronze" && userBorrowed.count >= bronzeCanBorrow) {
                res.status(401).send({ message: "Oops! You need to return some books first" });
            } else if (userLevel === "Silver" && userBorrowed.count >= silverCanBorrow) {
                res.status(401).send({ message: "Oops! You need to return some books first" });
            } else {
                next();
            }
        }).catch(function (error) {
            return res.status(500).send(error);
        });
    }
};