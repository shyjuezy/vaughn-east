// pages/api/email.js
import sgMail from '@sendgrid/mail'

sgMail.setApiKey(process.env.SENDGRID_API_KEY)

export default async (req, res) => {
  if (req.method === 'POST') {
    const { email, message, firstName, lastName } = req.body

    console.log('email', email)
    console.log('message', message)
    console.log('firstName', firstName)
    console.log('lastName', lastName)

    const content = {
      to: 'shyju.viswambaran@coxautoinc.com',
      // from: email,
      from: 'shyjuezy@gmail.com',
      subject: 'New Message from Contact Form',
      text: message,
      // html: `<p>${message}</p><p>Contact Email: ${email}</p><p>First Name: ${firstName}</p><p>Last Name: ${lastName}</p>`,
      html: `
    <html>
      <head>
        <style>
          body {
            font-family: Arial, sans-serif;
          }
          .message {
            margin-bottom: 20px;
          }
          .info {
            margin-bottom: 10px;
          }
        </style>
      </head>
      <body>
        <div class="message">
          <p>${message}</p>
        </div>
        <div class="info">
          <p>
            Contact Email: ${email}<br>
            Name: ${firstName} ${lastName}
          </p>
        </div>
      </body>
    </html>
  `,
    }

    try {
      await sgMail.send(content)
      console.log('Message sent successfully.')
      res.status(200).send('Message sent successfully.')
      window.alert('Message sent successfully.')
    } catch (error) {
      console.log('ERROR', error)
      res.status(400).send('Message not sent.')
    }
  } else {
    res.status(404).send('Only POST requests are allowed.')
  }
}
