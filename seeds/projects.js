
exports.seed = function(knex) {
  return knex('projects').del()
    .then(() => {
      // Inserts seed entries
      return knex('table_name').insert([{
        id: 1,
        name: 'North Americal Nebula',
        object: 'NGC 7000',
        admin_user_id: 1,
        cells: 9,
        uncom_cells: 1,
        matrix: '3x3',
        created_at: new Date('2016-06-29 14:26:16 UTC'),
        updated_at: new Date('2016-06-29 14:26:16 UTC')
      }]);
    })
    .then(() +> {
      return knex.raw(
        "SELECT setval('projects_id_seq', (SELECT MAX(id) FROM projects));"
      );
    });
};
