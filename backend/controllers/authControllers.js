import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import userModel from '../models/userModels.js';
import transporter from '../config/nodemailer.js'

//registering new user
export const register = async (req, res)=> {
    const {name, email, password} = req.body;

    // name and email fields are empty 
    if(!name || !email || !password) {
        return res.json({success: false, message: 'Missing Details'})
    }

    try {
        //saving exiisting user in a variable 
        const existingUser = await userModel.findOne({email})  //findOne() used to find email from userModel DB
        //checking if user already exist or not 
        if (existingUser) {
            return res.json({success:false, message:"user already exists"})
        }
        // encrypting password
        const hashedPassword = await bcrypt.hash(password, 10)

        //creating and saving new user in user variable
        const user = new userModel({name, email, password:hashedPassword})  //creating
        await user.save(); //saving

        //generating token using jwt
        const token = jwt.sign({id: user._id}, process.env.JWT_SECRET, {expiresIn: '7d'});
        //sending token via cookie
        res.cookie('token', token, {
            httpOnly: true, //only http request can access this cookie
            secure: process.env.NODE_ENV === 'production',  //secure will be false for production environment and false for developement environment
            sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'strict',
            maxAge: 7 * 24 * 60 * 60 * 1000   //token expiring in 7 days
        })

        //logic/script to send email using SMTP 
        const mailOptions = {
            from: process.env.SENDER_EMAIL,
            to: email,
            subject: 'Welcome to MediEase',
            text: `Welcome to MediEase! Your account has been successfully created with email id: ${email}.
            We're excited to have you with us — now you can easily access patient health records, generate prescription using AI, and manage everything in one place.`
        }
        await transporter.sendMail(mailOptions);
        return res.json({success:true});

    } catch (error) {
        res.json({success:false, message:error.message})
    }
}

//user login
export const login = async (req, res)  => {
    //for login we need only email and password 
    const {email, password} = req.body;

    if (!email || !password) {
        return res.json({success:false, message: 'Email and password are required'})
    }

    try {
        //finding email in DB
        const user = await userModel.findOne({email})
        
        //condiiton where email didn't match 
        if(!user) {
            return res.json({success: false, message: 'Invalid email'})
        }
        
        //comapring both password that user has enter during login and another one in user DB
        const isMatch = await bcrypt.compare(password, user.password)

        //condiiton where password didn't match
        if(!isMatch) {
            return res.json({success: false, message: 'Invalid password'})
        }

        //generating token using jwt
        const token = jwt.sign({id: user._id}, process.env.JWT_SECRET, {expiresIn: '7d'});
        //sending token via cookie
          res.cookie("token", token, {
          httpOnly: true,
          secure: true,        // Render uses HTTPS
          sameSite: "none",    // REQUIRED for cross-origin
          maxAge: 7 * 24 * 60 * 60 * 1000,
        });

        return res.json({success:true});
    } catch (error) {
        
    }
}

//user logout
export const logout = async (req, res) => {
    try {
        res.clearCookie('token', {
            httpOnly: true, //only http request can access this cookie
            secure: process.env.NODE_ENV === 'production',  //secure will be false for production environment and false for developement environment
            sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'strict',
        })
        return res.json({success:true, message:'Logged out'})
    } catch (error) {
        res.json({success:false, message: error.message})
    }
}

//send verification OTP to user's email
// export const sendVerifyOtp = async (req, res)=> {
//     try {
//         //getting user id from DB
//         const userId = req.user.id;  
//         const user = await userModel.findById(userId);  
//         //finding user in Database
//         if (user.isAccountVerified) {
//             //by default isAccountVerified is false if it is true that means user is already verified
//             return res.json({success: false, message: "Account already verified"})   
//         }

//         //to generate OTP 
//         //this will generate three digit OTP
//         const otp = String(Math.floor(100000 + Math.random() * 900000))  

//         user.verifyOtp = otp;
//         user.verifyOtpExpireAt = Date.now() + 24 * 60 * 60 * 1000

//         await user.save();

//         const mailOptions = {
//           from: process.env.SENDER_EMAIL,
//           to: user.email,
//           subject: 'Your MediEase OTP Verification Code',
//           text: `Hi there, 
//                  Your OTP for verifying your MediEase account is: ${otp} 
//                  This code is valid for the next 24 hours. 
//                  If you didn’t request this, please ignore the email. Thanks,

//                  Team MediEase`
//         }

//         await transporter.sendMail(mailOptions)
//         res.json({success: true, message: "Verification OTP send on email "});

//     } catch (error) {
//         res.json({success: false, message: error.message});
//     }
// }

//Verify user account using OTP they enter
// export const verifyEmail = async (req, res) => {
//     // take user id from token
//     const userId = req.user.id;   
//     const { otp } = req.body;


//     if (!userId || !otp) {
//         return res.json({success:false, message:"Missing Details"})
//     }

//     try {
//         const user = await userModel.findById(userId);

//         if (!user) {
//             return res.json({success:false, messgage:"user not found"})
//         }
        
//         //checking OTP is valid or not 
//         if (user.verifyOtp === '' || user.verifyOtp !== otp) {
//             return res.json({success:false, messgage:"Invalid OTP"})
//         }
//         //checking expiring date of OTP
//         if (user.verifyOtpExpireAt < Date.now()) {
//             return res.json({success:false, messgage:"OTP Expired"})
//         }
//         user.isAccountVerified = true;
//         user.verifyOtp = ""
//         user.verifyOtpExpireAt = 0

//         await user.save()
//         return res.json({success: true, message:"Email verified successfully"})
//     } catch (error) {
//       res.json({success: false, message: error.message});
//     }
// }
