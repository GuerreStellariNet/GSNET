const axios = require('axios');
const express = require('express');
const { google } = require('googleapis');
require('dotenv').config();

const app = express();
app.use(express.json());

app.post('/webhook', async (req, res) => {
  try {
    console.log("Request headers:", req.headers);
    console.log("Request body received:", req.body);

    if (!req.body || !req.body.queryResult || !req.body.queryResult.parameters) {
      console.log("Invalid request format");
      return res.status(400).send("Invalid request format");
    }

    const { queryResult } = req.body;
    const query = queryResult.parameters.query;

    const auth = new google.auth.GoogleAuth({
      credentials: JSON.parse(process.env.GOOGLE_APPLICATION_CREDENTIALS),
      scopes: ['https://www.googleapis.com/auth/cloud-platform']
    });

    const client = await auth.getClient();
    google.options({ auth: client });

    console.log("Making request to Google Custom Search");
    const response = await axios.get(`https://www.googleapis.com/customsearch/v1?key=${process.env.GOOGLE_API_KEY}&cx=90d22e418744f4392&q=${encodeURIComponent(query)}+site=guerrestellari.net`);

    console.log("Google Custom Search response:", response.data);
    const results = response.data.items.map(item => item.title).join(', ');

    const responseMessage = `Risultati trovati per '${query}': ${results}`;
    res.status(200).json({ fulfillmentText: responseMessage });
  } catch (error) {
    console.error("Errore nella gestione della richiesta:", error);
    res.status(500).send("Errore nella comunicazione con Google Custom Search.");
  }
});

module.exports = app;



