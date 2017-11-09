
exports.seed = function(knex) {
  return knex('proj_user').del()
    .then(() => {
      // Inserts seed entries
      return knex('proj_user').insert([
        {
        id: 1,
        user_id: 1,
        proj_id: 1,
        created_at: new Date('2016-06-29 14:26:16 UTC'),
        updated_at: new Date('2016-06-29 14:26:16 UTC')
      },
      {
        id: 2,
        user_id: 2,
        proj_id: 1,
        created_at: new Date('2016-06-29 14:26:16 UTC'),
        updated_at: new Date('2016-06-29 14:26:16 UTC')
      }]);
    })
    .then(() => {
      return knex.raw(
        "SELECT setval('projects_id_seq', (SELECT MAX(id) FROM proj_user));"
      );
    });
};
