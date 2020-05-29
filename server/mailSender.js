var SibApiV3Sdk = require("sib-api-v3-sdk");

function sendPasswordResetEmail(userData, expireTimeout) {
  var defaultClient = SibApiV3Sdk.ApiClient.instance;
  // Configure API key authorization: api-key
  var apiKey = defaultClient.authentications["api-key"];
  apiKey.apiKey = process.env.SENDINBLUE_API_KEY;
  var apiInstance = new SibApiV3Sdk.SMTPApi();
  var sendSmtpEmail = new SibApiV3Sdk.SendSmtpEmail(); // SendSmtpEmail | Values to send a transactional email

  userData.url = process.env.PUBLIC_BASE_URL + userData.url;
  sendSmtpEmail = {
    sender: { email: "noreply@nisida-book-recipes-react.herokuapp.com" },
    to: [
      {
        email: userData.name,
      },
    ],
    subject: "Reset Password",
    textContent: `Hi ${userData.name}, 
    
    you recently requested to reset your password for your account. 

    Use this link ${userData.url} to reset it. 
    
    This password reset is only valid for the next ${expireTimeout.value} ${expireTimeout.type}.`
  };
  return apiInstance.sendTransacEmail(sendSmtpEmail);
}

module.exports = sendPasswordResetEmail;
