
exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('steps').del()
    .then(function () {
      // Inserts seed entries
      return knex('steps').insert([
        {recipe_id: 1, step_number: 3, instructions: 'Preheat oven to 350 degrees Farenheit.'},
        {recipe_id: 1, step_number: 1, instructions: 'Combine dry ingredients.'},
        {recipe_id: 1, step_number: 2, instructions: 'Mix in wet ingredients.'},
        {recipe_id: 1, step_number: 4, instructions: 'Pour batter into loaf pan.'},
        {recipe_id: 1, step_number: 5, instructions: 'Bake for a while.'},
        {recipe_id: 2, step_number: 1, instructions: 'Spread peanut butter on one slice of bread.'},
        {recipe_id: 2, step_number: 2, instructions: 'Spread jam on other slice of bread.'},
        {recipe_id: 2, step_number: 3, instructions: 'Combine slices.'},
      ]);
    });
};
