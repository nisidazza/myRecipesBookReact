exports.up = function (knex) {
  return knex.schema.alterTable("ingredients", function (table) {
    table.unique("name");
  });
};

exports.down = function (knex) {
  return knex.schema.alterTable("ingredients", function (table) {
    table.dropUnique("name");
  });
};
