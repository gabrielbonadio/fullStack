// Arquivo: backend/src/server.js
const express = require('express');
const cors = require('cors');
const sequelize = require('./config/database');
const routes = require('./routes');

const app = express();

app.use(cors());
app.use(express.json());
app.use(routes);

const wait = (ms) => new Promise(resolve => setTimeout(resolve, ms));

const startServer = async () => {
  let retries = 5;
  while (retries > 0) {
    try {
      await sequelize.authenticate();
      console.log('✅ Conexão com o Banco estabelecida!');
      
      await sequelize.sync(); 
      
      app.listen(3000, () => {
        console.log('🚀 Server running on port 3000');
      });
      return;
    } catch (error) {
      console.log(`⏳ Aguardando banco... (${retries})`);
      retries -= 1;
      await wait(5000);
    }
  }
};

if (require.main === module) {
  startServer();
}

module.exports = app;