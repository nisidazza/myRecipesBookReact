const ON_UPDATE_TIMESTAMP_FUNCTION = ` 
CREATE OR REPLACE FUNCTION on_update_timestamp()
RETURNS trigger AS $$
BEGIN
  NEW.created_at = OLD.created_at;
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ 
language 'plpgsql';
`

const DROP_ON_UPDATE_TIMESTAMP_FUNCTION = `DROP FUNCTION on_update_timestamp CASCADE`

exports.up = function(knex) {
  return knex.raw(ON_UPDATE_TIMESTAMP_FUNCTION)
};

exports.down = function(knex) {
  return knex.raw(DROP_ON_UPDATE_TIMESTAMP_FUNCTION)
};
