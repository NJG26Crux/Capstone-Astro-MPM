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
    connection: process.env.DATABASE_URL,
    ssl: { 
      rejectUnauthorized: false 
    }
  }

};
