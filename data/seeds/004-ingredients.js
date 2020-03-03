
exports.seed = function(knex) {
  return knex('ingredients').del()
    .then(function () {
      return knex('ingredients').insert([
        {ingredient: 'butter'},
        {ingredient: 'sugar'},
        {ingredient: 'eggs'},
        {ingredient: 'flour'},
        {ingredient: 'peanut butter'},
        {ingredient: 'jam'},
        {ingredient: 'bread, sliced'},
        {ingredient: 'rice'},
        {ingredient: 'water'},
        {ingredient: 'salt'},
      ]);
    });
};
