const Token = require('../../DataAccess/Accounts/Token');
const decode = require('jwt-decode');
const jsonwebtoken = require("jsonwebtoken");
const Account = require('../../DataAccess/Accounts/Account');
const msg = require('../../Config/messages');
const roles = require('../../Config/roles');

function sendEmail(email, subjectText, content){
    var nodemailer = require('nodemailer');
    var transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: 'vigilsmartteam@gmail.com',
        pass: 'vigil1234team'
      }
    });

    var mailOptions = {
        from: 'vigilsmartteam@gmail.com',
        to: email,
        subject: subjectText,
        text: content
      };
      
      transporter.sendMail(mailOptions, function(error, info){
        if (error) {
          console.log(error);
        } else {
        }
      });
}

function generateRandomPassword(){
    return Math.random().toString(36).replace(/[^a-z0-9]+/g, '').substr(0, 7);
}

function sendNewAccountEmail(email, password){
    var content = "Welcome to Vigil, your smart test vigilance system.\n\n"+
                  "Your login data is:\n"+
                  "   Username: "+email+"\n"+   
                  "   Password: "+password+"\n\n"+
                  "Best regards,\n The Vigil Team";
    sendEmail(email, "Welcome to Vigil", content)
}

function sendRecoveryEmail(email, password){
    var content = "Hi there.\n\n"+
                  "It seems you lost your password:\n"+
                  "The new one is "+password+"\n\n"+
                  "Best regards,\n The Vigil Team";
    sendEmail(email, "Password Recovery", content)
}

function sendPasswordChangeEmail(email, password){
    var content = "Hi there.\n\n"+
                  "It seems you changed your password:\n"+
                  "The new one is "+password+"\n\n"+
                  "Best regards,\n The Vigil Team";
    sendEmail(email, "Password Change", content)
}

function getCurrentYear(){
    var date = new Date();
    var currentYear=date.getUTCFullYear();
    if(date.getUTCMonth()<8)
        currentYear = (currentYear -1)+"/"+currentYear;
    else
        currentYear = currentYear + "/" +(currentYear+1);  
    return currentYear;
}


async function isAdmin(token){
    return new Promise(function(resolve, reject){
        Token.search(token).then(function(tokenItem){
            var decoded = decode(token);
            resolve(tokenItem && decoded.role==roles.ADMINISTRATOR);
        }).catch({code:msg.TOKEN_NOT_EXISTS});
    });
}

async function isExaminer(token){
    return new Promise(function(resolve, reject){
        Token.search(token).then(function(tokenItem){
            var decoded = decode(token);
            resolve(tokenItem && decoded.role == roles.EXAMINER)
        }).catch({code:msg.TOKEN_NOT_EXISTS});
    });
}

async function isExaminee(token){
    return new Promise(function(resolve, reject){
        Token.search(token).then(function(tokenItem){
            var decoded = decode(token);
            resolve(tokenItem && decoded.role == roles.EXAMINEE)
        }).catch({code:msg.TOKEN_NOT_EXISTS});
    });
}

function createToken(account){
   return jsonwebtoken.sign({id:account._id, email:account.email, role:account.role}, "TUNACANCANTUCAN", {expiresIn:'1d'});
}

function validateAccount(email, password){
    return new Promise(function(resolve, reject){
        Account.search(email).then(function(account){
            account = account.content;
            if(!account) resolve({code: msg.ACCOUNT_NOT_EXISTS})
            if(account.password == password){
                var tokenValue = createToken(account);
                Token.create(tokenValue).then(resolve({code:msg.LOGIN_SUCCESSFUL, token:tokenValue})).catch(function(res){resolve(res)})
            }
            else resolve({code:msg.ACCOUNT_NOT_EXISTS});
        }).catch(function(err){reject(err)});
    });
}

function exists(list, key, id){
    var exist = false;
    list.forEach(function(item){
        if(item[key].toString() == id){
            exist=true;
        }
    });
    return exist;
}

module.exports ={
    sendNewAccountEmail,
    sendPasswordChangeEmail,
    sendRecoveryEmail,
    generateRandomPassword,
    getCurrentYear,
    isAdmin,
    isExaminee,
    isExaminer,
    createToken,
    validateAccount,
    exists
}   