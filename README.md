# Mis Datos (MicroServices Nodejs)

## Preconditions: 
* Have a MySql database with their respective credentials; these must be configured in the *config-app.js* file in each of the microservices:
  > micro-x/src/config-app.js
* Create a database with what is specified in the file *estructure.sql*
* Download the libraries for each microservice, using the command: `npm install` in the directory
  > micro-x/

## Execution: 
To run a microservice you must run the following command at the root of each one:
  > `npm run dev`

Here is a list of the ports that you use for each microservice: 
 http://localhost:{Port}
 
| Microservices   | Port |
| :-------------: |:----:|
| User            | 3000 |
| Authentication  | 3001 |
| Historic        | 3003 |
| Points          | 3004 |
| Document        | 3005 |
| Transaction     | 3006 |
| Business transaction  | 3007 |

## Test
If you want to test the microservices, you can use the *Leal.postman_collection.json* file and import it into the Postman. ( *Be careful with headers, they use tokens*);
