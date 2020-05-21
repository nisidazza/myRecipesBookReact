
exports.up = function(knex) {
  return knex.schema.table('recipes', table => {
      table.text('instructions')
  })
};

exports.down = function(knex) {
  return knex.schema.table('recipes', table => {
      table.dropColumn('instructions')
  })
};
