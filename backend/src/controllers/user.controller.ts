import { Router, Request, Response } from "express";

export class User {
    async login(req: Request, res: Response) {
        res.json({"message": "Odair logado."})
    }
}