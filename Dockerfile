# Usa un'immagine base di Node.js
FROM node:14

# Imposta la directory di lavoro
WORKDIR /app

# Copia i file package.json e package-lock.json
COPY package*.json ./

# Installa le dipendenze
RUN npm install

# Copia il resto dei file dell'applicazione
COPY . .

# Espone la porta su cui l'applicazione sarà in esecuzione
EXPOSE 5000

# Comando per avviare l'applicazione
CMD ["npm", "start"]
