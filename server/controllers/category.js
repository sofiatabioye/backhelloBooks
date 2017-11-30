
import models from '../models/index';

const Category = models.Category;
export default {

    // Admin create category
    create(req, res) {
        const title = req.body.title;
        const categories = Category.all();
        if (title === null) {
            res.status(400).send({ message: 'Category title cannot be null' });
        }
        Category
            .findOne({ where: { title } })
            .then((category) => {
                if (!category) {
                    return Category
                        .create({ title })
                        .then(res.status(201).send({ categories: categories, message: 'Category Created Successfully' }))
                        .catch(error => res.status(400).send(error));
                } else {
                    res.status(200).send({ message: 'Category already exists' });
                }
            })
            .catch(error => res.status(500).send(error));
    },

    // Admin view list of categories
    list(req, res) {
        return Category
            .all()
            .then(category => res.status(200).send({ categories: category, message: 'All categories' }))
            .catch(error => res.status(500).send(error));
    },

    // Admin view category by Id
    retrieve(req, res) {
        return Category
            .findById(req.params.catId)
            .then((category) => {
                if (!category) {
                    return res.status(404).send({
                        message: 'Category Not Found',
                    });
                }
                return res.status(200).send(category);
            })
            .catch(error => res.status(500).send(error));
    },

    // Admin update category title
    update(req, res) {
        const Title = req.body.title;
        if (Title === null) {
            res.status(400).send({ message: 'Category title cannot be null' });
        }
        return Category
            .findById(req.params.catId)
            .then((category) => {
                if (!category) {
                    return res.status(404).send({
                        message: 'Category Not Found',
                    });
                }
                return category
                    .update({
                        title: Title || category.title,
                    })
                    .then(() => res.status(200).send(category)) // Send back the updated todo.
                    .catch(error => res.status(400).send(error));
            })
            .catch(error => res.status(500).send(error));
    },

    // Admin delete category
    destroy(req, res) {
        return Category
            .findById(req.params.catId)
            .then((category) => {
                if (!category) {
                    return res.status(400).send({
                        message: 'Category Not Found',
                    });
                }
                return category
                    .destroy()
                    .then(() => res.status(204).send({ message: 'Category deleted successfully.' }))
                    .catch(error => res.status(400).send(error));
            })
            .catch(error => res.status(500).send(error));
    },


};
