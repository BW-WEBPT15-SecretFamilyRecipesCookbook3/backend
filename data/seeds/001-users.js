
exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('Users').del()
    .then(function () {
      // Inserts seed entries
      return knex('Users').insert([
        {email: 'auntjemima@wafflehouse.com', password: "pancakesyrup"}
      ]);
    });
};
