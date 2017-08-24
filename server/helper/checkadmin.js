
export default {

  // Checks if logged in user is admin
  checkAdmin(req, res, next) {
    const userRole = req.locals;
    if (userRole !== 'admin') {
      const message = 'You do not have the privilege';
      res.status(401).send({ message });
    } else {
      next();
    }
  }
};
