exports.seed = function (knex) {
  // Deletes ALL existing entries and resets ids
  return knex('simpsons')
    .truncate()
    .then(function () {
      return knex('simpsons').insert([
        { name: 'Homer' },
        { name: 'Marge' },
        { name: 'Bart' },
      ]);
    });
};
