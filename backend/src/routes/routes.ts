import { Router } from "express"
import { User } from "../controllers/user.controller"

export const routes = Router()
const usuario = new User()

routes.post('/pages/login', usuario.login)
routes.post('/pages/cadastro', usuario.cadastrar)