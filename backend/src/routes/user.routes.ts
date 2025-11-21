import { Router } from 'express';

import { loginUser } from '../controller/login.controller';

const router = Router();

//  Ruta para iniciar sesión
router.post('/login', loginUser);

export default router;
