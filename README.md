# Jokes Bookmark App

 Manage a list of favourite Chuck Norris jokes by consuming the `Chuck Norris Database API` and using the `Mongo DB` to save the jokes locally.

 Frontend is designed and developed in `Angular Framework`. Backend APIs are constructed using `NodeJS`, `ExpressJS`, `MongoDB`.
 
 <img width="1276" alt="Application screenshot" src="https://user-images.githubusercontent.com/18414129/173233138-f74209f2-68c0-45a1-bc45-7a0bb31d7ca2.png">
 
 ## Frontend Angular App
 
  Frontend Angular App UI implemented using [Angular Material](https://material.angular.io/) UI design principles and its components. For **Unit testing** `Karma` used and for End to End (e2e) `Cypress` used.
  
  
 ## Backend Node App
 
  Backend Node App serves APIs using [ExpressJS](https://expressjs.com/) and [MongoDB](https://www.mongodb.com/). 
  
 > Available APIs are
   - `api/jokes` 
     - Get list of Jokes, `GET` request 
     - `Fetch` query from DB
   -  `api/joke`
      - Add a Joke to the DB, `POST` request
      - `Insert` query from DB
   -  `api/joke`
      - Delete one or more Jokes from the DB, `Delete` request
      - `Delete` query from DB
        
 ## Run the Application
 
  Before running this appliction, make sure you have installed the [Docker](https://www.docker.com/) on your system. To run the application, `cd` to your project and run the below command on your terminal `docker-compose up`.
  
## Tests
 
 To run the `test` on Frontend Application, `cd` to the project `frontend` folder and then run following command on your terminal:
   - Unit testing `ng test` 
   - End to End testing `ng e2e`


     
  
  
  
 
 
