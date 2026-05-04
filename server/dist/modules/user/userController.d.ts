import type { Request, Response } from "express";
declare const userController: {
    create(req: Request, res: Response): Promise<Response<any, Record<string, any>> | undefined>;
    readAll(req: Request, res: Response): Promise<void>;
    read(req: Request, res: Response): Promise<void>;
    update(req: Request, res: Response): Promise<void>;
    delete(req: Request, res: Response): Promise<void>;
};
export default userController;
//# sourceMappingURL=userController.d.ts.map