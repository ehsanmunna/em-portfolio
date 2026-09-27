const nodemailer = require('nodemailer');

function createContactEmailSender({ environment = process.env, createTransport = nodemailer.createTransport } = {}) {
  let transport;

  return async function sendContactEmail({ name, email, message }) {
    const host = environment.SMTP_HOST;
    const recipient = environment.CONTACT_TO;
    const sender = environment.MAIL_FROM;
    const port = Number(environment.SMTP_PORT || 587);
    const username = environment.SMTP_USER;
    const password = environment.SMTP_PASSWORD;

    if (!host || !recipient || !sender || !Number.isInteger(port) || port < 1 || port > 65535) {
      throw new Error('SMTP delivery configuration is incomplete');
    }
    if (Boolean(username) !== Boolean(password)) {
      throw new Error('SMTP authentication configuration is incomplete');
    }

    if (!transport) {
      transport = createTransport({
        host,
        port,
        secure: String(environment.SMTP_SECURE).toLowerCase() === 'true',
        ...(username ? { auth: { user: username, pass: password } } : {})
      });
    }

    await transport.sendMail({
      from: sender,
      to: recipient,
      replyTo: email,
      subject: `Portfolio inquiry from ${name}`,
      text: `Name: ${name}\nEmail: ${email}\n\n${message}`
    });
  };
}

module.exports = { createContactEmailSender };
