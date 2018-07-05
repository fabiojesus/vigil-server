const Token = require('../../DataAccess/Accounts/Token');
const decode = require('jwt-decode');
const jsonwebtoken = require("jsonwebtoken");
const Account = require('../../DataAccess/Accounts/Account');
const msg = require('../../Config/messages');

function sendEmail(email, content){
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
        subject: 'Welcome to Vigil',
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
    sendEmail(email, content)
}

function sendNewAccountPassword(email, password){
    var content ="Hi there "+email+",\nYour new password is"+password+"\nBest regards,\n The Vigil Team";
    sendEmail(email, content);
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
            resolve(tokenItem && decoded.role=="administrator");
        });
    });
}

function isExaminer(token){
    var decoded = decode(token);
    return decoded.role == "examiner";
}

function isExaminee(token){
    var decoded = decode(token);
    return decoded.role == "examinee";
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
        }).catch(function(err){resolve(err)});
    });
}

module.exports ={
    sendNewAccountEmail,
    generateRandomPassword,
    sendNewAccountPassword,
    getCurrentYear,
    isAdmin,
    isExaminee,
    isExaminer,
    createToken,
    validateAccount
}   