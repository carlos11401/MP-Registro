import { Router } from 'express';
import { authenticateToken } from '../midlewares/jwt.midlewares';
import { Role } from '../enum/role.enum';
import { listarExpedientes } from '../controller/coordinador.controller';

const router = Router();

router.get('/expedientes', authenticateToken([Role.Coordinador]), listarExpedientes);

export default router;