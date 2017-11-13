
exports.up = function(knex, Promise) {
  return knex.schema.alterTable('projects', (table) => {

    table.string('ota').notNullable();

    table.string('cam').notNullable();

  });
};

exports.down = function(knex, Promise) {

};
