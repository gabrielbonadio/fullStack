const express = require('express');
const organizationsRoutes = require('./modules/organizations/organizations.routes');

const routes = express.Router();

routes.get('/', (req, res) => {
  return res.json({ message: 'API Smart Workspace Online 🚀' });
});

routes.use('/organizations', organizationsRoutes);

module.exports = routes;