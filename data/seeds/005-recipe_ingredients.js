
exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('recipe_ingredients').del()
    .then(function () {
      // Inserts seed entries
      return knex('recipe_ingredients').insert([
        {recipe_id: 1, ingredient_id: 1, unit_id: 4, quantity: 1},
        {recipe_id: 1, ingredient_id: 2, unit_id: 4, quantity: 1},
        {recipe_id: 1, ingredient_id: 3, unit_id: 4, quantity: 1},
        {recipe_id: 1, ingredient_id: 4, unit_id: 4, quantity: 1},
        {recipe_id: 2, ingredient_id: 5, unit_id: 1, quantity: 15},
        {recipe_id: 2, ingredient_id: 6, unit_id: 1, quantity: 15},
        {recipe_id: 2, ingredient_id: 7, unit_id: 3, quantity: 2},
        {recipe_id: 3, ingredient_id: 8, unit_id: 4, quantity: 1},
        {recipe_id: 3, ingredient_id: 9, unit_id: 2, quantity: 0.75},
        {recipe_id: 3, ingredient_id: 10, unit_id: 1, quantity: 4},
      ]);
    });
};
