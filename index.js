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
    const response = await axios.post('https://gsnet.vercel.app/webhooks/rest/webhook', {
      sender: 'user',
      message: argomento
    });
    const fulfillmentMessages = response.data.map(msg => ({ text: msg.text }));
    res.json({ fulfillmentMessages });
  } catch (error) {
    res.status(500).send("Errore nella comunicazione con Rasa.");
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
