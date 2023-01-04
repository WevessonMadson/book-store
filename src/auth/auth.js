import jwt from "jsonwebtoken";
import * as dotenv from "dotenv";
dotenv.config();

export const getToken = (payload, time) => {
    let acessToken = jwt.sign(payload, process.env.SECRET_TOKEN, { expiresIn: `${time}` })
    const { exp, iat } = jwt.verify(acessToken, process.env.SECRET_TOKEN);
    const expiresIn = exp - iat;
    return { acessToken, type: "bearer", expiresIn }
}

export function authorization(req, res, next) {
    try {
        if (!req.headers['authorization']) {
            res.status(401).json({ message: "Token required." });
        } else {
            let acessToken = req.headers['authorization'].split(' ')[1];
            jwt.verify(acessToken, process.env.SECRET_TOKEN);
            next();
        }
    } catch (error) {
        console.log(error.message);
        switch (error.message) {
            case "jwt expired":
                res.status(401).json({ message: "token expirado" });
                break;
            case "invalid signature": case "jwt signature is required":
                res.status(401).json({ message: "assinatura inválida" });
                break;
            case "invalid token": case "jwt malformed":
                res.status(401).json({ message: "token inválido" });
                break;
            default:
                res.status(500).json({ message: "Ocorreu um erro interno no servidor." });
        }
    }
}
