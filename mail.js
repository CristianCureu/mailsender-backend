const sgMail = require("@sendgrid/mail");
const Handlebars = require("handlebars");
const config = require("./config");
const fs = require("fs");
const path = require("path");

const sendWelcomeEmail = (recipient, data) => {
  sendMail(recipient, "Bun venit la Optidora", "welcome", data);
};

const sendFeedbackEmail = (recipient, data) => {
  sendMail(recipient, "Bun venit la Optidora", "feedback", data);
};

const sendMail = (recipient, subject, templateName, data) => {
  const emailTemplate = fs.readFileSync(
    path.join(__dirname, `/Templates/${templateName}.handlebars`),
    "utf-8"
  );
  return new Promise((resolve, reject) => {
    if (config.SENDGRID_API_KEY) {
      sgMail.setApiKey(config.SENDGRID_API_KEY);
      const template = Handlebars.compile(emailTemplate);
      const messageBody = template(data);

      const msg = {
        to: recipient,
        from: config.SENDGRID_EMAIL_SENDER,
        subject,
        text: "This message is sent automatically",
        html: messageBody,
      };

      sgMail.send(msg).then(resolve).catch(reject);
    } else {
      reject(new Error("Sendgrid API key missing"));
    }
  });
};

module.exports = { sendWelcomeEmail, sendFeedbackEmail };
