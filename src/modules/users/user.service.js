import CryptoJS from "crypto-js";
export const getMe = async (req, res) => {
    try {
        let { user } = req;
        user.phoneNumber = CryptoJS.AES.decrypt(user.phoneNumber, process.env.CryptoJSKey).toString(CryptoJS.enc.Utf8);
        return res.status(200).json({ status: true, data: user });
    } catch (error) {
        console.log(error.message);
        return res.status(500).json({ status: false, massage: error.message });
    }
};