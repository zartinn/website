import nodemailer from 'nodemailer';

const transporter = nodemailer.createTransport({
    host: 'smtp.zoho.eu',
    port: 465,
    secure: true,
    auth: {
        user: import.meta.env.ZOHO_MAIL_USER,
        pass: import.meta.env.ZOHO_MAIL_PW
    }
});

export interface MailData {
  name?: string,
  email?: string,
  subject?: string,
  message?: string,
  html?: string
}

const getHTML = (data: MailData) => {
  return `
    <html xmlns="http://www.w3.org/1999/xhtml">
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width,initial-scale=1.0">
        <title></title>
      </head>
      <body>
        <h1>New contact inquiry via zartin.dev</h1>
        <p>Message from ${data.name}(${data.email}):</p>
        <h3>${data.subject}</h3>
        <p>${data.message}</p>
      </body>
    </html>
  `
}

export async function prepareMails(data: MailData) {
  const mailData: MailData = {};
  mailData.email = 'contact@zartin.dev';
  mailData.subject = 'New contact inquiry via zartin.dev';
  mailData.html = getHTML(data);

  try {
    const response = await sendMail(mailData);
    return response;
  } catch (e) {
    return false;
  }
}

async function sendMail(data: MailData) {
    let mailOptions = {
        from: 'Martin Zachoszcz <contact@zartin.dev>',
        to: data.email,
        subject: data.subject,
        html: data.html
    };

    return new Promise(
        (resolve, reject) => {
            transporter.sendMail(mailOptions, (error, info) => {
                if (error) {
                    console.error(`couldn't send mail ${error}`);
                    reject(false)
                } else {
                    console.log('Message sent: ', info.response);
                    resolve(true)
                }
            });
        })
}