
exports.up = function(knex, Promise) {
  return knex.schema.alterTable('projects', (table) => {

    table.text('imgMosiac'); //.notNullable()


  });
};

exports.down = function(knex, Promise) {
  return knex.schema.alterTable('projects', (table) => {

    table.dropColumn('imgMosiac');

  });
};
