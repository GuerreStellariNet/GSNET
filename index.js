const express = require('express');
const bodyParser = require('body-parser');
const axios = require('axios');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(bodyParser.json());

app.get('/', (req, res) => {
  res.send('Server is running!');
});

app.post('/webhook', async (req, res) => {
  const { queryResult } = req.body;
  const argomento = queryResult.parameters.argomento;

  try {
    // Simuliamo una risposta per vedere se il webhook sta funzionando correttamente
    const responseMessage = `Hai cercato articoli su ${argomento}.`;
    res.json({ fulfillmentText: responseMessage });
  } catch (error) {
    res.status(500).send("Errore nella comunicazione con Rasa.");
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

