import { Books } from "../models/books_Model.js";

export async function bookInsert(req, res) {
    try {
        const { isbn, titulo, genero, editora, autor } = req.body;

        if (!isbn || !titulo || !genero || !editora || !autor) {
            res.status(400).json({ message: "isbn, titulo, genero, editora e autor, são obrigatórios." });
        } else {
            let book = await Books.findOne({ isbn });

            if (book) {
                res.status(409).json({ message: "Livro já cadastrado, verifique." });
            } else {
                const book = new Books({ isbn, titulo, genero, editora, autor });
                await book.save();

                res.status(201).json({ message: "Livro cadastrado com sucesso!" });
            }
        }
    } catch (error) {
        console.error(error);

        res.status(500).json({ message: "Ocorreu um erro interno no servidor." });
    }
}

export async function getBooks(req, res) {
    try {
        const { id } = req.params;

        if (!id) {
            const books = await Books.find();
            
            if (books.length === 0) {
                res.status(204);
                res.end();
            } else {
                res.status(200).json(books);
            }
        } else {
            let book = await Books.findById(id);

            if (!book) {
                res.status(204);
                res.end();
            } else {
                res.status(200).json(book);
            }
        }
    } catch (error) {
        if (error.kind == 'ObjectId') {
            res.status(400).json({ message: "Id passado não é válido. Verifique." });
        } else {
            console.error(error);

            res.status(500).json({ message: "Ocorreu um erro interno no servidor." });
        }
    }
}

export async function bookRemove(req, res) {
    try {
        const { id } = req.params;

        const book = await Books.findById(id);

        if (!book) {
            res.status(404).json({ message: "Livro não encontrado." });
        } else {
            await Books.findByIdAndDelete(id);

            res.status(200).json({ message: "Livro deletado com sucesso." });
        }
    } catch (error) {
        if (error.kind == 'ObjectId') {
            res.status(400).json({ message: "Id passado não é válido. Verifique." });
        } else {
            console.error(error);

            res.status(500).json({ message: "Ocorreu um erro interno no servidor." });
        }
    }
}

export async function bookUpdate(req, res) {
    try {
        const { id } = req.params;
        const { isbn, titulo, genero, editora, autor } = req.body;

        const book = await Books.findById(id);

        if (!book) {
            res.status(404).json({ message: "Livro não encontrado." });
        } else {
            book.isbn = isbn ?? book.isbn;
            book.titulo = titulo ?? book.titulo;
            book.genero = genero ?? book.genero;
            book.editora = editora ?? book.editora;
            book.autor = autor ?? book.autor;

            await Books.findByIdAndUpdate(id, book);

            res.status(200).json({ message: "Livro alterado com sucesso." });
        }
    } catch (error) {
        if (error.kind == 'ObjectId') {
            res.status(400).json({ message: "Id passado não é válido. Verifique." });
        } else {
            console.error(error);

            res.status(500).json({ message: "Ocorreu um erro interno no servidor." });
        }
    }
}
