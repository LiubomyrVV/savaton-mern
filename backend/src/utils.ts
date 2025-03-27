import { NextFunction, Request, Response } from 'express'
import jwt from 'jsonwebtoken'
import { User } from './models/userModel'
import nodemailer from "nodemailer"
import { PORT } from '.';

export const transporter = nodemailer.createTransport({
  service: 'gmail',
  host: 'smtp.gmail.com',
  port: 465,
  secure: true, 

  auth: {
    user: 'liubomyrpoland@gmail.com', 
    pass: 'qbrimpcmlbdbabas' 
  }
});

interface SendVerificationEmailParams {
  email: string;
  verificationToken: string;
}

export const sendVerificationEmail = async ({ email, verificationToken }: SendVerificationEmailParams): Promise<void> => {
  const verificationUrl = `http://localhost:${PORT}/api/users/verify?token=${verificationToken}`;

  const mailOptions = {
    from: 'liubomyrpoland@gmail.com',
    to: email,
    subject: 'Please Verify Your Email Address',
    text: `Hello,\n\nThank you for registering with us! To complete your registration, please click the following link to verify your email address:\n\n${verificationUrl}\n\nIf you didn't request this, please ignore this email.`,
    html: `
      <html>
        <body style="font-family: Arial, sans-serif; color: #333;">
          <h2 style="color: #4CAF50;">Welcome to Our Service!</h2>
          <p>Thank you for registering with us! To complete your registration and verify your email address, please click the button below:</p>
          <p>
            <a href="${verificationUrl}" style="background-color: #4CAF50; color: white; padding: 15px 25px; text-decoration: none; border-radius: 5px; font-size: 16px;">Verify Your Email</a>
          </p>
          <p>If you didn't request this, please ignore this email.</p>
          <footer style="margin-top: 30px; font-size: 12px; color: #888;">
            <p>&copy; 2025 Our Service. All rights reserved.</p>
          </footer>
        </body>
      </html>`,
  };

  try {
    await transporter.sendMail(mailOptions);
    console.log('Verification email sent successfully');
  } catch (error) {
    console.error('Error sending verification email:', error);
  }
};


export const generateVerificationToken = (user: User): string => {
  return jwt.sign(
    { userId: user._id, email: user.email },
    process.env.JWT_SECRET || 'somethingsecret', 
    { expiresIn: '1h' } // Expiration time
  );
};

export const generateToken = (user: User) => {
  return jwt.sign(
    {
      _id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
    },
    process.env.JWT_SECRET || 'somethingsecret',
    {
      expiresIn: '30d',
    }
  )
}

export const isAuth = (req: Request, res: Response, next: NextFunction) => {
  const { authorization } = req.headers
  if (authorization) {
    const token = authorization.slice(7, authorization.length) // Bearer xxxxx
    const decode = jwt.verify(
      token,
      process.env.JWT_SECRET || 'somethingsecret'
    )
    req.user = decode as {
      _id: string
      name: string
      email: string
      isAdmin: boolean
      token: string
    }
    next()
  } else {
    res.status(401).json({ message: 'No Token' })
  }
}
