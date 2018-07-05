# Data Folder
This folder contains the Entities representation through a set of schemas that are used by mongoose.
These are also replicated on graphQL as it is a strongly typed language

##Structure
The data structure is according to the following schematic

|-- Account
|       |----- ProfileId - the user's profile being that administrators have none
|       |----- Email - the user's email account
|       |----- Password - the user's password
|       |----- Role - the users role
|       |----- Active - wheter the user account is activated or not
|
|-- Token (Even though it's in the Account)
|       |----- Token - the token value
|
|-- Examinee 
|       |----- 
|
|
Examiner
Room
Subject
Test