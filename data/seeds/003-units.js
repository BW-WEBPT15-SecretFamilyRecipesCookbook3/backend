
exports.seed = function(knex) {
  return knex('units').del()
    .then(function () {
      return knex('units').insert([
        {unit_name: 'grams'},
        {unit_name: 'liters'},
        {unit_name: 'each'},
        {unit_name: 'pound'},
      ]);
    });
};
