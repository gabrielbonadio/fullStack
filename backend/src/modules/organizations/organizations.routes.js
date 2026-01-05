const { Router } = require('express');
const OrganizationController = require('./organizations.controller');

const routes = Router();

routes.get('/', OrganizationController.index);
routes.post('/', OrganizationController.store);
routes.delete('/:id', OrganizationController.delete);
routes.put('/:id', OrganizationController.update);

module.exports = routes;