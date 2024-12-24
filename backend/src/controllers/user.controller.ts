import { Request, Response } from "express";
import { prisma } from "../../connection";
import { CreateUserProps, PrismaErrorProps } from "../types/userTypes";

export class User {
    async cadastrar(req: Request, res: Response) {

        const reqData: CreateUserProps = req.body

        if ( !reqData.name || !reqData.email || !reqData.password || !reqData.whatsApp || !reqData.aniversario || !reqData.cep || !reqData.cidade || !reqData.bairro || !reqData.numero || !reqData.referencia ) {
            res.json({"message": "Todos os campos devem ser preenchidos."})
            return
        }

        const verifyEmail = await prisma.usuario.findFirst({
            where: {
                email: reqData.email
            }
        })

        const verifyWhatsApp = await prisma.usuario.findFirst({
            where: {
                WhatsApp: reqData.whatsApp
            }
        })

        if (verifyEmail) {
            res.json({"message": "Email já cadastrado no sistema."})
            return
        }

        if (verifyWhatsApp) {
            res.json({"message": "WhatsApp já cadastrado no sistema."})
            return
        }

        try {
            await prisma.usuario.create({
                data: {
                    nomeCompleto: reqData.name,
                    email: reqData.email,
                    senha: reqData.password,
                    WhatsApp: reqData.whatsApp,
                    nascimento: new Date(reqData.aniversario).toISOString(),
                    cep: reqData.cep,
                    cidade: reqData.cidade,
                    bairro: reqData.bairro,
                    numero: reqData.numero,
                    referencia: reqData.referencia
                }
            })

            res.status(200).json({"message": "Usuário criado com sucesso."})
        } catch (error) {
            console.log(error)
        }

    }
    async login(req: Request, res: Response) {
        const { email, password } = req.body

        const userData = await prisma.usuario.findFirst({
            where: {
                email: email,
                senha: password
            }
        })

        if (!userData) {
            res.json({"message": "Usuário não encontrado."}).status(404)
            return
        }

        res.json(userData).status(200)
        return
    }
}