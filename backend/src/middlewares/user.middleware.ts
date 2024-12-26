import { Request, Response, NextFunction } from "express";

export class userMiddleware {
    async verifyToken(req: Request, res: Response, next: NextFunction) {
            const auth = req.headers.authorization
            console.log(auth?.split(' ')[1])
        next()
    }
}