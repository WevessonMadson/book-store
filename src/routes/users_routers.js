import { Router } from "express";
import { userCadastro, userLogin, userUpdate, userListAll } from "../controllers/userControllers.js";
import { authorization } from "../auth/auth.js";

const router = Router();

router.post('/user/signup', userCadastro);

router.post('/user/login', userLogin);

router.get('/user/all', authorization, userListAll);

router.put('/user/update/:id', authorization, userUpdate);

export default router;