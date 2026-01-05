const Organization = require('./organizations.model');

class OrganizationService {

  async listAll() {
    return await Organization.findAll();
  }

  async create({ name, email }) {
    const existing = await Organization.findOne({ where: { email } });
    if (existing) {
      throw new Error('Já existe uma organização com este e-mail.');
    }

    return await Organization.create({ name, email });
  }

  async delete(id) {
    return await Organization.destroy({ where: { id } });
  }

  async update(id, { name, email }) {
    const org = await Organization.findByPk(id);
    if (!org) {
      throw new Error('Organização não encontrada');
    }
    return await org.update({ name, email });
  }
}

module.exports = new OrganizationService();