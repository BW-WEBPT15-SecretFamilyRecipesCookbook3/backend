const db = require('../data/db-config.js');

function find() {
	return db('users').select('id', 'email');
}

function findBy(filter) {
	return db('users')
		.select('id', 'email', 'password')
		.where(filter);
}

function add(user) {
	return db('users')
		.insert(user, 'id')
		.then(ids => {
			const [id] = ids;
			return findById(id);
		});
}

function findById(id) {
  return db('users')
    .select('id', 'email')
    .where({ id })
    .first();
}

module.exports = {
  add,
  find,
  findBy,
  findById,
};
