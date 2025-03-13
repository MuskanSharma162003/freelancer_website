import jwt from 'jsonwebtoken';

export const authMiddleware = (req, res, next) => {
  const token = req.headers.authorization;

  if (!token) {
    return res.status(403).json({ message: 'No token provided' });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    console.log("Decoded Token:", decoded);
    req.user = { userId: decoded.userId, role: decoded.role };
    console.log("req.user:", req.user); // Debugging log
    next();
  } catch (error) {
    console.error("Token Verification Error:", error);
    return res.status(401).json({ message: 'Invalid or expired token' });
  }
};