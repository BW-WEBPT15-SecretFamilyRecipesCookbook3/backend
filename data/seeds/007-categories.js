
exports.seed = function(knex) {
  return knex('categories').del()
    .then(function () {
      return knex('categories').insert([
        {category_name: 'Breakfast'},
        {category_name: 'Lunch'},
        {category_name: 'Dinner'},
        {category_name: 'Dessert'},
        {category_name: 'Side'},
        {category_name: 'Main'},
        {category_name: 'Appetizer'},
        {category_name: 'Vegetable'},
        {category_name: 'Chicken'},
        {category_name: 'Pork'},
        {category_name: 'Beef'},
        {category_name: 'Quick'},
        {category_name: 'Snack'}
      ]);
    });
};
