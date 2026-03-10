import User from "../../db/models/user.model.js";
import bcrypt from "bcryptjs";
import CryptoJS from "crypto-js";
import jwt from "jsonwebtoken";
import sendEmail from "../../utils/sendEmail.js";
export const register = async (req, res) => {
  try {
    const { email, password, userName, phoneNumber, gender } = req.body;
    const newUser = await User.create({
      email,
      password: bcrypt.hashSync(password, 10),
      userName,
      phoneNumber: CryptoJS.AES.encrypt(
        phoneNumber,
        process.env.CryptoJSKey,
      ).toString(),
      gender,
    });

    const verifyToken = jwt.sign(
      { userId: newUser.id },
      process.env.JWT_SECRET,
      { expiresIn: "5m" }
    );

    const link = `http://localhost:3000/auth/verify/${verifyToken}`;


    const isSent = await sendEmail({
      email,
      subject: "verify your email",
      message: `click on this link to verify your email `,
      html: `<a href="${link}">click here to verify your email</a>`
    })

    return res.status(201).json({ status: true, data: newUser });
  } catch (error) {
    console.log(error.message);
    return res.status(500).json({ status: false, massage: error.message });
  }
};

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) {
      return res
        .status(401)
        .json({ status: false, massage: "invalid credentials" });
    }
    const isMatch = bcrypt.compareSync(password, user.password);
    if (!isMatch) {
      return res
        .status(401)
        .json({ status: false, massage: "invalid credentials" });
    }

    if (user.isConfirmed === false) {
      return res.status(401).json({ status: false, massage: "user not verified" });
    }

    const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET, { expiresIn: "1d" });
    return res
      .status(200)
      .json({ status: true, massage: "login success", token, data: user });
  } catch (error) {
    console.log(error.message);
    return res.status(500).json({ status: false, massage: error.message });
  }
};

export const verify = async (req, res) => {
  try {
    const { token } = req.params;
    const {userId} = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ status: false, massage: "user not found" });
    }
    user.isConfirmed = true;
    await user.save();
    return res.status(200).json({ status: true, massage: "user verified" });
  } catch (error) {
    res.status(500).json({ status: false, massage: error.message });
  }
}
