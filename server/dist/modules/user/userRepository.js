import client from "../../database/client";
class UserRepository {
    static async create(user) {
        const [result] = await client.query("insert into users (email, firstName, lastName, password) values (?, ?, ?, ?)", [user.email, user.firstName, user.lastName, user.hashPassword]);
        return result.insertId;
    }
    static async readAll() {
        const [rows] = await client.query("select * from users");
        return rows;
    }
    static async read(id) {
        const [rows] = await client.query("select * from users where id = ?", [id]);
        return rows;
    }
    static async update(user) {
        const [result] = await client.query("update users set email = ?, firstName = ?, lastName = ?, password = ? where id = ?", [user.email, user.firstName, user.lastName, user.hashPassword, user.id]);
        return result.affectedRows;
    }
    static async delete(id) {
        const [result] = await client.query("delete from users where id = ?", [id]);
        return result.affectedRows;
    }
    static async findByEmail(email) {
        const [rows] = await client.query("select * from users where email = ?", [email]);
        return rows;
    }
}
export default UserRepository;
//# sourceMappingURL=userRepository.js.map