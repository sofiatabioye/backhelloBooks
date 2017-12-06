
import models from '../models/index';

const Category = models.Category;
export default {

  // Admin create category
  create(req, res) {
    const title = req.body.title;
    if (title === "") {
      return res.status(400).send({ message: 'Category title cannot be null' });
    }
    if (!isNaN(title)) {
      return res.status(400).send({ message: 'Category title cannot be numbers' });
    }
    Category
      .findOne({ where: { title } })
      .then((category) => {
        if (!category) {
          return Category
            .create({ title })
            .then(newCategory => res.status(201).send({ category: newCategory, message: 'Category Created Successfully' }))
            .catch(error => res.status(400).send(error));
        } else {
          res.status(409).send({ message: 'Category already exists' });
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
    const categoryId = req.params.catId;
    if (isNaN(categoryId) || categoryId < 0) {
      return res.status(400).send({
        message: 'Category Id must be a non-negative number',
      });
    }
    return Category
      .findById(categoryId)
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
    const categoryTitle = req.body.title;
    if (categoryTitle === null) {
      return res.status(400).send({ message: 'Category title cannot be null' });
    }
    if (!isNaN(categoryTitle)) {
      return res.status(400).send({ message: 'Category title cannot be numbers' });
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
            title: categoryTitle || category.title,
          })
          .then(() => res.status(200).send({ message: 'Category Updated Successfully', category: category })) // Send back the updated todo.
          .catch(error => res.status(400).send(error));
      })
      .catch(error => res.status(500).send(error));
  },

  // Admin delete category
  destroy(req, res) {
    const categoryId = req.params.catId;
    if (isNaN(categoryId) || categoryId < 0) {
      return res.status(400).send({
        message: 'Category Id must be a non-negative number',
      });
    }
    return Category
      .findById(categoryId)
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
