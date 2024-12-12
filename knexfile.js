module.exports = {
  development: {
    client: 'pg',
    connection: "postgres://localhost/astrompm_dev"
  },

  test: {
    client: 'pg',
    connection: "postgres://localhost/astrompm_dev"
  },

  production: {
    client: 'pg',
    connection: {
      connectionString: process.env.DATABASE_URL,
      ssl: {                           // added
        rejectUnauthorized: false
      }
    },
    pool: {                  // added
      min: 2,
      max: 10
    },
    acquireConnectionTimeout: 60000
  }
};
