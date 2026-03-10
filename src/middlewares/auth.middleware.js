import jwt from "jsonwebtoken";
import User from "../db/models/user.model.js";
export const isAuthentecate = async (req, res, next) => {
    try {
        const { autherization } = req.headers;
        if(!autherization) {
            return res.status(401).json({ status: false, massage: "token is required" });
        }
        if (!autherization.startsWith("Bearer ")) {
            return res.status(401).json({ status: false, massage: "invalied bearer" });
        }
        const [berar, token] = autherization.split(" ");
        if (!token) {
            return res.status(401).json({ status: false, massage: "unauthorized" });
        }
        const { userId } = jwt.verify(token, process.env.JWT_SECRET);
        const user = await User.findById(userId);
        if (!user) {
            return res.status(401).json({ status: false, massage: "unauthorized" });
        }
        req.user = user;
        next();
    } catch (error) {
        console.log(error.message);
        return res.status(500).json({ status: false, massage: error.message });

    }
}