import { Request, Response } from "express";
import { prisma } from "../../connection";

export class Products {
    async getAllProducts(req: Request, res: Response) {
        const products = await prisma.produto.findMany()

        if (!products) return

        res.json(products)
    }
    async getProductsById(req: Request, res: Response) {
        const id = req.params.id
        
        const data = await prisma.produto.findFirst({
            where: {
                id: id
            }
        })
        
        if(!id) {
            res.json({"message": "Produto não encontrado."})
        } else {
            res.json(data)
        }
    }
}