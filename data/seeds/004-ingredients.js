
exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('ingredients').del()
    .then(function () {
      // Inserts seed entries
      return knex('ingredients').insert([
        {ingredient_name: 'butter'},
        {ingredient_name: 'sugar'},
        {ingredient_name: 'eggs'},
        {ingredient_name: 'flour'},
        {ingredient_name: 'peanut butter'},
        {ingredient_name: 'jam'},
        {ingredient_name: 'bread, sliced'},
        {ingredient_name: 'rice'},
        {ingredient_name: 'water'},
        {ingredient_name: 'salt'},
      ]);
    });
};
