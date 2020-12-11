const db = require('../data/dbConfig.js');

module.exports = {
  insert,
  update,
  remove,
  getAll,
  findById,
};

async function insert(simpsons) {
  // the second parameter here is of other databases, SQLite returns the id by default
  const [id] = await db('simpsons').insert(simpsons, 'id');

  return db('simpsons').where({ id }).first();
}

async function update(id, changes) {
  return null;
}

function remove(id) {
  return db('simpsons').where('id', Number(id)).del();
}

function getAll() {
  return db('simpsons');
}

function findById(id) {
  return null;
}
