const db = require('../data/db-config.js');

function find() {
  return db('recipes')
    .select('id', 'recipe_name', 'description');
}

function findById(id) {
  return db('recipes as r')
    .join('recipe_ingredients as ri')
    .join('units as u')
    .join('ingredients as i')
    .select('r.id', 'r.name', 'r.description')
}

function getIngredients(recipe_id) {
	return db('recipe_ingredients as ri')
					.join('ingredients as i', 'ri.ingredient_id', 'i.id')
					.join('units as u', 'ri.unit_id', 'u.id')
					.select('i.ingredient_name', 'u.unit_name', 'ri.quantity')
					.where({recipe_id: recipe_id});
}

function getInstructions(recipe_id) {
	return db('steps')
			.where({recipe_id: recipe_id})
			.orderBy('steps.step_number');
}

function add(recipe) {
  return db('recipes')
    .insert(recipe)
}

module.exports = {
  find,
  findById,
  getIngredients,
  getInstructions,
  add,
  // update,
  // remove,
}
