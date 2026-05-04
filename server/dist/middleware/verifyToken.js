import jwt from "jsonwebtoken";
const verifyToken = (req, res, next) => {
    try {
        const token = req.cookies?.token;
        if (!token) {
            return res.status(401).json({ error: "Token manquant" });
        }
        const decoded = jwt.verify(token, process.env.JWT_SECRET || "default_secret");
        req.user = decoded;
        next();
    }
    catch (error) {
        if (error instanceof jwt.JsonWebTokenError) {
            return res.status(401).json({ error: "Token invalide" });
        }
        if (error instanceof jwt.TokenExpiredError) {
            return res.status(401).json({ error: "Token expiré" });
        }
        console.error("Erreur lors de la vérification du token:", error);
        res.status(500).json({ error: "Erreur serveur" });
    }
};
export default verifyToken;
//# sourceMappingURL=verifyToken.js.map