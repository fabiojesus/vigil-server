# Rooms
These data access objects are used to deal with the Room records, their yearly records and the test records.

## Room
The room DAO contains a set of functions for room managing that include:
* Create - creates a new room record using a unique name and a seat number. the result id is used to create the account
* Get - transforms a database record to an Room DAO.
* Updated - updates an room record through its Id, with an name and/or a seat number.
* Toggle - Activates / Deactivates an room. If toggle is used, erase shouldn't be available.
* Erase - Deactivates an room. If erase is used, toggle shouldn't be available.
* List - Lists all rooms.

## Room Record
The room Record DAO contains a set of functions for yearly room records managing that include:
* Create - creates a new yearly room record using an unique lective year.
* Get - transforms a database record to an Room Record DAO.
* Updated - updates an yearly room record through its Id, with an ective year.
* Toggle - Activates / Deactivates an yearly room record. If toggle is used, erase shouldn't be available.
* Erase - Deactivates an  yearly room record. If erase is used, toggle shouldn't be available.
* List - Lists all  yearly room records.

## Room Test
The room Test DAO contains a set of functions for room tests managing that include:
* Create - creates a test record using an unique lective year, course name and a student number.
* Get - transforms a database record to an Room Test DAO.
* Updated - updates an yearly room test record through its Id, with test id.
* Toggle - Activates / Deactivates an room test. If toggle is used, erase shouldn't be available.
* Erase - Deactivates an  room test. If erase is used, toggle shouldn't be available.
* List - Lists all room test.