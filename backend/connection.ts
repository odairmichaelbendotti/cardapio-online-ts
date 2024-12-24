import { PrismaClient } from "@prisma/client";

export const prisma = new PrismaClient()

async function testeConnection() {
    try {
        await prisma.$connect()
        console.log('Conectado com sucesso ao Banco de Dados.')
    } catch(error) {
        console.log('Erro ao conectar-se ao Banco de Dados.')
        console.log(error)
    }
}

testeConnection()