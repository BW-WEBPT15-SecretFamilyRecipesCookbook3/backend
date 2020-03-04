const db = require("../data/db-config.js");
//
// function find() {
//   return db("recipe_tags as rt")
//     .join("recipes as r", "recipe_id", "r.id")
//     .join("tags as t", "tag_id", "t.id")
//     .select(
//       "r.id",
//       "r.title",
//       "r.description",
//       "r.source",
//       "t.tag"
//     );
// }

function find() {
  return db('recipes');
}

function findById(id) {
  return db("recipes as r")
    // .join("recipe_ingredients as ri")
    // .join("units as u")
    // .join("ingredients as i")
    // .select("r.id", "r.name", "r.description")
    .where({ id })
}

function findUnitByName(unit) {
  return db('units').select('id').where({ unit });
}

function findTagByName(tag) {
  return db('tags').select('id').where({ tag });
}

function findIngredientByName(ingredient) {
  return db('ingredients').select('id').where({ ingredient });
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
  try {
    return await db("recipes").insert(recipe);
  } catch (err) {
    console.log(err);
  }
}

async function addStep(step) {
  try {
    return await db('steps').insert(step)
  } catch (err) {
    console.log(err);
  }
}

async function addRecipeIngredient(recipe_id, ingredient) {
  try {
    let [ingredient_id] = await findIngredientByName(ingredient.ingredient.toLowerCase());
    if (!ingredient_id) {
      [id] = await db("ingredients").insert({ingredient: ingredient.ingredient.toLowerCase()});
      ingredient_id = {id: id};
    }

    let [unit] = await findUnitByName(ingredient.unit.toLowerCase());
    if (!unit) {
      [id] = await db("units").insert({unit: ingredient.unit.toLowerCase()});
      unit = {id: id};
    }

    ingredient = {
      recipe_id: recipe_id,
      ingredient_id: ingredient_id.id,
      unit_id: unit.id,
      quantity: ingredient.quantity
    }

    return await db('recipe_ingredients').insert(ingredient);

  } catch (err) {
    console.log(err);
  }
}

async function addRecipeTag(recipe_id, tagName) {
  try {
    let [tag] = await findTagByName(tagName);
    if (!tag) {
      [id] = await db('tags').insert({tag: tagName});
      tag = {id: id}
    }
    tag = {
      tag_id: tag.id,
      recipe_id: recipe_id
    };
    return db('recipe_tags').insert(tag);
  } catch (err) {
    console.log(err);
  }
}

module.exports = {
  find,
  findById,
  getIngredients,
  getInstructions,
  getTags,
  addRecipe,
  addRecipeIngredient,
  addRecipeTag,
  addStep,
  findUnitByName,
  // addIngredient,
  // update,
  // remove,
};
