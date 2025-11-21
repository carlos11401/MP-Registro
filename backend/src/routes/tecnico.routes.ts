import { Router } from 'express';

import { addExpediente } from '../controller/tecnico.controller';
import { Role } from '../enum/role.enum';
import { authenticateToken } from '../midlewares/jwt.midlewares';
import { addIndicio } from '../controller/tecnico.controller';

const router = Router();

router.post('/crearExpediente', authenticateToken([Role.Tecnico]),addExpediente);

router.post('/agregarIndicio', authenticateToken([Role.Tecnico]),addIndicio);

export default router;
