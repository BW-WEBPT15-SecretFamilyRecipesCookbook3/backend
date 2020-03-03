const db = require("../data/db-config.js");

function find() {
  return db("recipe_tags as rt")
    .join("recipes as r", "recipe_id", "r.id")
    .join("tags as t", "tag_id", "t.id")
    .select(
      "r.id",
      "r.title",
      "r.description",
      "r.source",
      "t.tag"
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
    .select("i.ingredient", "u.unit", "ri.quantity")
    .where({ recipe_id: recipe_id });
}

function getInstructions(recipe_id) {
  return db("steps")
    .where({ recipe_id: recipe_id })
    .orderBy("steps.step_number");
}

function getTags() {
  return db('tags');
}

async function addRecipe(recipe) {
  const recipeData = {
    title: recipe.title,
    description: recipe.description,
    source: recipe.source
  };
  const [recipe_id] = await db("recipes").insert(recipeData);
  if (recipe.tag) {
    const [tag] = await db("tags")
      .select("id")
      .where("tag", recipe.tag);
    await db("recipe_tags").insert({
      recipe_id: recipe_id,
      tag_id: tag.id
    });
  }
  return recipe_id;
}

module.exports = {
  find,
  findById,
  getIngredients,
  getInstructions,
  getTags,
  addRecipe,
  // addIngredient,
  // update,
  // remove,
};
