import jwt from "jsonwebtoken";
import User from "../../db/models/user.model.js";

export const getMe = async (req, res) => {
    try {
        const { user } = req;
        return res.status(200).json({ status: true, data: user });
    } catch (error) {
        console.log(error.message);
        return res.status(500).json({ status: false, massage: error.message });
    }
};