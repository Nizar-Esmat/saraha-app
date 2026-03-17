import CryptoJS from "crypto-js";
export const getMe = async (req, res, next) => {
    let { user } = req;
    user.phoneNumber = CryptoJS.AES.decrypt(user.phoneNumber, process.env.CryptoJSKey).toString(CryptoJS.enc.Utf8);
    return res.status(200).json({ status: true, data: user });
};