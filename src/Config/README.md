# Configurations

In order to manage app to server connections and other enumerator values, this folder contains the following:

### Connect.js
A single connection with a mLab MongoDB connection that's reused throughout the application.
Returns errors whenever they happen

### Messages.js
A set of Self-Explanatory messages that can be translated to a four digit code considering that:
* **Fist Digit** - the application
* **Second Digit** - the scope (Examinees, Examiners, Accounts, etc...)
* **Third Digit** - the sub-scope (For examinees, their records, tests and so on, being that 0 is the root)
* **Fourth Digit** - the action/error (Examinee does not exist or already exists, etc...)

### Roles.js
A set of roles that an account can assume:
* **0** - Administrator
* **1** - Examinee
* **2** - Examiner

### Test Type
A set of test types
* **0** - Exam
* **1** - Second exam
* **2** - Test
* **3** - Finalist's exam
