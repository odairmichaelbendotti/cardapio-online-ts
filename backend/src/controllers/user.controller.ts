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
}