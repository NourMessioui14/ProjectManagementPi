import { Injectable } from '@nestjs/common';
import * as nodemailer from 'nodemailer';

@Injectable()
export class EmailSpService {
    private transporter;

  constructor() {
    this.transporter = nodemailer.createTransport({
      // configurez votre transporteur ici, par exemple SMTP, SendGrid, etc.
      service: 'gmail',
      auth: {
        user: 'chadhahannachi675@gmail.com',
        pass: 'pvat zlgy jeqp budj',
      },
    });
  }

  async sendEmail(to: string, subject: string, text: string): Promise<void> {
    const mailOptions = {
      from: 'chadhahannachi675@gmail.com',
      to : to,
      subject : subject,
      text: text ,
    };
    await this.transporter.sendMail(mailOptions);
  }
}
