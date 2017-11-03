'use strict';

exports.up = function(knex) {
  return knex.schema.createTable('projects', (table) => {
    table.increments();
    table.string('name').notNullable();
    table.string('object').notNullable();
    table.integer('admin_user_id').unique().notNullable();
    table.integer('cells').notNullable();
    table.string('matrix').notNullable();
    table.integer('uncom_cells').notNullable();
    table.timestamps(true, true);
  });
};

exports.down = function(knex) {
  return knex.schema.dropTable('projects');
};
