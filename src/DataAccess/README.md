# Data Access
The data access layer is responsible for bridging the database with the application.

## Functions
Through the use of data objects to represent the database records, it uses a set of functions that include:
* Create - converts a data object to a record
* Read - converts a record to a data object
* Update - updates a record
* Delete - deletes a record permanently
* Toggle - toggles a record on or off
* List - lists all the records

## Utilitaries
A set of functions that are recurrent during the application. Mainly it focus on:
### Remove self
removing the current value from a search

### Is Same
check if a record already has it's unique values on another record. 
##### Example 
check if a created user with email abc@email.com already exists