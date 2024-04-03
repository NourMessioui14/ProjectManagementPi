import { Injectable } from '@nestjs/common';
import * as nodemailer from 'nodemailer';

@Injectable()
export class EmailService {
  private transporter;

  constructor() {
    this.transporter = nodemailer.createTransport({
      // Configuration SMTP (exemple avec Gmail)
      service: 'gmail',
      auth: {
        user: 'manarjannene15@gmail.com',
        pass: 'sccb nblb heml muoq',
      },
    });
  }

  async sendEmail(to: string, subject: string, text: string): Promise<void> {
    const mailOptions = {
      from: 'manarjannene15@gmail.com',
      to: to,
      subject: subject,
      text: text,
    };

    await this.transporter.sendMail(mailOptions);
  }

  async sendCustomizedEmail(to: string, subject: string, projectName: string, ticketType: string, description: string, responsableName: string): Promise<void> {
    const text = `Dear ${responsableName},\n\nA new ${ticketType} ticket has been created for the project "${projectName}".\n\nDescription: ${description}\n\nBest regards,\nYour Team`;
    await this.sendEmail(to, subject, text);
  }
}
