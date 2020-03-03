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

router.get('/:id/steps', async (req, res) => {
  try {
    const recipe = await Recipes.findById(req.params.id);
    console.log(recipe);
    if (recipe) {
      const steps = await Recipes.getInstructions(req.params.id);
      console.log(steps);
      res.status(200).json(steps);
    } else {
      res.status(404).json({ message: "There is no recipe with that ID." });
    }
  } catch (err) {
    res.status(500).json({ error: err });
  }
})

router.get('/:id/ingredients', async (req, res) => {
  try {
    const recipe = await Recipes.findById(req.params.id);
    console.log(recipe);
    if (recipe) {
      const list = await Recipes.getIngredients(req.params.id);
      console.log(list);
      res.status(200).json(list);
    } else {
      res.status(404).json({ message: "There is no recipe with that ID." });
    }
  } catch (err) {
    res.status(500).json({ error: err });
  }
})

router.get('/categories', (req, res) => {
  Recipes.getCategories()
    .then(list => {
      res.status(200).json(list);
    })
    .catch(err => {
      res.status(500).json({ message: "Failed to retrive categories." });
    })
})

module.exports = router;
