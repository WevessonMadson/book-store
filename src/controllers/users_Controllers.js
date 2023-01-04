import { Users } from "../models/users_Model.js";
import { getToken } from "../auth/auth.js";
import bcrypt from "bcrypt";

const saltRounds = 10;
const salt = bcrypt.genSaltSync(saltRounds);

export async function userCadastro(req, res) {
    try {
        const { nome, email, password } = req.body;
        if (!nome || !email || !password) {
            res.status(404).json({ message: "nome, email e password são obrigatórios para se cadastrar." });
        } else {
            let user = await Users.findOne({ email });
            if (user) {
                res.status(409).json({ message: "Email já cadastrado, verifique." });
            } else {
                const user = new Users({
                    nome,
                    email,
                    password: bcrypt.hashSync(`${password}`, salt)
                });
                await user.save();
                res.status(201).json({ message: "Usuário criado com sucesso, já pode se autenticar." });
            }
        }
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Ocorreu um erro interno no servidor." });
    }
}

export async function userLogin(req, res) {
    try {
        const { email, password } = req.body;

        if (!email || !password) res.status(401).json({ message: "Email e Password são obrigatórios." });
        else {
            const user = await Users.findOne({ email });

            if (user) {
                const validacao = await bcrypt.compare(password, user.password);
                if (user.email == email && validacao) {
                    const payload = { "user": `${user._id}` };
                    const acessToken = getToken(payload, "30m");
                    res.status(200).json(acessToken);
                } else res.status(401).json({ message: "Não autenticado, verifique seus dados e tente novamente." });
            } else res.status(401).json({ message: "Não autenticado, verifique seus dados e tente novamente." });
        }
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Ocorreu um erro interno no servidor." });
    }
}

export async function userUpdate(req, res) {
    try {
        const { id } = req.params;
        const { email, password, nome, actived, deleted } = req.body;

        const user = await Users.findById(id, ["nome", "actived", "deleted"]);

        if (!user) res.status(404).json({ message: "Usuário não encontrado, verifique o identificador e tente novamente." });

        else if (email || password) res.status(400).json({ message: "Email e/ou Senha não podem ser alterados por aqui, remova-os e tente novamente." });
        
        else {
            user.nome = nome ? nome : user.nome;
            if (actived != undefined || actived != null) user.actived = actived;
            if (deleted != undefined || deleted != null) user.deleted = deleted;

            await Users.findByIdAndUpdate(id, user);

            res.status(200).json({ message: "Alterado com sucesso." });
        }
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Ocorreu um erro interno no servidor." });
    }
}

export async function userListAll(req, res) {
    try {
        const users = await Users.find({}, ["nome", "actived", "deleted"]);

        if (!users) res.status(204);
        else res.status(200).json(users);
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Ocorreu um erro interno no servidor." });
    }
}