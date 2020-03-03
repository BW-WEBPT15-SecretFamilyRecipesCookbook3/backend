
exports.seed = function(knex) {
  return knex('tags').del()
    .then(function () {
      return knex('tags').insert([
        {tag: 'Breakfast'},
        {tag: 'Lunch'},
        {tag: 'Dinner'},
        {tag: 'Dessert'},
        {tag: 'Side'},
        {tag: 'Main'},
        {tag: 'Appetizer'},
        {tag: 'Vegetable'},
        {tag: 'Chicken'},
        {tag: 'Pork'},
        {tag: 'Beef'},
        {tag: 'Quick'},
        {tag: 'Snack'}
      ]);
    });
};
