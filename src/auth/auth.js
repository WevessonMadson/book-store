import jwt from "jsonwebtoken";

const secret = 'akldakslmdkalsmdamsldmaskldmklasmdklasmkdlmaskldmak';

export const getToken = (payload, time) => {
    let acessToken = jwt.sign(payload, secret, { expiresIn: `${time}` })
    const { exp, iat } = jwt.verify(acessToken, secret);
    const expiresIn = exp - iat;
    return { acessToken, type: "bearer", expiresIn }
}

export function authorization(req, res, next) {
    try {
        let acessToken = req.headers['authorization'].split(' ')[1];
        jwt.verify(acessToken, secret);        
        next();
    } catch (error) {
        // console.log(error);
        if (error.message == "jwt expired") res.status(401).json({ message: "token expirado" });
        else if (error.message == "invalid signature" || error.message == "jwt signature is required") res.status(401).json({ message: "assinatura inválida" });
        else if (error.message == "invalid token" || error.message == "jwt malformed") res.status(401).json({ message: "token inválido" });
        else res.status(500).json({ message: "Ocorreu um erro interno no servidor." });
    }
}
