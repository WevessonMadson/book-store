import { Books } from "../models/books_Model.js";


export async function bookInsert(req, res) {
    try {
        const { nome, cpf, email } = req.body;

        const cliente = new Books({ nome, cpf, email });

        await cliente.save();

        res.status(201).json({ message: "Cliente cadastrado com sucesso!" });
    } catch (error) {
        console.error(error)
    }
}

export async function getBooks(req, res) {
    try {
        const { id } = req.params;
        if (!id) {
            const clientes = await Clientes.find();
            if (!clientes) res.status(204);
            else res.status(200).json(clientes);
        } else {
            let cliente = await Clientes.findOne({ _id: id });
            if (!cliente) res.status(204);
            else res.status(200).json(cliente);
        }
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Ocorreu um erro interno no servidor." })
    }
}

export async function bookRemove(req, res) {
    try {
        const { id } = req.params;
        const cliente = await Books.findById(id);

        if (!cliente) res.status(404).json({ message: "Cliente não encontrado." });
        else {
            await Clientes.findByIdAndDelete(id);
            res.status(200).json({ message: "Cliente deletado com sucesso." });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Ocorreu um erro interno no servidor." });
    }
}

export async function bookUpdate(req, res) {
    try {
        const { id } = req.params;
        const { nome, cpf, email } = req.body;

        const cliente = await Clientes.findById(id);
        if (!cliente) res.status(404).json({ message: "Cliente não encontrado." });
        else {
            cliente.nome = nome ? nome : cliente.nome;
            cliente.cpf = cpf ? cpf : cliente.cpf;
            cliente.email = email ? email : cliente.email;
            await Clientes.findByIdAndUpdate(id, cliente);
            res.status(200).json({ message: "Cliente alterado com sucesso." });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Ocorreu um erro interno no servidor." });
    }
}