import { Injectable } from '@nestjs/common';
import * as nodemailer from 'nodemailer';

@Injectable()
export class EmailServiceReponse {
  private transporter;

  constructor() {
    this.transporter = nodemailer.createTransport({
      // configurez votre transporteur ici, par exemple SMTP, SendGrid, etc.
      service: 'gmail',
     
      auth: {
        user: 'ibtihelkadhraoui1@gmail.com',
        pass: 'zanc njbz cnpe nxnx',
      },
    });
  }

  async sendEmail(to: string, subject: string, text: string): Promise<void> {
    const mailOptions = {
      from: 'ibtihelkadhraoui1@gmail.com',
      to : to,
      subject : subject,
      text: text ,
    };
    await this.transporter.sendMail(mailOptions);
  }


 
}
