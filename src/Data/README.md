# Data Folder
This folder contains the Entities representation through a set of schemas that are used by mongoose.
These are also replicated on graphQL as it is a strongly typed language.

## Structure
The data structure is according to the following schematic

#### Account
* ProfileId - the user's profile being that administrators have none
* Email - the user's email account
* Password - the user's password
* Role - the users role
* Active - wheter the user account is activated or not
#### Token
* Token - the token value
#### Examinee
* name - the examinee's name
* identification - the examinee's identification (civil identification number)
* isDeleted - whether the examinee's record is deleted or not
* records - a set of year records
  * year - the record's year
  * course - the student's course
  * studentNumber - the examinee's student number
  * isDeleted - whether the record is deleted or not
  * tests - a set of test records
    * testId - the test's id
    * isDeleted - wheter the test's record is deleted or not
#### Examiner
* name - the examiner's name
* identification - the examiner's identification (civil identification number)
* isDeleted - whether the examiner's record is deleted or not
* records - a set of year records
  * year - the record's year
  * isDeleted - whether the record is deleted or not
  * tests - a set of test records
    * testId - the test's id
    * isDeleted - wheter the test's record is deleted or not
#### Room
* name - the room's name
* seats - the ammount of seats in a room
* isDeleted - whether the room's reord is deleted or not
* records - a set of year records
  * year - the record's year
  * isDeleted - whether the record is deleted or not
  * tests - a set of test records
    * testId - the test's id
    * isDeleted - wheter the test's record is deleted or not
#### Subject
* name - the subjects's name
* field - the subject's field
* isDeleted - whether the room's reord is deleted or not
* records - a set of year records
  * year - the record's year
  * isDeleted - whether the record is deleted or not
  * tests - a set of test records
    * testId - the test's id
    * isDeleted - wheter the test's record is deleted or not
#### Test
* year - the year when the test is being taken
* confirmationDate - the confirmation date limit
* dateStart - when the test starts
* dateEnd - when the test ends
* subjectId - the subject's record id
* type - the test's type
* isDeleted - whether the test is deleted or not
* rooms - a set of room records
  * roomId - the room's record
  * isDeleted - wheter the room's deleted or not
* examinees - a set of examinee records
  * isDeleted - whether the record is deleted or not
  * examineeId - the examinee's record id
  * roomId - the room where the examinee will be seated
  * seat - the seat where the user will be seated
  * registered - whether he is registered for the test
  * sheetNumber - the number for the seet the examinee's using
  * presence - a built value that sets the examinee, the sheet and the examiner
* examiners - a set of examiner records
  * roomId - where the examiner will be
  * isDeleted - wheter the examiner record is isDeleted
  * examinerId - the examiner's record
