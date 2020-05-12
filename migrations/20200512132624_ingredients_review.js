
exports.up = function(knex) {
  return knex.schema.table('ingredients', table => {
      table.bool('is_reviewed')
  })
};

exports.down = function(knex) {
  return knex.schema.table('ingredients', table => {
      table.dropColumn('is_reviewed')
  })
};
