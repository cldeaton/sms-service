const express = require("express");
const app = express();
const bodyParser = require('body-parser');
const twilio = require('twilio');
const crypto = require('crypto');


let accountSid = process.env.ACCOUNT_SID;
let authToken = process.env.AUTH_TOKEN;
let client = new twilio(
      accountSid,
      authToken
    );
let twilioNumber = process.env.TWILIO_NUMBER;
let userSecret = process.env.USER_SECRET;

console.log(userSecret);

app.use(bodyParser.json()); // for parsing application/json
app.use(bodyParser.urlencoded({ extended: true }));

app.post("/", function(req, res){
  let userNumber = req.body.userNumber;
  let messageBody = req.body.messageBody;
  let secret = req.body.userSecret;
  let secretMessage = userNumber + "," + secret;
  const cipher = crypto.createCipher('aes192', 'gammaray');
  const decipher = crypto.createDecipher('aes192', 'gammaray');
  let encrypted = cipher.update(secretMessage, 'utf8', 'hex');
  encrypted += cipher.final('hex');
  let decrypted = decipher.update(encrypted, 'hex', 'utf8');
  decrypted += decipher.final('utf8');
  let passcode = decrypted.split(",")[1];

  console.log(messageBody, userNumber, secret);
  // console.log(secret);
  console.log(encrypted);
  console.log(decrypted);
  console.log(secretMessage);
  console.log(passcode);

if(passcode === userSecret){
  client.messages.create({
      body: messageBody,
      to: userNumber,
      from: twilioNumber
  })
  .then((message) => console.log(message.sid));
  return res.send("OK");
} else {
  res.status(401);
  return res.send("You are not authorized to send this request!");
}

})


//listening Route
app.listen(process.env.PORT || 2000, function(){
    console.log("Server has started!!");
});
