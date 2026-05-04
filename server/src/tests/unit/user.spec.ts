import userController from "../../modules/user/userController";
import UserRepository from "../../modules/user/userRepository";

type MockResponse = {
    status: jest.Mock;
    json: jest.Mock;
};

type MockRequest = {
    params?: Record<string, string>;
    body?: Record<string, unknown>;
};

jest.mock("../../modules/user/userRepository", () => ({
    __esModule: true,
    default: {
        readAll: jest.fn()
    }
}));

describe("userController.readAll", () => {
    const mockedUsers = [
        {
            id: 1,
            email: "alice@example.com",
            firstName: "Alice",
            lastName: "Dupont",
            hashPassword: "hashed-password-1",
            password: "hashed-password-1",
            createdAt: new Date("2026-01-01T00:00:00.000Z"),
            updatedAt: new Date("2026-01-01T00:00:00.000Z")
        },
        {
            id: 2,
            email: "bob@example.com",
            firstName: "Bob",
            lastName: "Martin",
            hashPassword: "hashed-password-2",
            password: "hashed-password-2",
            createdAt: new Date("2026-02-01T00:00:00.000Z"),
            updatedAt: new Date("2026-02-01T00:00:00.000Z")
        }
    ];

    let req: MockRequest;
    let res: MockResponse;

    beforeEach(() => {
        req = {};
        res = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn()
        };
    });

    afterEach(() => {
        jest.clearAllMocks();
    });

    it("doit retourner tous les utilisateurs en JSON", async () => {
        const mockedUserRepository = UserRepository as unknown as { readAll: jest.Mock };
        mockedUserRepository.readAll.mockResolvedValue(mockedUsers);

        await userController.readAll(req as any, res as any);

        expect(mockedUserRepository.readAll).toHaveBeenCalledTimes(1);
        expect(res.json).toHaveBeenCalledWith(mockedUsers);
        expect(res.status).not.toHaveBeenCalled();
    });

    it("doit renvoyer une erreur 500 si la récupération échoue", async () => {
        const mockedUserRepository = UserRepository as unknown as { readAll: jest.Mock };
        mockedUserRepository.readAll.mockRejectedValue(new Error("DB error"));

        await userController.readAll(req as any, res as any);

        expect(res.status).toHaveBeenCalledWith(500);
        expect(res.json).toHaveBeenCalledWith({ error: "Erreur lors de la récupération des utilisateurs" });
    });
});
