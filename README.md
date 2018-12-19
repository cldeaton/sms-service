# sms-service

#API-REF

##Description:
SMS-service is a node micro-service that receives information in the form of a post request made through its api and sends that information in a text message to a number provided by the user.

##Routes:

###Send SMS

POST /sms
  body:
    messageBody: The text or information that the user wishes to share.
    userNumber: The number the user wishes to send the message to.
    userSecret: An encrypted signal that the user has the appropriate permission to send a request to the api.

##Examples:
