const twilio            = require('twilio'),
      accountSid        = process.env.ACCOUNT_SID,
      authToken         = process.env.AUTH_TOKEN,
      client            = new twilio(accountSid, authToken),
      userNumber        = process.env.USER_NUMBER,
      twilioNumber      = process.env.TWILIO_NUMBER,
      messageBody       = process.env.MESSAGE_BODY;

// Creates outgoing message
console.log(messageBody, userNumber)
client.messages.create({
    body: messageBody,
    to: userNumber,
    from: twilioNumber
})
.then((message) => console.log(message.sid));



// app.post("/", function(req, res){
//   client.messages.create({
//       body: req.messageBody,
//       to: userNumber,
//       from: twilioNumber
//   })
//   .then((message) => console.log(message.sid));
// })
