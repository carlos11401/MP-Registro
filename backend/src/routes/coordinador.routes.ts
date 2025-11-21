import { Router } from 'express';
import { authenticateToken } from '../midlewares/jwt.midlewares';
import { Role } from '../enum/role.enum';
import { listarExpedientes } from '../controller/coordinador.controller';
import { fetchIndiciosByExpediente } from '../controller/coordinador.controller';
import { revisarExpedienteController } from '../controller/coordinador.controller';

const router = Router();

router.get('/expedientes', authenticateToken([Role.Coordinador]), listarExpedientes);

router.get('/expediente/:id_expediente/indicios', authenticateToken([Role.Coordinador]), fetchIndiciosByExpediente);

router.post('/expediente/revision', authenticateToken([Role.Coordinador]), revisarExpedienteController);

export default router;