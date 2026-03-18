export const globalError = (err, req, res, next) => {
    if(err.cause.code === 11000) {
        return res.status(409).json({ status: false, massage: "user already exist" });
    }
    return res.status(err.cause || 500).json({ status: false, massage: err.message });
}