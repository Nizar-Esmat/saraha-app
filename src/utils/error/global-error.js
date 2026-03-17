export const globalError = (err, req, res, next) => {
    return res.status(err.cause).json({ status: false, massage: err.message });
}