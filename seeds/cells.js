
exports.seed = function(knex) {
  return knex('cells').del()
    .then(() => {

      return knex('cells').insert([{
        id: 1,
        // proj_id: 1,
        // user_id: 2,
        pu_id: 1,
        proj_id: 1,
        cell_num: 'C3',
        center_ref_ra: 83.55693,
        center_ref_dec: -5.21359,
        status: 'Completed',
        url: 'www.somePlace.com',
        created_at: new Date('2016-06-29 14:26:16 UTC'),
        updated_at: new Date('2016-06-29 14:26:16 UTC')
      },
      {
        id: 2,
        // proj_id: 1,
        // user_id: 2,
        pu_id: 2,
        proj_id: 1,
        cell_num: 'A3',
        center_ref_ra: 83.55693,
        center_ref_dec: -5.56863,
        status: 'In-Progress',
        url: 'www.somePlace.com',
        created_at: new Date('2016-06-29 14:26:16 UTC'),
        updated_at: new Date('2016-06-29 14:26:16 UTC')
      },
      {
        id: 3,
        // proj_id: 1,
        // user_id: 2,
        pu_id: 3,
        proj_id: 1,
        cell_num: 'B2',
        center_ref_ra: 83.91196,
        center_ref_dec: -5.21359,
        status: 'Completed',
        url: 'www.someOtherPlace.com',
        created_at: new Date('2016-06-29 14:26:16 UTC'),
        updated_at: new Date('2016-06-29 14:26:16 UTC')
      }]);
    })
    .then(() => {
      return knex.raw(
        "SELECT setval('cells_id_seq', (SELECT MAX(id) FROM cells) +1);"
      );
    });
};
