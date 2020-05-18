const ON_UPDATE_TIMESTAMP_FUNCTION = ` 
CREATE TRIGGER recipes_updated_at
  BEFORE UPDATE ON recipes
  FOR EACH ROW
  EXECUTE PROCEDURE on_update_timestamp();
`

const DROP_ON_UPDATE_TIMESTAMP_FUNCTION = `DROP TRIGGER recipes_updated_at ON recipes`

exports.up = function(knex) {
  return knex.raw(ON_UPDATE_TIMESTAMP_FUNCTION)
};

exports.down = function(knex) {
  return knex.raw(DROP_ON_UPDATE_TIMESTAMP_FUNCTION)
};
