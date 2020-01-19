
exports.up = function(knex) {
    return knex.schema.table('recipes', table => {
        table.string('title').notNullable().alter()
        table.string('category').notNullable().alter()
        table.bool('is_complete').notNullable().alter()

        table.bool('is_public')
    })
  
};

exports.down = function(knex) {
    return knex.schema.table('recipes', table => {
        table.string('title').nullable().alter()
        table.string('category').nullable().alter()
        table.bool('is_complete').nullable().alter()
        
        table.dropColumn('is_public')
    })
        
};
