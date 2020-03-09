
exports.up = function(knex) {
  return knex.schema.table('recipes', table => {
      table.string('img_url')
  })
};

exports.down = function(knex) {
  return knex.schema.table('recipes', table => {
      table.dropColumn('img_url')
  })
};
