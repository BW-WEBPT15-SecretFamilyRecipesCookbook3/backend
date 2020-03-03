
exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('units').del()
    .then(function () {
      // Inserts seed entries
      return knex('units').insert([
        {unit_name: 'grams'},
        {unit_name: 'liters'},
        {unit_name: 'each'},
        {unit_name: 'pound'},
      ]);
    });
};
