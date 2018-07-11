# VIGIL
![alt text](./logo_card.png "Vigil Logo")
Welcome to vigil, your smart test vigilance system.
Vigil is a web server application created for the Internet Information Systems subject for the master's degree on Software Engineering.

## Hosting
![alt text](./heroku-card.png "Heroku Logo")

In order to allow external users to access the application, it was hosted on Heroku, a Platform-as-service that allows quick deployment through github, dropbox and their own git client. It has a debug trail that allows the developer to follow errors on the application and allows the user to add several plugins related to database, security and account management. For further information check [Heroku](https://www.heroku.com/)

## Database Management

Vigil uses a MongoDB database with the Mongoose's help to set the collections on objects as seen on the [data README](./src/Data/README.md)

### MongoDB
![alt text](./mongodb-card.png "MongoDB Logo")

MongoDB is a NoSQL database that uses collections instead of the usual tabular relationships. This means that it is possible to naturally stack elements inside others. Compass was used to create and manipulate a local database during development. For further information check [MongoDB](https://www.mongodb.com/)

### Mongoose
![alt text](./mongoose-card.png "Mongoose Logo")

Mongoose is a set of boilerplate functions that allow validation, casting and business logic on MongoDB collections. One of the main issues with mongoose implementation was the lack of functions to manage subcollections making mongoose almost useless. There was a need to create several functions to manage records and tests inside the main collections. For further information check [Mongoose](http://mongoosejs.com)

### Hosting
![alt text](./mlab-card.png "mLab Logo")

To host the database we used mLab, a database-as-a-service that provided us with a free sandbox licence through heroku. As a paid service, mLab displays increased security, backup and recovery, and monitoring tools. Some of these exist on the free version along with a document management application. For further information check [MLab](https://mlab.com/)

## Data Processing
![alt text](./graphql-card.png "graphQL Logo")

Instead of a REST service, vigil uses GraphlQL, a query language that interjoins a set of functions (actions) and a set of requests (queries and mutations) through resolvers (mappers). Although the user can access a console through the project's link, this is only optional.

