
exports.seed = function(knex) {
  return knex('recipes').del()
    .then(function () {
      return knex('recipes').insert([
        {recipe_name: 'Pound Cake', description: "A delicious cake named for the measurements of its four ingredients", source: "England"},
        {recipe_name: 'PB&J', description: "A classic, and for good reason.", source: "Primary School"},
        {recipe_name: 'Gohan', description: "Cooked rice. A foundation for a great meal.", source: "Global"}
      ]);
    });
};
