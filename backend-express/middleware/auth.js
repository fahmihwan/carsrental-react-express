const jwt = require('jsonwebtoken')

const verifyToken = (req, res, next) => {

    // Standar RFC 6750: Penggunaan Bearer adalah bagian dari standar RFC 6750, yang mendefinisikan cara menggunakan token bearer dalam header Authorization untuk otentikasi. Standar ini memberikan format yang konsisten dan terstandarisasi untuk pengiriman token.
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.startsWith('Bearer ') ? authHeader.substring(7) : null; //hapus kalimat Bearer

    if (!token) {
        return res.status(401).json({ message: "Unauthenticated." });
    }

    jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
        if (err) {
            return res.status(401).json({ message: "Invalid token" });
        }
        req.userId = decoded.id;
        next()
    })
}

module.exports = verifyToken