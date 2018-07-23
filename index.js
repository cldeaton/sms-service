const twilio            = require('twilio'),
      http              = require('http'),
      express           = require('express'),
      app               = express(),
      MessagingResponse = require('twilio').twiml.MessagingResponse,
      accountSid        = process.env.ACCOUNT_SID,
      authToken         = process.env.AUTH_TOKEN,
      client            = new twilio(accountSid, authToken),
      userNumber        = process.env.USER_NUMBER,
      twilioNumber      = process.env.TWILIO_NUMBER,
      messageBody       = 'Your phone has now been taken over. Your mission, should you choose to accept it, is to reply to this text message.';

// Creates outgoing message
client.messages.create({
    body: messageBody,
    to: userNumber,
    from: twilioNumber
})
.then((message) => console.log(message.sid));


// Sending out a sms response via webhook
app.post('/sms', (req, res) => {
  const twiml = new MessagingResponse();

  twiml.message('Thank you, your phone will now self destruct in 5 seconds');
  // twiml.message('5');
  // twiml.message('4');
  // twiml.message('3');
  // twiml.message('2');
  // twiml.message('1');
  // twiml.message('Boom!');

  res.writeHead(200, {'Content-Type': 'text/xml'});
  res.end(twiml.toString());
});

http.createServer(app).listen(1337, () => {
  console.log('Express server listening on port 1337');
});
