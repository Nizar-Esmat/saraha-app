import User from "../../db/models/user.model.js";
import { sendEmail, compare, encrypt, genrateTokens, hash, verifyToken } from "../../utils/index.js";
import { gender as genderType } from "../../../src/db/models/user.model.js";
import { massages } from "../../utils/messages/index.js";


export const register = async (req, res, next) => {
  const { email, password, userName, phoneNumber, gender } = req.body;

  const newUser = await User.create({
    email,
    password: hash({ password }),
    userName,
    phoneNumber: encrypt({ data: phoneNumber }),
    gender,
  });
  const verifyToken = genrateTokens({
    payload: {
      userId: newUser.id
    },
    options: {
      expiresIn: "1d"
    }
  })
  const link = `http://localhost:3000/auth/verify/${verifyToken}`;
  const isSent = await sendEmail({
    email,
    subject: "verify your email",
    message: `click on this link to verify your email `,
    html: `<a href="${link}">click here to verify your email</a>`
  })
  return res.status(201).json({ status: true, message: massages.user.created, data: newUser });
}


export const login = async (req, res, next) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (!user) {
    return next(new Error(massages.user.invalidCredentials, { cause: 401 }));
  }
  const isMatch = compare({ password, hash: user.password });
  if (!isMatch) {
    return next(new Error(massages.user.invalidCredentials, { cause: 401 }));
  }

  if (user.isConfirmed === false) {
    return next(new Error(massages.user.notFound + "verified email", { cause: 401 }));
  }

  const token = genrateTokens({
    payload: {
      userId: user.id
    },
    options: {
      expiresIn: "1d"
    }
  })

  if (user.isDeleted) {
    await User.findByIdAndUpdate(user.id, { isDeleted: false});
  }


  return res
    .status(200)
    .json({ status: true, message: massages.user.fetch, token, data: user });
}



export const verify = async (req, res, next) => {
  const { token } = req.params;
  const { userId, error } = verifyToken({ token });
  if (error) {
    return next(error);
  }
  const user = await User.findById(userId);
  if (!user) {
    return next(new Error(massages.user.notFound + userId, { cause: 404 }));
  }
  user.isConfirmed = true;
  await user.save();
  return res.status(200).json({ status: true, message: massages.user.updated });
}