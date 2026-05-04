export interface IUser {
    id: number;
    email: string;
    firstName: string;
    lastName: string;
    hashPassword: string;
    password: string;
    createdAt: Date;
    updatedAt: Date;
}
declare class UserRepository {
    static create(user: Omit<IUser, "id" | "createdAt" | "updatedAt">): Promise<number>;
    static readAll(): Promise<IUser[]>;
    static read(id: number): Promise<IUser[]>;
    static update(user: Omit<IUser, "createdAt" | "updatedAt">): Promise<number>;
    static delete(id: number): Promise<number>;
    static findByEmail(email: string): Promise<IUser[]>;
}
export default UserRepository;
//# sourceMappingURL=userRepository.d.ts.map