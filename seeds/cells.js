
exports.seed = function(knex) {
  return knex('cells').del()
    .then(() => {

      return knex('cells').insert([{
        id: 1,
        proj_id: 1,
        user_id: 1,
        cell_num: C3,
        center_ref_ra: 983.20,
        center_ref_dec: -1343.00,
        status: 'Completed',
        url: 'www.someplace.com',
        created_at: new Date('2016-06-29 14:26:16 UTC'),
        updated_at: new Date('2016-06-29 14:26:16 UTC')
      },
      {
        id: 2,
        proj_id: 1,
        user_id: 2,
        cell_num: B2,
        center_ref_ra: 983.20,
        center_ref_dec: -1343.00,
        status: 'Completed',
        url: 'www.someplace.com',
        created_at: new Date('2016-06-29 14:26:16 UTC'),
        updated_at: new Date('2016-06-29 14:26:16 UTC')
      }]);
    })
    .then(() => {
      return knex.raw(
        "SELECT setval('projects_id_seq', (SELECT MAX(id) FROM cells));"
      );
    });
};
