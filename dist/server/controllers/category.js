'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _index = require('../models/index');

var _index2 = _interopRequireDefault(_index);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Category = _index2.default.Category;
exports.default = {

    // Admin create category
    create: function create(req, res) {
        var title = req.body.title;
        if (title === null) {
            res.status(400).send({ message: 'Category title cannot be null' });
        }
        Category.findOne({ where: { title: title } }).then(function (categories) {
            if (!categories) {
                return Category.create({ title: title }).then(res.status(201).send({ categories: categories, message: 'Category Created Successfully' })).catch(function (error) {
                    return res.status(400).send(error);
                });
            } else {
                res.status(200).send({ message: 'Category already exists' });
            }
        }).catch(function (error) {
            return res.status(500).send(error);
        });
    },


    // Admin view list of categories
    list: function list(req, res) {
        return Category.all().then(function (category) {
            return res.status(200).send({ categories: category, message: 'All categories' });
        }).catch(function (error) {
            return res.status(500).send(error);
        });
    },


    // Admin view category by Id
    retrieve: function retrieve(req, res) {
        return Category.findById(req.params.catId).then(function (category) {
            if (!category) {
                return res.status(404).send({
                    message: 'Category Not Found'
                });
            }
            return res.status(200).send(category);
        }).catch(function (error) {
            return res.status(500).send(error);
        });
    },


    // Admin update category title
    update: function update(req, res) {
        var Title = req.body.title;
        if (Title === null) {
            res.status(400).send({ message: 'Category title cannot be null' });
        }
        return Category.findById(req.params.catId).then(function (category) {
            if (!category) {
                return res.status(404).send({
                    message: 'Category Not Found'
                });
            }
            return category.update({
                title: Title || category.title
            }).then(function () {
                return res.status(200).send(category);
            }) // Send back the updated todo.
            .catch(function (error) {
                return res.status(400).send(error);
            });
        }).catch(function (error) {
            return res.status(500).send(error);
        });
    },


    // Admin delete category
    destroy: function destroy(req, res) {
        return Category.findById(req.params.catId).then(function (category) {
            if (!category) {
                return res.status(400).send({
                    message: 'Category Not Found'
                });
            }
            return category.destroy().then(function () {
                return res.status(204).send({ message: 'Category deleted successfully.' });
            }).catch(function (error) {
                return res.status(400).send(error);
            });
        }).catch(function (error) {
            return res.status(500).send(error);
        });
    }
};