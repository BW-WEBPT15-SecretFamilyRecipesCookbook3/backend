
exports.seed = function(knex) {
  return knex('Users').del()
    .then(function () {
      return knex('Users').insert([
        {email: 'auntjemima@wafflehouse.com', password: "pancakesyrup"}
      ]);
    });
};
