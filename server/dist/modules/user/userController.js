import UserRepository, {} from "./userRepository";
import * as argon2 from "argon2";
const userController = {
    async create(req, res) {
        try {
            const { email, firstName, lastName, password } = req.body;
            const existingUsers = await UserRepository.findByEmail(email);
            if (existingUsers.length > 0) {
                return res.status(400).json({ error: "Cet email est déjà utilisé" });
            }
            const hashPassword = await argon2.hash(password);
            const newUser = {
                email: email,
                firstName: firstName,
                lastName: lastName,
                password: hashPassword
            };
            const id = await UserRepository.create(newUser);
            res.status(201).json({ id });
        }
        catch (error) {
            res.status(500).json({ error: "Erreur lors de la création de l'utilisateur" });
        }
    },
    async readAll(req, res) {
        try {
            const users = await UserRepository.readAll();
            res.json(users);
        }
        catch (error) {
            res.status(500).json({ error: "Erreur lors de la récupération des utilisateurs" });
        }
    },
    async read(req, res) {
        try {
            const id = Number(req.params.id);
            const users = await UserRepository.read(id);
            if (users.length === 0) {
                res.status(404).json({ error: "Utilisateur non trouvé" });
            }
            else {
                res.json(users[0]);
            }
        }
        catch (error) {
            res.status(500).json({ error: "Erreur lors de la récupération de l'utilisateur" });
        }
    },
    async update(req, res) {
        try {
            const id = Number(req.params.id);
            const { email, firstName, lastName, password } = req.body;
            const hashPassword = await argon2.hash(password);
            const updateUser = {
                email: email,
                firstName: firstName,
                lastName: lastName,
                password: hashPassword
            };
            const affectedRows = await UserRepository.update(updateUser);
            if (affectedRows === 0) {
                res.status(404).json({ error: "Utilisateur non trouvé" });
            }
            else {
                res.json({ message: "Utilisateur mis à jour" });
            }
        }
        catch (error) {
            res.status(500).json({ error: "Erreur lors de la mise à jour de l'utilisateur" });
        }
    },
    async delete(req, res) {
        try {
            const id = Number(req.params.id);
            const affectedRows = await UserRepository.delete(id);
            if (affectedRows === 0) {
                res.status(404).json({ error: "Utilisateur non trouvé" });
            }
            else {
                res.json({ message: "Utilisateur supprimé" });
            }
        }
        catch (error) {
            res.status(500).json({ error: "Erreur lors de la suppression de l'utilisateur" });
        }
    }
};
export default userController;
//# sourceMappingURL=userController.js.map