
exports.seed = function(knex) {
  return knex('units').del()
    .then(function () {
      return knex('units').insert([
        {unit: 'grams'},
        {unit: 'liters'},
        {unit: 'each'},
        {unit: 'pound'},
      ]);
    });
};
