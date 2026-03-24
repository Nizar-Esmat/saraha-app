import Massage from "../../db/models/massage.model.js";
import User from "../../db/models/user.model.js";

export const sendMassage = async (req, res, next) => {
    const { receiver, content, sender } = req.body;

    const receiverUser = await User.findById(receiver);
    if (!receiverUser) {
        return next(new Error("user not found", { cause: 404 }));
    }
    const massage = await Massage.create({ receiver, content, sender });
    return res.status(200).json({ status: true, massage: "massage sent", data: massage });
}

export const getMassages = async (req, res, next) => {
    const { id } = req.user;
    const massages = req.query.type == 'receiver' ? await Massage.find({ receiver: id }) : await Massage.find({ $or: [{ receiver: id }, { sender: id }] });
    return res.status(200).json({ status: true, data: massages });
}

export const deleteMassage = async (req, res, next) => {
    const { id } = req.params;
    const { user } = req;

    const massage = await Massage.findById(id);
    if (!massage) {
        return next(new Error("massage not found", { cause: 404 }));
    }

    if (user.id.toString() != massage.receiver.toString()) {
        return next(new Error("unauthorized", { cause: 401 }));
    }

    await Massage.deleteOne({ _id: id });
    return res.status(200).json({ status: true, massage: "massage deleted", data: massage });
}