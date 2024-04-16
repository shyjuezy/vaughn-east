'use server'
import sgMail from '@sendgrid/mail'

sgMail.setApiKey(process.env.SENDGRID_API_KEY as string)

interface sendEmailsProps {
    email: string
    message: string
    firstName: string
    lastName: string
    phoneNumber: string
}

export async function sendEmails({
                                     email,
                                     message,
                                     firstName,
                                     lastName,
                                     phoneNumber,
                                 }: sendEmailsProps) {
    const msg = {
        to: ['shyjuezy@gmail.com', 'shysarv@gmail.com'],
        from: 'admin@vaughneast.com',
        subject: 'Sending with SendGrid is Fun',
        templateId: 'd-36b3cc819d74427cae7a3575587657fc',
        dynamicTemplateData: {
            subject: 'Sending with SendGrid is Fun',
            name: `${firstName} ${lastName}`,
            email: email,
            number: phoneNumber,
            message: message,
        },
    }

    try {
        const response = await sgMail.send(msg)
        console.log('Email sent')
        console.log(response)
        return {success: true}
    } catch (error) {
        console.error('Failed to send email:', error)
    }
}
