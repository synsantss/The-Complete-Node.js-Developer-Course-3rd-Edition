const sgMail = require("@sendgrid/mail");
const sendGridAPIKey = process.env.SENDGRID_API_KEY;

sgMail.setApiKey(sendGridAPIKey);
const sendWelcomeEmail = (email, name) => {
  sgMail.send({
    to: email,
    from: "taskManager@gmail.com",
    subject: "Welcome to task manager",
    text: `Welcome to task manager ${name}!`,
    html: "<div>Hi!</div>"
  });
};

module.exports = { sendWelcomeEmail };
