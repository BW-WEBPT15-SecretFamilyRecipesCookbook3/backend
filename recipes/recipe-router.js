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
if (req.body.recipe_name && req.body.description && req.body.source) {
  Recipes.addRecipe(req.body)
    .then(added => {
      res.status(201).json({ message: "Successfully added a recipe!", recipe_id: added });
    })
    .catch(err => {
      res.status(500).json({ message: "Failed to add recipe.", error: err });
    });
} else {
  res.status(400).json({ message: "Missing required field(s)." });
}
})

module.exports = router;
