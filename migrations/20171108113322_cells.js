'use strict';

exports.up = function(knex) {
  return knex.schema.createTable('cells', (table) => {
    table.increments();
    // table.integer('proj_id').notNullable();
    // table.integer('user_id').notNullable();
    table.integer('pu_id');
    table.integer('proj_id').notNullable();
    table.string('cell_num').notNullable();
    table.decimal('center_ref_ra', 8, 5).notNullable();
    table.decimal('center_ref_dec', 8, 5).notNullable();
    table.string('status');
    table.string('url');
    table.timestamps(true, true);
  });
};

exports.down = function(knex) {
  return knex.schema.dropTable('cells');
};
