import jwt from "jsonwebtoken";

export const isAuthenticated = async (req, res, next) => {
    try {
        // Get token from Authorization header
        const authHeader = req.headers["authorization"];
        const token = authHeader && authHeader.split(" ")[1]; // "Bearer <token>"

        if (!token) {
            return res.status(401).json({
                message: "User not authenticated",
                success: false,
            });
        }

        // Verify token
        const decoded = jwt.verify(token, "secret");

        if (!decoded) {
            return res.status(401).json({
                message: "Invalid token",
                success: false,
            });
        }

        // Attach user ID to request
        req.id = decoded.userId;
        next();
    } catch (error) {
        console.error(error);
        return res.status(401).json({
            message: "Authentication failed",
            success: false,
        });
    }
};
