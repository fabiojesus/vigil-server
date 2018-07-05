# Tests
These data access objects are used to deal with the Test records, their yearly records and the test records.

## Test
The test DAO contains a set of functions for test managing that include:
* Create - creates a new test record using a unique year, confirmation date, starting date, end date, subjectId, and a type. the result id is used to create the account
* Get - transforms a database record to an Test DAO.
* Updated - updates an test record through its Id, with an year, confirmation date, starting date, end date, subjectId, and/or a type
* Toggle - Activates / Deactivates an test. If toggle is used, erase shouldn't be available.
* Erase - Deactivates an test. If erase is used, toggle shouldn't be available.
* List - Lists all tests.

## Room Record
The room Record DAO contains a set of functions for room managing that include:
* Create - creates a new yearly test record using an roomId.
* Get - transforms a database record to an Test Room DAO.
* Updated - updates an yearly test record through its Id, with a room id.
* Toggle - Activates / Deactivates a room. If toggle is used, erase shouldn't be available.
* Erase - Deactivates a room. If erase is used, toggle shouldn't be available.
* List - Lists all  rooms registered on a test.

## Examinee Record
The examinee Record DAO contains a set of functions for examinee managing that include:
* Create - creates a new yearly test record using an examineeId.
* Get - transforms a database record to an Test Examinee DAO.
* Updated - updates an yearly test record through its Id, with a examinee id.
* Toggle - Activates / Deactivates a examinee. If toggle is used, erase shouldn't be available.
* Erase - Deactivates a examinee. If erase is used, toggle shouldn't be available.
* List - Lists all  examinees registered on a test.

## Examiner Record
The examiner Record DAO contains a set of functions for examiner managing that include:
* Create - creates a new yearly test record using an examinerId.
* Get - transforms a database record to an Test Examiner DAO.
* Updated - updates an yearly test record through its Id, with a examiner id.
* Toggle - Activates / Deactivates a examiner. If toggle is used, erase shouldn't be available.
* Erase - Deactivates a examiner. If erase is used, toggle shouldn't be available.
* List - Lists all  examiners registered on a test.