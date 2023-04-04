# Grandma-s-Cooking
Cette application de cuisine est construite avec Node.js et utilise mongoBD (cloud Atlas) 
comme base de données. Elle est déployée sur Docker en utilisant un bind mount pour la base de données et l'application,
de sorte que les modifications apportées sur l'hôte sont également reflétées dans le conteneur Docker.

## Installation
- Clonez le dépôt sur votre machine locale.

- Assurez-vous que Docker est installé sur votre machine.

- Ouvrez un terminal à la racine du projet et exécutez la commande suivante pour construire l'image Docker :
``` bash
docker build -t cooking-app 
```
- Créez un fichier .env à la racine du projet avec les variables d'environnement suivantes :
PGUSER=your_username
PGPASSWORD=your_password
PGDATABASE=cooking_db
PGHOST=your_host
Remplacez your_username, your_password et your_host par les informations de connexion à votre base de données mongoDB.

- Exécutez la commande suivante pour démarrer les conteneurs Docker :
``` bash
docker-compose up
```
Cela va démarrer les conteneurs pour l'application.

- Pour accéder à l'application, ouvrez un navigateur et accédez à http://localhost:3000.


## Utilisation
L'application de cuisine vous permet de rechercher des recettes, de les afficher et de les enregistrer dans votre liste de favoris.


## Maintenance
Si vous souhaitez apporter des modifications à l'application, vous pouvez exécuter la commande suivante pour reconstruire l'image Docker :
``` bash
docker build -t cooking-app
```

Si vous souhaitez arrêter les conteneurs Docker, exécutez la commande suivante :
```bash
docker-compose down
```
