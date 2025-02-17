import { Router } from "express"
import { User } from "../controllers/user.controller"
import { Products } from "../controllers/product.controller"
import { userMiddleware } from "../middlewares/user.middleware"


export const routes = Router()

// Configuração para usuários
const usuario = new User()
const usuarioMiddleware = new userMiddleware()

// Configuração para produtos
const produtos = new Products()


// ---Rotas de produto----
routes.get('/pages/cardapio', usuarioMiddleware.verifyToken, produtos.getAllProducts)
routes.post('/pages/products', produtos.dataFront)
routes.get('/pages/dashboard/productTypes', produtos.getProductTypes)

// ---Rotas de usuário----
routes.post('/pages/login', usuario.login)
routes.post('/pages/cadastro', usuario.cadastrar)
routes.post('/validate-token', usuarioMiddleware.verifyToken, usuario.validateToken)
routes.get('/pages/dashboard', usuario.getAllUsers)

routes.get('/pages/dashboard/:id', usuario.getSpecificUser)
routes.delete('/pages/dashboard/:id', usuario.deleteUser)
routes.put('/pages/dashboard', usuario.editUser)