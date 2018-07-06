# Graph
Graph contains all of graphQL's logic in it. 

## What's GraphQL?
GraphQL is a query language and a server-side runtime to execute queries through a strongly typed language. No only does it use one endpoint instead of several, but also does all of the database processing and object managing on the server side, reducing the payload sent to the client and relieving it from further data manipulation.

## Composition
Graph's composed by three main segments. The __Actions__, which link the lower layers of the application with graphQL, the __Resolvers__, that map the actions with the commands sent to the server and the __Schemas__, that define what the commands' names are and what is expected of them.
