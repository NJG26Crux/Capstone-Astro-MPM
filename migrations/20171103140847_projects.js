'use strict';

exports.up = function(knex) {
  return knex.schema.createTable('projects', (table) => {
    table.increments();
    table.string('name').notNullable();
    table.string('object').notNullable();
    table.integer('admin_user_id').unique().notNullable();
    table.integer('cells').notNullable();
    table.integer('cells_w').notNullable();
    table.integer('cells_h').notNullable();
    table.integer('uncom_cells').notNullable();
    table.string('tel_ota').notNullable();
    table.integer('focal_length').notNullable();
    table.integer('focal_ratio').notNullable();
    table.string('img_sensor').notNullable();
    table.integer('img_array_w').notNullable();
    table.integer('img_array_h').notNullable();
    table.integer('pix_sz').notNullable();
    table.integer('img_sz_w').notNullable();
    table.integer('img_sz_h').notNullable();
    table.integer('fov_w').notNullable();
    table.integer('fov_h').notNullable();
    table.integer('target_exp').notNullable();
    table.integer('total_exposures').notNullable();
    table.timestamps(true, true);
  });
};

exports.down = function(knex) {
  return knex.schema.dropTable('projects');
};
