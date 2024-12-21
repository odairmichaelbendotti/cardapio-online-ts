import express from 'express'
import dotenv from 'dotenv'
import cors from 'cors'
import { routes } from './src/routes/routes'

const server = express()
server.use(express.json())
server.use(cors())
server.use(routes)

dotenv.config()


server.listen(process.env.SERVER_PORT, () => {
    console.log(`Servidor rodando em http://localhost:${process.env.SERVER_PORT}`)
})