import { EmailService, SendMailOptions, Attachements } from './email.service';
import nodemailer from 'nodemailer';



describe('eamilService', () => {

    const mockSendMail = jest.fn();
    nodemailer.createTransport = jest.fn().mockReturnValue({
        sendMail: mockSendMail
    })
    const emailService = new EmailService();
    test('should send emails', async () => {

        

        const options:SendMailOptions = {
            to: 'alanfga1@gamil.com',
            subject: 'Test',
            htmlBody: '<h1>Test</h1>'
        }

        const emailSent = await emailService.sendEmail(options)
        expect(mockSendMail).toHaveBeenCalledWith({
               attachments: expect.any(Array),
               html: "<h1>Test</h1>",
               subject: "Test",
               to: "alanfga1@gamil.com",
        })
    });


    test('send email with attachments', async () => {

        const email = 'alanfga1@gamil.com'
        await emailService.sendEmailWithFileSystemLogs(email)

        expect(mockSendMail).toHaveBeenCalledWith({
            to: email,
            subject: 'logs del servidor',
            html: expect.any(String),
            attachments: expect.arrayContaining([
                { filename: "logs-all.log", path: "./logs/logs-all.log" },
                { filename: "logs-high.log", path: "./logs/logs-high.log" },
                { filename: "logs-medium.log", path: "./logs/logs-medium.log" },
            ])
        })
    })
})