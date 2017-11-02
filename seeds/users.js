'use strict';

exports.seed = function(knex) {
  return knex('users').del()
    .then(() => {
      return knex('users').insert([{
        id: 1,
        first_name: 'Jeff',
        last_name: 'Mobley',
        email: 'njg26crux@gmail.com',
        user_name: 'NJG26Crux',
        admin: 'true',
        hashed_password:
        // 1234
       '$2a$12$PjqxGtRWQ3oeh0v35F5h9ujOtrHxBujbe/czqNx9ksrb4VZI5cW36',
        created_at: new Date('2016-06-29 14:26:16 UTC'),
        updated_at: new Date('2016-06-29 14:26:16 UTC')
      }]);
    })
    .then(() => {
      return knex.raw(
        "SELECT setval('users_id_seq', (SELECT MAX(id) FROM users));"
      );
    });
};
