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
  if (!req.body.title || !req.body.source || !req.body.description || !req.body.directions || !req.body.ingredients) {
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
    // Support for tags
    // req.body.tags.forEach((tag) => {
    //   Recipes.addRecipeTag(added, tag);
    // });

    res.status(200).json({ message: "It's working!" });
  } catch (err) {
    res.status(500).json({ message: "Failed to add recipe.", error: err });
  }
});

router.put('/:id', (req, res) => {
  const values = req.body;
  if (values.title && values.description && values.source) {
    Recipes.updateRecipe(req.params.id, req.body)
      .then(updated => {
        res.status(200).json({ message: "Successfully updated recipe." });
      })
      .catch(err => {
        res.status(500).json(err);
      })
  } else {
    res.status(400).json({ message: "Missing required field(s)." });
  }
})

router.delete('/:id', (req, res) => {
  Recipes.removeRecipe(req.params.id)
  .then(deleted => {
    res.status(200).json(deleted);
  })
  .catch(err => {
    res.status(500).json(err);
  });
});

// router.get('/:id', async (req, res) => {
//   try {
//     const recipe = await Recipes.findById(req.params.id);
//     res.status(200).json(recipe);
//   } catch (err) {
//     res.status(500),json(err);
//   }
// });

router.get('/:id/steps', async (req, res) => {
  try {
    const recipe = await Recipes.findById(req.params.id);
    if (recipe) {
      const steps = await Recipes.getInstructions(req.params.id);
      res.status(200).json(steps);
    } else {
      res.status(404).json({ message: "There is no recipe with that ID." });
    }
  } catch (err) {
    res.status(500).json({ error: err });
  }
});

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
});

router.get('/:id/tags', async (req, res) => {
  try {
    const recipe = await Recipes.findById(req.params.id);
    if (recipe) {
      const list = await Recipes.getRecipeTags(req.params.id);
      const tags = list.map(item => item.tag);
      res.status(200).json(tags);
    } else {
      res.status(404).json({ message: "There is no recipe with that ID." });
    }
  } catch (err) {
    res.status(500).json({ error: err });
  }
});

router.get('/tags', (req, res) => {
  Recipes.getTags()
    .then(list => {
      res.status(200).json(list);
    })
    .catch(err => {
      res.status(500).json({ message: "Failed to retrive categories." });
    });
});

router.delete('/:id/ingredients/:ingred', async (req, res) => {
  try {
    const recipe = await Recipes.findById(req.params.id);
    if (recipe) {
      const removed = await Recipes.removeIngredient(req.params.id, req.params.ingred);
      console.log(removed);

      res.status(200).json({ message: "Successfully removed ingredient."});
    } else {
      res.status(500).json({ message: "Failed to remove ingredient." });
    }
  } catch (err) {
    res.status(500).json(err);
  }
});

router.delete('/:id/steps/:step', async (req, res) => {
  try {
      const removed = await Recipes.removeStep(req.params.step);
      console.log(removed);
      if (removed) {
        res.status(200).json({ message: "Successfully removed step."});
      } else {
        res.status(400).json({ message: "There is no step with that ID." });
      }
  } catch (err) {
    res.status(500).json(err);
  }
});

router.delete('/:id/tags/:tag', async (req, res) => {
  console.log(req.params);
  try {
    const recipe = await Recipes.findById(req.params.id);
    if (recipe) {
      const removed = await Recipes.removeRecipeTag(req.params.id, req.params.tag);
      console.log(removed);

      res.status(200).json({ message: "Successfully removed tag."});
    } else {
      res.status(500).json({ message: "Failed to remove tag." });
    }
  } catch (err) {
    res.status(500).json(err);
  }
});


module.exports = router;
