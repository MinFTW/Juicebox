// Checks for authorized users and placed as a middleware parameter inside routes
const requireUser = (req, res, next) => {
  if (!req.user) {
    next({
      name: 'MissingUserError',
      message: 'You must be logged in to perform this action',
    });
  }

  next();
};

module.exports = {
  requireUser,
};
