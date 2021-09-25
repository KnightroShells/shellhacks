const Sequelize = require("sequelize-cockroachdb");
const fs = require("fs");

const sequelize = new Sequelize({
  dialect: "postgres",
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  database: process.env.DB_DATABASE,
  dialectOptions: {
    options: {
      encrypt: true,
    },
    ssl: {
      ca: fs.readFileSync(process.env.CERT_PATH).toString(),
    },
  },
  logging: false,
});

module.exports = sequelize;
