const OrganizationService = require('./organizations.dao');

module.exports = {
    async index(req, res) {
        try {
            const orgs = await OrganizationService.listAll();
            return res.json(orgs);
        } catch (error) {
            return res.status(500).json({ error: 'Erro ao buscar organizações' });
        }
    },

    async store(req, res) {
        try {
            const { name, email } = req.body;
            const newOrg = await OrganizationService.create({ name, email });
            return res.status(201).json(newOrg);
        } catch (error) {
            return res.status(400).json({ error: error.message });
        }
    },

    async delete(req, res) {
        try {
            const { id } = req.params;
            await OrganizationService.delete(id);
            return res.status(204).send();
        } catch (error) {
            return res.status(400).json({ error: error.message });
        }
    },

    async update(req, res) {
        try {
            const { id } = req.params;
            const { name, email } = req.body;
            const updatedOrg = await OrganizationService.update(id, { name, email });
            return res.json(updatedOrg);
        } catch (error) {
            return res.status(400).json({ error: error.message });
        }
    }
};