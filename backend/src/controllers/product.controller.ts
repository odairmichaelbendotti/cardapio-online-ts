import { Request, Response } from "express";
import { prisma } from "../../connection";

export class Products {
    async getAllProducts(req: Request, res: Response) {
        try {
            const products = await prisma.produto.findMany()

            if (!products) return

            res.json(products)
        } catch (error) {
            console.log(error)
        }
    }
    async dataFront(req: Request, res: Response) {
        const { action, id, qtd } = req.body

        if (!id) {
            res.status(400).json({ "message": "ID não encontrado." })
            return
        }

        const data = await prisma.produto.findFirst({ where: { id } })

        if (!data) {
            res.json({ "message": "Produto não encontrado." })
            return
        }

        if (!data.estoque) {
            res.json({ "message": "Não foi possível pegar a quantidade em estoque." })
            return
        }

        try {
            switch (action) {
                case 'getSpecificProduct':
                    res.json(data)
                    break
                case 'checkQtd':
                    if (qtd > data.estoque) {
                        res.json({ "message": "Estoque insuficiente." })
                        return
                    } else {
                        res.json({ "Estoque": data.estoque })
                        return
                    }
                case 'addToCart':
                    const { token } = req.headers
                    if (!token) return
                    const user = await prisma.usuario.findFirst({ where: { authToken: token.toString() } })

                    if(!user) {
                        res.status(400).json({"message": "Usuário não encontrado."})
                    }

                    const novoPedido = await prisma.pedido.create({
                        data: {
                            usuario: {
                                connect: {id: user?.id}
                            },
                            produtos: {
                                create: [
                                    {
                                        produtoId: data.id,
                                        quantidade: parseInt(qtd)
                                    }
                                ]
                            },
                            total: 1
                        }
                    })

                    res.json(novoPedido)

            }
        } catch (error) {
            console.log(error)
        }

    }
    async getProductTypes(req: Request, res: Response) {
        const data = await prisma.produto.findMany()
        if (!data) return

        try {
            const data = await prisma.produto.findMany({
                select: {tipo: true}
            })
    
            const productType = data.reduce((acc: string[], product) => {
                if(!acc.includes(product.tipo)) {
                    acc.push(product.tipo)
                }
                return acc
            }, [])
    
            res.json({types: productType}).status(200)
        } catch(error) {
            console.log(error)
            return
        }
    }
}