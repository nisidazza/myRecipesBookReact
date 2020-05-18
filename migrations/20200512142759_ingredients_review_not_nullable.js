
exports.up = function(knex) {
  return knex.schema.table('ingredients', table => {
      table.bool('is_reviewed').notNullable().defaultTo(0).alter()
  })
};

exports.down = function(knex) {
  return knex.schema.table('ingredients', table => {
      table.bool('is_reviewed').nullable().alter()
  })
};
