'use strict';

exports.up = function(knex) {
  return knex.schema.createTable('proj_user', (table) => {
    table.increments();
    table.integer('user_id').notNullable();
    table.integer('proj_id').notNullable();
    table.timestamps(true, true);
  });
};

exports.down = function(knex) {
  return knex.schema.dropTable('proj_user');
};
