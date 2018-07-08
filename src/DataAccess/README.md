# Data Access
The data access layer is responsible for bridging the database with the application. These Data Access Objects are:
* **Accounts**
  * **Account** - Account CRUD functions
  * **Token** - Token CRUD functions
* **Examinees**
  * **Examinee** - Examinee CRUD functions
  * **Record** - The examinee's record CRUD functions
  * **Test** - Each of the examinee's records test CRUD functions 
* **Examiners**
  * **Examiner** - Examinee CRUD functions
  * **Record** - The examiner's record CRUD functions
  * **Test** - Each of the examiner's records test CRUD functions
* **Rooms**
  * **Room** - Room CRUD functions
  * **Record** - The room's record CRUD functions
  * **Test** - Each of the room's records test CRUD functions
* **Subjects**
  * **Subject** - Subject CRUD functions
  * **Record** - The subject's record CRUD functions
  * **Test** - Each of the subject's records test CRUD functions
* **Tests**
  * **Test** - Test CRUD functions
  * **Examinee** - The test's examinee CRUD functions
  * **Examiner** - The test's examiner CRUD functions
  * **Room** - The test's room CRUD functions

## Functions
Through the use of data objects to represent the database records, it uses a set of functions that include:
* **Create** - converts a data object to a record
* **Read** - converts a record to a data object
* **Update** - updates a record
* **Delete** - deletes a record permanently
* **List** - lists all the records

## Utilitaries
A set of functions that are recurrent during the application. Mainly it focus on:
### Remove self
removing the current value from a search

### Is Same
check if a record already has it's unique values on another record. 
##### Example 
check if a created user with email abc@email.com already exists

### Is Empty
checks if a list has any items that are not deleted