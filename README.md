# CZ2006

## How to Use
Firstly, download [Docker desktop](https://www.docker.com/products/docker-desktop) and follow its
 instructions to install it. This allows us to start using Docker containers.
 
Create a local copy of this repository and run

    docker-compose build
    
This spins up Compose and builds a local development environment according to 
our specifications in [docker-compose.yml](docker-compose.yml). Keep in mind that 
this file contains settings for *development*, and not *production*.

After the containers have been built (this may take a few minutes), run

    docker-compose up
    
This one command boots up a local server for Flask (on port 5000)
and React (on port 3000). Head over to

    http://localhost:3000/ 
    
to view an incredibly underwhelming React webpage listing two fruits and their
respective prices. 
Though the apparent result is underwhelming, this data was retrieved through an API call
 to our Flask server, which can be accessed at

    http://localhost:5000/api/v1.0/test
    
The trailing '*/api/v1.0/test*' is simply for looks, and can be tweaked easily
in [api/app.py](api/app.py). The front-end logic for consuming our API is
contained in [client/src/index.js](client/src/index.js). The code contained within
these files simply exists to demonstrate how our front-end might consume our back-end
API.

Finally, to gracefully stop running our local servers, you can run
 
    docker-compose down

in a separate terminal window or press __control + C__.

## Update requirements.txt from conda
pip list --format=freeze > requirements.txt

## To reset/clean docker containers
docker-compose down
docker ps --all
docker volume prune
rm -rf *-data