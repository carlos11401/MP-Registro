import { Router } from 'express';

import { loginUser } from '../controller/login.controller';
import { addExpediente } from '../controller/tecnico.controller';
import { Role } from '../enum/role.enum';
import { authenticateToken } from '../midlewares/jwt.midlewares';



const router = Router();

//  Ruta para iniciar sesión
router.post('/login', loginUser);

router.post('/crearExpediente', authenticateToken([Role.Tecnico]),addExpediente);

export default router;
