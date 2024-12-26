import { Request, Response } from "express";

export class Products {
    async getProducts(req: Request, res: Response) {
        res.json({"acesso": "acesso a rota de produtos."})
    }
}