
exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('recipe_categories').del()
    .then(function () {
      // Inserts seed entries
      return knex('recipe_categories').insert([
        {recipe_id: 3, category_id: 1},
        {recipe_id: 3, category_id: 2},
        {recipe_id: 3, category_id: 3},
        {recipe_id: 2, category_id: 2},
        {recipe_id: 1, category_id: 4}
      ]);
    });
};
