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
    table.integer('tel_obj').notNullable();
    table.integer('focal_length').notNullable();
    table.integer('focal_ratio').notNullable();
    table.string('img_sensor').notNullable();
    table.integer('img_array_w').notNullable();
    table.integer('img_array_h').notNullable();
    table.decimal('pix_sz', 8, 2).notNullable();
    table.decimal('img_sz_w', 8, 2).notNullable();
    table.decimal('img_sz_h', 8, 2).notNullable();
    table.decimal('fov_w', 8, 2).notNullable();
    table.decimal('fov_h', 8, 2).notNullable();
    table.integer('target_exp').notNullable();
    table.integer('total_exposures').notNullable();
    table.timestamps(true, true);
  });
};

exports.down = function(knex) {
  return knex.schema.dropTable('projects');
};
