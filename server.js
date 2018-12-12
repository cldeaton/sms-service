let express      = require("express"),
    app          = express(),
    bodyParser   = require('body-parser'),
    exec         = require("child_process").exec,
    twilio       = require('twilio'),
    accountSid   = process.env.ACCOUNT_SID,
    authToken    = process.env.AUTH_TOKEN,
    client       = new twilio(accountSid, authToken),
    userNumber   = process.env.USER_NUMBER,
    twilioNumber = process.env.TWILIO_NUMBER,
    messageBody  = process.env.MESSAGE_BODY;



app.use(bodyParser.json()); // for parsing application/json

app.post("/", function(req, res){
  console.log(messageBody, userNumber)
  client.messages.create({
      body: messageBody,
      to: userNumber,
      from: twilioNumber
  })
  .then((message) => console.log(message.sid));
})


//listening Route
app.listen(process.env.PORT || 2000, function(){
    console.log("Server has started!!");
});
