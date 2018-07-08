# Mutations
The mutations make changes to the database records returning a value based on a code and it's content which is usually the id of the changed record. These mutations are based the each root entity and these are:
* **Account**
  * **Login** - checks if the email and password are correct returning a token or a code error
  * **Logout** - checks if there is a token and if it does exists, deletes it in order to negate further actions with it
  * **Change Password** - based on a inputed password, it changes the account password and sends an email to the user
  * **Recover Password** - generates a new password, changes the old one and sends it to the user
  * **Clear Tokens** - removes all of the tokens. Only an administrator can do it

* **Examinee**
  * **Register** - Registers a new examinee creating an account with it's email and the current record with it's student number and course. Afterwards, the system sends an email to the user with the new password
  * **Update** - Updates an examinee's name and identification
  * **Delete** - Sets a examinee as deleted
  * **Register Current Record** - registers a record for this year
  * **Update Record** - Updates the record's course and student number
  * **Delete Record** - Sets a record as deleted
  * **Renew Record** - Takes the last record's data and creates a new record with a new year but the same course and student number

* **Examinee**
  * **Register** - Registers a new examinee creating an account with it's email and the current record. Afterwards, the system sends an email to the user with the new password
  * **Update** - Updates an examiner's name and identification
  * **Delete** - Sets a examiner as deleted
  * **Register Current Record** - registers a record for this year
  * **Delete Record** - Sets a record as deleted
  
* **Room**
  * **Register** - registers an new room setting up a new record as well
  * **Update** - updates a room's record
  * **Delete** - sets a room as deleted
  * **Register Current Record** - registers a record for this year
  * **Delete Record** - sets a record as deleted

* **Subject**
  * **Register** - registers an new subject setting up a new record as well
  * **Update** - updates a subject's record
  * **Delete** - sets a subject as deleted
  * **Register Current Record** - registers a record for this year
  * **Delete Record** - sets a record as deleted

* **Test** -
  * **Register** - registers an new test setting up a test record on the subject's current record
  * **Add Room to Test** - register an room for the test, registering a test record on the room's current record as well
  * **Add Examinee to Test** - register an examinee for the test, registering a test record on the examinee's current record as well
  * **Add Examiner to Test** - register an examiner for the test, registering a test record on the examiner's current record as well
  * **Set Examiner To Test Room** - changes the test's examiner record to define a specific room where the examiner will be
  * **Set Examinee To Test Room** - changes the test's examinee record to define a specific room where the examinee will be and it's seat.

* **User**
  * **Check in** - updates the test's examinee record with the sheet number, and a presence value composed by the test's id, the sheet number, the examiner's id, the examinee's id and the current date.
  * **Confirm presence** - the examinee confirms that (s)he will be attending the test


