# Data Folder
This folder contains the Entities representation through a set of schemas that are used by mongoose.
These are also replicated on graphQL as it is a strongly typed language.

## Structure
The data structure is according to the following schematic

* Account
  * ProfileId - the user's profile being that administrators have none
  * Email - the user's email account
  * Password - the user's password
  * Role - the users role
  * Active - wheter the user account is activated or not
* Token
  * Token - the token value
* Examinee
  * name - the examinee's name
  * identification - the examinee's identification (civil identification number)
  * active - whether the examinee's record is active or not
  * records - a set of year records
    * year - the record's year
    * course - the student's course
    * studentNumber - the examinee's student number
    * active - whether the record is active or not
    * tests - a set of test records
      * testId - the test's id
      * active - wheter the test's record is active or not
* Examiner
* Room
* Subject
* Test
