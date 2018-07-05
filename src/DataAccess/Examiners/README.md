# Examiners
These data access objects are used to deal with the Examiner records, their yearly records and the test records.

## Examiner
The examiner DAO contains a set of functions for examiner managing that include:
* Create - creates a new examiner record using a unique identification number and a name. the result id is used to create the account
* Get - transforms a database record to an Examiner DAO.
* Updated - updates an examiner record through its Id, with an identification and/or a name.
* Toggle - Activates / Deactivates an examiner. If toggle is used, erase shouldn't be available.
* Erase - Deactivates an examiner. If erase is used, toggle shouldn't be available.
* List - Lists all examiners.

## Examiner Record
The examiner Record DAO contains a set of functions for yearly examiner records managing that include:
* Create - creates a new yearly examiner record using an unique lective year.
* Get - transforms a database record to an Examiner Record DAO.
* Updated - updates an yearly examiner record through its Id, with an ective year.
* Toggle - Activates / Deactivates an yearly examiner record. If toggle is used, erase shouldn't be available.
* Erase - Deactivates an  yearly examiner record. If erase is used, toggle shouldn't be available.
* List - Lists all  yearly examiner records.

## Examiner Test
The examiner Test DAO contains a set of functions for examiner tests managing that include:
* Create - creates a test record using an unique lective year, course name and a student number.
* Get - transforms a database record to an Examiner Test DAO.
* Updated - updates an yearly examiner test record through its Id, with test id.
* Toggle - Activates / Deactivates an examiner test. If toggle is used, erase shouldn't be available.
* Erase - Deactivates an  examiner test. If erase is used, toggle shouldn't be available.
* List - Lists all examiner test.