import { Router } from "express"
import { User } from "../controllers/user.controller"

export const routes = Router()
const usuario = new User()

routes.get('/', usuario.login)