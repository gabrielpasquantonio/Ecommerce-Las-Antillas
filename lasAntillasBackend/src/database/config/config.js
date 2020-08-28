  module.exports = {
    development: {
      username: "root",
      password: null,
      database: "lasantillas",
      host: "localhost",
      dialect: "mysql",
      port: 3306
    },
    test: {
      username: "root",
      password: null,
      database: "database_test",
      host: "localhost",
      dialect: "mysql",
    },
    production: {
      username: "root",
      password: null,
      database: "database_production",
      host: "localhost",
      dialect: "mysql",
    },
  };
