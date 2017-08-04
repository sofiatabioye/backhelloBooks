const Library = require('../../models').Library;
const Book = require('../../models').Book;
module.exports = {

  list(req, res) {
  return Library
    .findAll()
    .then(library => res.status(200).send(library))
    .catch(error => res.status(400).send(error.toString()));
  },
  
};