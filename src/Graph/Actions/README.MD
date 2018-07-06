
# Actions
Actions can be divided by two types. __Queries__ and __Mutations__. Queries are used to receive data such as an examinee list. Mutations are used to make changes to the data. All of the results are returned as a _{code, content}_ object and some of them are locked to specificic roles.

## Queries
Through queries you can obtain data related to one or all as a generic object:
* Examinee - can be seen by an administrator and an examinee (list locked to administration)
* Examiner - can be seen by an administrator and an examinee (list locked to administration)
* Room - can be seen by administration
* Subject - can be seen by administration
* Test - can be seen by administration

Then, there's a composed object that can be seen from a different perspective by whoever sees it:
* test by examinee - shows all the test properties related to his profile such as whether he is registered or, if so, where he will be seated (__TODO__)
* test by examiner - shows all the test properties including the examinees, whether they are registered and where they will be seated so that it's easier to print out tests sheets without wasting paper. (__TODO__)

## Mutations
Mutations are the hardest part to handle due to restrictions on data manipulation and how the changes chain together. These receive a set of arguments, explicit on the resolver mapping and the main difference between these and DAOS, besides it's composite aspect, is the fact that even though an error might occur, this is sent to the user as a message. These are as following:
* login (not bound to any role) Acts as token insert
* logout (not bound to any role) Acts as token release
* register room - automatically registers the current year. (bound to administration)
* register subject - automatically registers the current year. (bound to administration)
* register examinee - automatically registers the current year, an account and sends an email with a random password to the user. (bound to administration)
* register examiner - automatically registers the current year, an account and sends an email with a random password to the user. (bound to administration)
* register test - automatically adds the test to the current year of the subject (bound to administration)
* register current room record (bound to administration)
* register current subject record (bound to administration)
* register current examiner record (__TODO__) (bound to administration)
* register current examinee record - requires course and student number (__TODO__) (bound to administration)
* renew examinee record - creates a new record with the current year using the previouse course and student number (__TODO__) (bound to administration)
* assign examinee to test - sets an examinee to a room and a seat on a test (__TODO__) (bound to adminstration)
* assign examiner to test - sets an examiner to a room on a test (__TODO__) (bound to administration)
* assign room to test - sets a room on a test (__TODO__) (bound to administration)
* register examinee to test - set the examinee's registered field to true (bound to examinee) (__TODO_)
* register examinee presence - sets the examinee's presence to a value composed by it's identification, the examiner's identification and the sheet's number. (bound to the examiner) (__TODO__)

Updating records is a troublesome act that may cause further consistency problems. Due to that all changes on tests must reflect on it's dependee's and so on. In order to keep a record of what happens, there are two deletion options. Toggle, that allows the adminstration to roll back the value as long as it has not been repeated and erase that won't allow rollback. All of the mutations have a prevention methodology implemented that defines what the unique values for each entity should be to avoid repetion. These are properties that are indistinguishable from each other such as a room name or a student's identification number.  The updating mutations are as followed:

* update examiner and examinee - allows name change (__TODO__)
* update account - allows password change (__TODO__)
* update room - allows seat count change (__TODO__)
* update subject - allows field change (__TODO__)
* update test - allows most of the property values change, but it's easier to delete and make a new record (__TODO__)
* update records - no change allowed except on examinee's that allow to change the student number and course name (__TODO__)
* update test - no change (__TODO__)
* all toggles and erases are allowed, however it reflects on the lower levels:
** can't delete rooms with examiners (__TODO__)
** deleting examiners and examinees from a test requires removing the test from the examiner/examinee record. (__TODO__)
