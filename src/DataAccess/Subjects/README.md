# Subjects
These data access objects are used to deal with the Subject records, their yearly records and the test records.

## Subject
The subject DAO contains a set of functions for subject managing that include:
* Create - creates a new subject record using a unique name and a field. the result id is used to create the account
* Get - transforms a database record to an Subject DAO.
* Updated - updates an subject record through its Id, with a name and/or a field.
* Toggle - Activates / Deactivates an subject. If toggle is used, erase shouldn't be available.
* Erase - Deactivates an subject. If erase is used, toggle shouldn't be available.
* List - Lists all subjects.

## Subject Record
The subject Record DAO contains a set of functions for yearly subject records managing that include:
* Create - creates a new yearly subject record using an unique lective year.
* Get - transforms a database record to an Subject Record DAO.
* Updated - updates an yearly subject record through its Id, with an ective year.
* Toggle - Activates / Deactivates an yearly subject record. If toggle is used, erase shouldn't be available.
* Erase - Deactivates an  yearly subject record. If erase is used, toggle shouldn't be available.
* List - Lists all  yearly subject records.

## Subject Test
The subject Test DAO contains a set of functions for subject tests managing that include:
* Create - creates a test record using an unique lective year, course name and a student number.
* Get - transforms a database record to an Subject Test DAO.
* Updated - updates an yearly subject test record through its Id, with test id.
* Toggle - Activates / Deactivates an subject test. If toggle is used, erase shouldn't be available.
* Erase - Deactivates an  subject test. If erase is used, toggle shouldn't be available.
* List - Lists all subject test.