# Utiliser une image de base Node.js
FROM node:16.16.0

# Créer un répertoire de travail :
WORKDIR /usr/src/app 

# Copier les fichiers de package.json et package-lock.json
COPY package*.json ./ 

# Installer les dépendances
RUN npm install

# Installer nodemon globalement
RUN npm install -g nodemon

# Copier le reste des fichiers de l'application
COPY . .

# Exposer le port sur lequel votre application s'exécute
EXPOSE 3000

# Commande pour démarrer l'application
CMD ["nodemon", "server.js"]
