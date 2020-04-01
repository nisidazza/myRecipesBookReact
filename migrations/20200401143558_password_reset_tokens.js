
exports.up = function(knex) {
  return knex.schema.createTable('password_reset_tokens', table => {
      table.integer('user_id')
      table.string('token')
      table.string('expire_date_time')
  })
};

exports.down = function(knex) {
  return knex.schema.dropTable('password_reset_tokens')
};
