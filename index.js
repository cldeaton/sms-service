const twilio            = require('twilio'),
      http              = require('http'),
      express           = require('express'),
      app               = express(),
      MessagingResponse = require('twilio').twiml.MessagingResponse,
      // response          = new MessagingResponse(),
      // message           = response.message(),
      accountSid        = 'AC0a899649e39ba4535a524840713f918a',
      authToken         = '8abe97d68c7aee8ae29f100f129c506c',
      client            = new twilio(accountSid, authToken),
      userNumber        = '+17046898590',
      twilioNumber      = '+17047410519',
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

  res.writeHead(200, {'Content-Type': 'text/xml'});
  res.end(twiml.toString());
});

http.createServer(app).listen(1337, () => {
  console.log('Express server listening on port 1337');
});
