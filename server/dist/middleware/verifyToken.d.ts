import type { Request, Response, NextFunction } from "express";
interface AuthRequest extends Request {
    user?: {
        id: number;
        email: string;
    };
}
declare const verifyToken: (req: AuthRequest, res: Response, next: NextFunction) => Response<any, Record<string, any>> | undefined;
export default verifyToken;
//# sourceMappingURL=verifyToken.d.ts.map