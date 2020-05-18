
exports.up = function(knex) {
  return knex.schema.table('recipes', table => {
      table.timestamps(true,true)
  })
};

exports.down = function(knex) {
  return knex.schema.table('recipes', table => {
    table.dropTimestamps()
  })
};
