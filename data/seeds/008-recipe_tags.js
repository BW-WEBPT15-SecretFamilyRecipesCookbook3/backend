
exports.seed = function(knex) {
  return knex('recipe_tags').del()
    .then(function () {
      return knex('recipe_tags').insert([
        {recipe_id: 3, tag_id: 1},
        // {recipe_id: 3, tag_id: 2},
        // {recipe_id: 3, tag_id: 3},
        {recipe_id: 2, tag_id: 2},
        {recipe_id: 1, tag_id: 4}
      ]);
    });
};
