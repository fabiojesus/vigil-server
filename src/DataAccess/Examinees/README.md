# Examinees
These data access objects are used to deal with the Examinee records, their yearly records and the test records.

## Examinee
The examinee DAO contains a set of functions for examinee managing that include:
* Create - creates a new examinee record using a unique identification number and a name. the result id is used to create the account
* Get - transforms a database record to an Examinee DAO.
* Updated - updates an examinee record through its Id, with an identification and/or a name.
* Toggle - Activates / Deactivates an examinee. If toggle is used, erase shouldn't be available.
* Erase - Deactivates an examinee. If erase is used, toggle shouldn't be available.
* List - Lists all examinees.

## Examinee Record
The examinee Record DAO contains a set of functions for yearly examinee records managing that include:
* Create - creates a new yearly examinee record using an unique lective year, course name and a student number.
* Get - transforms a database record to an Examinee Record DAO.
* Updated - updates an yearly examinee record through its Id, with an ective year, course name and a student number.
* Toggle - Activates / Deactivates an yearly examinee record. If toggle is used, erase shouldn't be available.
* Erase - Deactivates an  yearly examinee record. If erase is used, toggle shouldn't be available.
* List - Lists all yearly examinee records.

## Examinee Test
The examinee Test DAO contains a set of functions for examinee tests managing that include:
* Create - creates a test record using an unique lective year, course name and a student number.
* Get - transforms a database record to an Examinee Test DAO.
* Updated - updates an yearly examinee test record through its Id, with test id.
* Toggle - Activates / Deactivates an examinee test. If toggle is used, erase shouldn't be available.
* Erase - Deactivates an  examinee test. If erase is used, toggle shouldn't be available.
* List - Lists all examinee test.