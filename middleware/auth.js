const {verify} = require("jsonwebtoken");

const authMiddleware = async (req, res, next) => {
    const token = req.header('Authorization');
    console.log(token)
    if (!token) {
        return res.status(401).send({error: 'You are not authorized to access this resource'});
    }
    next();
}

const adminMiddleware = async (req, res, next) => {
    const token = req.header('Authorization');
    if (!token) {
        return res.status(401).send({error: 'You are not authorized to access this resource'});
    }
    const decoded = verify(token, process.env.JWT_SECRET);
    if (decoded.role !== 'admin') {
        return res.status(403).send({error: 'You are forbidden to access this resource'});
    }
    next();
}

module.exports = {authMiddleware, adminMiddleware};