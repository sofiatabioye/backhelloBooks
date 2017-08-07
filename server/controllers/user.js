const User = require('../models').User;
const jwt = require('jsonwebtoken');
module.exports = {
  create(req, res) {
    return User
      .create({
        username: req.body.username,
        email: req.body.email,
        password: req.body.password,
        role: "user",
        level: "silver",
        image: "none-for-now",
      })
      .then(user => res.status(201).send(user))
      .catch(error => res.status(400).send(error));
  },

  login(req, res) {
    return User
      .findOne({
        where: { username: req.body.username,
          password: req.body.password
        } })
      .then((user) => {
        if (!user) {
          res.send('User not found');
        } else {
          const myToken = jwt.sign({ user: user.id }, 
            'secret',
            { expiresIn: 24 * 60 * 60 });
          res.send(200, { token: myToken,
            userId: user.id,
            userName: user.username,
            role: user.role });
        }
      });
  },

/**  logout(req, res) {
    invalidToken.create({
      token.req.headers['x-access-token'],
    })
    .then( () => {
      res.send({message: 'You have logged out successfully'});
    })
    .catch( (error) => {
      res.status(401).send(error);
    });
  },
  **/
}