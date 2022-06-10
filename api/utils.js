const requireUser = (req, res, next) => {
  if (!req.user) {
    next({
      name: 'MissingUserError',
      message: 'You must be logged in to perform this action',
    });
  }

  next();
};

const requireActiveUser = (req, res, next) => {
  if (req.user.active === false) {
    next({
      name: 'InactiveUserError',
      message: 'Must be an active user to create, update, or delete a post',
    });
  }

  next();
};

module.exports = {
  requireUser,
  requireActiveUser,
};
