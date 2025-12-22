const express = require('express');
const app = express();

app.get('/', (req, res) => {
  res.status(200).json({ message: 'API Online' });
});

// Só inicia o servidor se não estivermos em modo de teste
if (require.main === module) {
  app.listen(3000, () => {
    console.log('Servidor rodando na porta 3000');
  });
}

module.exports = app;