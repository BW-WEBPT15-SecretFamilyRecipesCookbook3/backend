const router = require('express').Router()

const Recipes = require('./recipe-model.js');

router.get('/', (req, res) => {
  Recipes.find()
    .then(recipes => {
      res.status(200).json(recipes);
    })
    .catch(err => res.send(err));
});

router.post('/', (req, res) => {
  Recipes.add(req.body)
    .then(added => {
      res.status(201).json({ message: "Successfully added a recipe!" });
    })
    .catch(err => {
      res.status(500).json({ message: "Failed to add recipe.", error: err });
    })
})

module.exports = router;
