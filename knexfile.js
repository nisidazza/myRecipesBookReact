// Update with your config settings.

module.exports = {
  development: {
    client: "postgresql",
    connection: {
      database: "127.0.0.1",
      user: "postgres",
      password: "n1s1d4123",
      database: "myRecipeBookReact"
    },
    debug: true,
    
    pool: {
      min: 2,
      max: 10
    },
    migrations: {
      tableName: "knex_migrations"
    }
  },

  production: {
    client: "postgresql",
    connection: process.env.DATABASE_URL,
    pool: {
      min: 2,
      max: 10,
      propagateCreateError: false
    },
    migrations: {
      tableName: "knex_migrations"
    }
  }
};
