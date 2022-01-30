import { Router } from "express";
import { getUsers, saveUser, verificaLogin } from "./controllers/UsersController";

const routes = Router();

routes.get('/auth', verificaLogin)
routes.post('/users', saveUser)


export default routes;