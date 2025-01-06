import { Request, Response } from "express";
import { prisma } from "../../connection";
import { CreateUserProps } from "../types/userTypes";

export class User {
    async cadastrar(req: Request, res: Response) {

        const reqData: CreateUserProps = req.body

        if (!reqData.nomeCompleto || !reqData.email || !reqData.senha || !reqData.whatsApp || !reqData.nascimento || !reqData.cep || !reqData.cidade || !reqData.bairro || !reqData.numero || !reqData.referencia) {
            res.json({ "message": "Todos os campos devem ser preenchidos." })
            return
        }

        const verifyEmail = await prisma.usuario.findFirst({
            where: {
                email: reqData.email
            }
        })

        const verifyWhatsApp = await prisma.usuario.findFirst({
            where: {
                whatsApp: reqData.whatsApp
            }
        })

        if (verifyEmail) {
            res.json({ "message": "Email já cadastrado no sistema." })
            return
        }

        if (verifyWhatsApp) {
            res.json({ "message": "WhatsApp já cadastrado no sistema." })
            return
        }

        const authInitialToken = crypto.randomUUID()

        try {
            const newUser = await prisma.usuario.create({
                data: {
                    nomeCompleto: reqData.nomeCompleto,
                    email: reqData.email,
                    senha: reqData.senha,
                    whatsApp: reqData.whatsApp,
                    nascimento: new Date(reqData.nascimento).toISOString(),
                    cep: reqData.cep,
                    cidade: reqData.cidade,
                    bairro: reqData.bairro,
                    numero: reqData.numero,
                    authToken: authInitialToken,
                    authTokenExpiry: new Date(Date.now() + 60 * 60 * 1000),
                    referencia: reqData.referencia
                }
            })
            res.status(200).json(newUser.authToken)
        } catch (error) {
            console.log(error)
        }

    }
    async login(req: Request, res: Response) {
        const { email, password } = req.body

        try {
            const userData: CreateUserProps | null = await prisma.usuario.findFirst({
                where: {
                    email: email,
                    senha: password
                }
            })

            if (!userData) {
                res.json({ "message": "Usuário não encontrado." }).status(404)
                return
            }

            const randomToken = () => {
                const random = crypto.randomUUID()
                return random
            }

            const updatedUser = await prisma.usuario.update({
                where: {
                    id: userData.id
                },
                data: {
                    authToken: randomToken(),
                    authTokenExpiry: new Date(Date.now() + 60 * 60 * 1000)
                }
            })

            res.json(updatedUser.authToken)
        } catch (error) {
            console.log(error)
        }
    }
    async validateToken(req: Request, res: Response) {
        const token = req.headers.authorization?.split(' ')[1]

        const getUser = await prisma.usuario.findFirst({
            where: {
                authToken: token
            }
        })

        if (getUser) {
            res.json({
                "auth": true,
                "role": getUser.role
            })
        } else {
            res.json({
                "auth": false,
                "role": false
            })
        }

    }
    async getAllUsers(req: Request, res: Response) {
        const data = await prisma.usuario.findMany()

        if (!data) {
            res.json({ "message": "Erro ao buscar usuários." })
            return
        }

        res.json(data)
    }
    async deleteUser(req: Request, res: Response) {
        const { id } = req.params

        const deleteUser = await prisma.usuario.delete({
            where: {
                id: id
            }
        })

        res.json({ "Usuário deletado": deleteUser })
    }
    async getSpecificUser(req: Request, res: Response) {
        const id = req.params.id

        if(!id) {
            res.json({"message": "ID não fornecido"})
            return
        }

        try {
            const user = await prisma.usuario.findFirst({
                where: {
                    id: id
                }
            })

            res.json(user)

        } catch (error) {
            console.log(error)
        }
    }
    async editUser(req: Request, res: Response) {
        const data = req.body

        switch (data.action) {
            case 'updateUser':
                try {
                    const response = await prisma.usuario.update({
                        where:{
                            id: data.infos.id
                        },
                        data: {
                            nomeCompleto: data.infos.nomeCompleto,
                            email: data.infos.email,
                            senha: data.infos.senha,
                            whatsApp: data.infos.whatsApp,
                            cep: data.infos.cep,
                            cidade: data.infos.cidade,
                            bairro: data.infos.bairro,
                            numero: data.infos.numero,
                            referencia: data.infos.referencia,
                            role: data.infos.role
                        }
                    })
            
                    if (!response) {
                        res.json({"message": "Faltaram informações do usuário"})
                        return
                    }
                    res.json({"message": "Informações do usuário alteradas com sucesso."})
                } catch (error) {
                    console.log(error)
                }
            break
            case 'updateProduct':
                try {
                    const response = await prisma.produto.update({
                        where: { id: data.newInfos.id},
                        data: {
                            nome: data.newInfos.nome,
                            tipo: data.newInfos.tipo,
                            descricao: data.newInfos.descricao,
                            preco: parseFloat(data.newInfos.preco),
                            estoque: parseInt(data.newInfos.estoque)
                        }
                    })

                    if (!response) {
                        res.json({"message": "Faltaram informações do produto"})
                        return
                    }

                    res.json({"message": "Informações do produto alteradas com sucesso."})
                } catch(error) {
                    console.log(error)
                }
        }

    }
}
