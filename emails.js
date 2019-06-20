const sgMail = require("@sendgrid/mail");
const sendGridAPIKey = "somekey";

sgMail.setApiKey(sendGridAPIKey);

sgMail.send({
  to: "destinataryEmail@gmail.com",
  from: "fromEmail@gmail.com",
  subject: "title",
  text: `content`,
  html: "<div>HTML code</div>"
});
