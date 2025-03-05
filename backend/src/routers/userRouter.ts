import express, { Request, Response } from 'express'
import asyncHandler from 'express-async-handler'
import bcrypt from 'bcryptjs'

import jwt, { JwtPayload } from 'jsonwebtoken';
import { UserModel } from '../models/userModel'
import { generateToken, generateVerificationToken, isAuth, sendVerificationEmail } from '../utils'


export const userRouter = express.Router()
// POST /api/users/signin
userRouter.post(
  '/signin',
  asyncHandler(async (req: Request, res: Response) => {
    const user = await UserModel.findOne({ email: req.body.email })
    if (user) {
      if (bcrypt.compareSync(req.body.password, user.password)) {
        res.json({
          _id: user._id,
          name: user.name,
          email: user.email,
          isAdmin: user.isAdmin,
          info: user.info,
          isVerified: user.isVerified,
          token: generateToken(user),
        })
        return 
      }
    }
    res.status(401).json({ message: 'Invalid email or password' })
  })
)


// Verify email route
userRouter.get('/verify', async (req: Request, res: Response) => {
  const { token } = req.query;

  try {
    if (typeof token !== 'string') {
      return res.status(400).send(`
        <html>
          <body style="font-family: Arial, sans-serif; color: #333;">
            <h2 style="color: #e74c3c;">Invalid Token</h2>
            <p>The token provided is invalid. Please make sure you clicked the correct link.</p>
            <p>
              <a href="http://localhost:5173/" style="background-color:rgb(226, 238, 63); color: white; padding: 15px 25px; text-decoration: none; border-radius: 5px; font-size: 16px;">Go back to the homepage</a>
            </p>
          </body>
        </html>
      `);
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET as string) as JwtPayload;
    const user = await UserModel.findOne({ email: decoded.email });

    if (!user) {
      return res.status(400).send(`
        <html>
          <body style="font-family: Arial, sans-serif; color: #333;">
            <h2 style="color: #e74c3c;">User Not Found</h2>
            <p>We could not find a user with that email. Please ensure you're using the correct verification link.</p>
            <p>
              <a href="http://localhost:5173/" style="background-color:rgb(226, 238, 63); color: white; padding: 15px 25px; text-decoration: none; border-radius: 5px; font-size: 16px;">Go back to the homepage</a>
            </p>
          </body>
        </html>
      `);
    }

    if (user.isVerified) {
      return res.status(400).send(`
        <html>
          <body style="font-family: Arial, sans-serif; color: #333;">
            <h2 style="color: #f39c12;">User Already Verified</h2>
            <p>Your email has already been verified. If you didn't verify your email, please contact support.</p>
            <p>
              <a href="http://localhost:5173/" style="background-color:rgb(226, 238, 63); color: white; padding: 15px 25px; text-decoration: none; border-radius: 5px; font-size: 16px;">Go back to the homepage</a>
            </p>
          </body>
        </html>
      `);
    }

    user.isVerified = true;
    await user.save();

    res.status(200).send(`
      <html>
        <body style="font-family: Arial, sans-serif; color: #333;">
          <h2 style="color: #2ecc71;">Email Verified Successfully!</h2>
          <p>Thank you for verifying your email address. Your account is now active.</p>
          <p>
            <a href="http://localhost:5173/" style="background-color:rgb(226, 238, 63); color: white; padding: 15px 25px; text-decoration: none; border-radius: 5px; font-size: 16px;">Go to the homepage</a>
          </p>
        </body>
      </html>
    `);

  } catch (error) {
    res.status(400).send(`
      <html>
        <body style="font-family: Arial, sans-serif; color: #333;">
          <h2 style="color: #e74c3c;">Invalid or Expired Token</h2>
          <p>The verification link has either expired or is invalid. Please check your inbox for a new verification email.</p>
          <p>
            <a href="http://localhost:5173/" style="background-color:rgb(226, 238, 63); color: white; padding: 15px 25px; text-decoration: none; border-radius: 5px; font-size: 16px;">Go back to the homepage</a>
          </p>
        </body>
      </html>
    `);
  }
});

userRouter.get(
  '/verified',
  asyncHandler(async (req: Request, res: Response) => {
    const user = await UserModel.findOne({ email: req.query.email as string  })
    if (user?.isVerified === true) {
      res.status(200).json({ message: 'Email is already verified' });
    } else {
      res.status(203).json({ message: 'Email is not verified' });
    }
  })
);

userRouter.post(
  '/signout',
  asyncHandler(async (req: Request, res: Response) => {
    const user = await UserModel.findOne({ email: req.body.email })
    if (user) {
      user.info = req.body.info
      user.save()
      res.status(200).json({ message: 'Saved info to basedate' })
    }
    res.status(401).json({ message: 'Invalid email' })
  })
)

userRouter.post(
  '/signup',
  asyncHandler(async (req: Request, res: Response) => {
    const user = await UserModel.create({
      name: req.body.name,
      email: req.body.email,
      password: bcrypt.hashSync(req.body.password),
      info: req.body.info
    });
    const verificationToken = generateVerificationToken(user); 

    user.verificationToken = verificationToken
    user.save()

    // Send verification email
    await sendVerificationEmail({
      email: user.email,
      verificationToken,
    });
  
    // Send response
    res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
      isVerified: user.isVerified,
      token: generateToken(user), 
    });
  })
);

userRouter.put(
  '/profile',
  isAuth,
  asyncHandler(async (req: Request, res: Response) => {
    const user = await UserModel.findById(req.user._id)
    if (user) {
      user.name = req.body.name || user.name
      user.email = req.body.email || user.email
      if (req.body.password) {
        user.password = bcrypt.hashSync(req.body.password, 8)
      }
      const updatedUser = await user.save()
      res.send({
        _id: updatedUser._id,
        name: updatedUser.name,
        email: updatedUser.email,
        isAdmin: updatedUser.isAdmin,
        token: generateToken(updatedUser),
      })
      return
    }

    res.status(404).json({ message: 'User not found' })
  })
)
