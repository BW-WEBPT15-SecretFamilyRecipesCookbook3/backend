const router = require('express').Router();

const Users = require('./user-model.js');
const restricted = require('../auth/restricted-middleware.js');

router.get('/', (req, res) => {
  Users.find()
    .then(users => {
      res.json(users);
    })
    .catch(err => res.send(err));
});

router.delete('/:id', (req, res) => {
  if (req.decodedJwt.subject == req.params.id) {
    Users.remove(req.params.id)
      .then(removed => {
        if (removed) {
          res.status(200).json({ message: "User account deleted." });
        } else {
          res.status(404).json({ message: "Account does not exist." });
        }
      })
      .catch(err => {
        res.status(500).json({ message: "Failed to delete user account.", error: err })
      })
  } else {
    res.status(500).json({ message: "That isn't your account." });
  }
})

module.exports = router;
