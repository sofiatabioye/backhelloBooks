module.exports = {
  production: {
    username: "ivtdlfcagsmhxl",
    password: "394932067c4d4ee00f8c48c81add2d378bfc5ce3b299b1b21e950c68336eeff8",
    database: "d5nh0gllrho08g",
    host: "ec2-23-21-92-251.compute-1.amazonaws.com",
    dialect: "postgres",
    dialectOptions: {
      ssl: true
    },
    port: 5432
  },

  test: {
    username: "userhello",
    password: "ThePassword$",
    database: "hellobooks_test",
    host: "127.0.0.1",
    port: 5432,
    dialect: "postgres"
  },

  development: {
    username: "postgres",
    password: "hello",
    database: "postgres",
    host: "127.0.0.1",
    port: 5432,
    dialect: "postgres"
  }

};
