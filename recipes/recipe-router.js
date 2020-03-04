const router = require('express').Router()

const Recipes = require('./recipe-model.js');

router.get('/', (req, res) => {
  Recipes.find()
    .then(recipes => {
      res.status(200).json(recipes);
    })
    .catch(err => res.send(err));
});

router.post('/', async (req, res) => {
  if (!req.body.title || !req.body.source || !req.body.description || !req.body.directions || !req.body.ingredients || !req.body.tags) {
   res.status(400).json({ message: "Missing required field(s)." });
  }
  try {
    const recipe = {
      title: req.body.title,
      description: req.body.description,
      source: req.body.source
    };

    const [added] = await Recipes.addRecipe(recipe);
    req.body.ingredients.forEach((ingredient) => {
      Recipes.addRecipeIngredient(added, ingredient);
    });

    req.body.directions.forEach(step => {
      step.recipe_id = added;
      Recipes.addStep(step);
    });

    req.body.tags.forEach((tag) => {
      Recipes.addRecipeTag(added, tag);
    });

    res.status(200).json({ message: "It's working!" });
  } catch (err) {
    res.status(500).json({ message: "Failed to add recipe.", error: err });
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
    if (recipe) {
      const list = await Recipes.getIngredients(req.params.id);
      res.status(200).json(list);
    } else {
      res.status(404).json({ message: "There is no recipe with that ID." });
    }
  } catch (err) {
    res.status(500).json({ error: err });
  }
})

router.get('/tags', (req, res) => {
  Recipes.getTags()
    .then(list => {
      res.status(200).json(list);
    })
    .catch(err => {
      res.status(500).json({ message: "Failed to retrive categories." });
    })
})

module.exports = router;
