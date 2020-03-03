const db = require("../data/db-config.js");

function find() {
  return db("recipe_categories as rc")
    .join("recipes as r", "recipe_id", "r.id")
    .join("categories as c", "category_id", "c.id")
    .select(
      "r.id",
      "r.recipe_name",
      "r.description",
      "r.source",
      "c.category_name"
    );
}

function findById(id) {
  return db("recipes as r")
    // .join("recipe_ingredients as ri")
    // .join("units as u")
    // .join("ingredients as i")
    // .select("r.id", "r.name", "r.description")
    .where({ id })
}

function getIngredients(recipe_id) {
  return db("recipe_ingredients as ri")
    .join("ingredients as i", "ri.ingredient_id", "i.id")
    .join("units as u", "ri.unit_id", "u.id")
    .select("i.ingredient_name", "u.unit_name", "ri.quantity")
    .where({ recipe_id: recipe_id });
}

function getInstructions(recipe_id) {
  return db("steps")
    .where({ recipe_id: recipe_id })
    .orderBy("steps.step_number");
}

function getCategories() {
  return db('categories');
}

async function addRecipe(recipe) {
  const recipeData = {
    recipe_name: recipe.recipe_name,
    description: recipe.description,
    source: recipe.source
  };
  const [recipe_id] = await db("recipes").insert(recipeData);
  if (recipe.category) {
    const [category] = await db("categories")
      .select("id")
      .where("category_name", recipe.category);
    await db("recipe_categories").insert({
      recipe_id: recipe_id,
      category_id: category.id
    });
  }
  return recipe_id;
}

module.exports = {
  find,
  findById,
  getIngredients,
  getInstructions,
  getCategories,
  addRecipe,
  // addIngredient,
  // update,
  // remove,
};
