import models from '../models/index';
const Category = models.Category;

export default {
  create(req, res) { 
     
     return Category
      .create({
        title: req.body.title
      })
      .then(category => res.status(201).send({category, message: 'Category Created Successfully'}))
      .catch(error => res.status(400).send(error));

},

list(req, res) {
    return Category
    .all()
    .then(category => res.status(200).send({categories:category, message:'All categories'}))
    .catch(error => res.status(400).send(error));
  },

 retrieve(req, res) {
     return Category
     .findById(req.params.catId)
     .then(category => {
      if (!category) {
        return res.status(404).send({
          message: 'Category Not Found',
        });
      }
      return res.status(200).send(category);
    })
    .catch(error => res.status(400).send(error));

  },

   update(req, res) {
   
  return Category
    .findById(req.params.catId)
    .then(category => {
      if (!category) {
        return res.status(404).send({
          message: 'Category Not Found',
        });
      }
      return category
        .update({
          title: req.body.title || book.title,
        })
        .then(() => res.status(200).send(category))  // Send back the updated todo.
        .catch((error) => res.status(400).send(error.toString()));
    })
    .catch((error) => res.status(400).send(error.toString()));
  },

  destroy(req, res) {
  return Category
    .findById(req.params.catId)
    .then(category => {
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
    .catch(error => res.status(400).send(error));
  },


};