const axios = require('axios');

setInterval(() => {
  axios.get('https://gsnet.onrender.com/')
    .then(() => console.log('Keep-alive request sent'))
    .catch(err => console.error('Error sending keep-alive request:', err));
}, 300000); // Ogni 5 minuti