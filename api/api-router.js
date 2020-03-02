const router = require('express').Router();

const restricted = require('../auth/restricted-middleware.js');
const authRouter = require('../auth/auth-router.js');
const usersRouter = require('../users/user-router.js');
const recipeRouter = require('../recipes/recipe-router.js');

// router.use('/restricted', restricted);
router.use('/auth', authRouter);
router.use('/users', restricted, usersRouter);
router.use('/recipes', restricted, recipeRouter);

router.get('/', (req, res) => {
  res.json({ api: "It's working! It's working!" });
});

module.exports = router;
