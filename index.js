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
  try {
    const { queryResult } = req.body;
    const argomento = queryResult.parameters.argomento;

    // Simula una risposta per verificare il corretto funzionamento del webhook
    const responseMessage = `Hai cercato articoli su ${argomento}.`;
    res.json({ fulfillmentText: responseMessage });
  } catch (error) {
    console.error("Errore nella gestione della richiesta:", error);
    res.status(500).send("Errore nella comunicazione con Rasa.");
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});


