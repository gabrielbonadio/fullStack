const Sequelize = require('sequelize');

const sequelize = new Sequelize(
  process.env.DB_NAME || 'smart_workspace_db',
  process.env.DB_USER || 'admin',
  process.env.DB_PASS || 'admin_password',
  {
    host: process.env.DB_HOST || 'localhost',
    dialect: 'postgres',
    port: process.env.DB_PORT || 5432,
    logging: false,
  }
);

module.exports = sequelize;