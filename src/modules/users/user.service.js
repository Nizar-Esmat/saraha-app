import jwt from "jsonwebtoken";
import User from "../../db/models/user.model.js";

export const getMe = async (req, res) => {
  try {
    const { token } = req.headers;
    const { userId } = jwt.verify(token, process.env.JWT_SECRET);

    const userExists = await User.findById(userId);
    if (!userExists) {
      res.status(404).json({ status: false, massage: "user not found" });
    }
    res.status(200).json({ status: true, data: userExists });
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ status: false, massage: error.message });
  }
};
