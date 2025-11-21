-- ============================
-- TÉCNICOS
-- ============================
EXEC sp_crear_usuario
    @nombre = 'Juan Pérez',
    @email = 'juan.perez@demo.com',
    @password = '123456',
    @id_rol = 1;
EXEC sp_crear_usuario 
    @nombre = 'Carlos Pérez',
    @email = 'carlos.perez@prueba.com',
    @password = 'pass1234',
    @id_rol = 1;

EXEC sp_crear_usuario 
    @nombre = 'Luis Gómez',
    @email = 'luis.gomez@prueba.com',
    @password = 'tecnico2025',
    @id_rol = 1;

EXEC sp_crear_usuario 
    @nombre = 'Marta López',
    @email = 'marta.lopez@prueba.com',
    @password = 'martaPass',
    @id_rol = 1;

EXEC sp_crear_usuario 
    @nombre = 'Jorge Ramírez',
    @email = 'jorge.ramirez@prueba.com',
    @password = 'jorge123',
    @id_rol = 1;

SELECT * FROM usuarios;
SELECT * FROM expediente;
SELECT * FROM indicio;
SELECT * FROM REVISION_EXPEDIENTE;


-- ============================
-- COORDINADORES
-- ============================
SELECT * FROM usuarios;
EXEC sp_crear_usuario
    @nombre = 'María López',
    @email = 'maria.lopez@demo.com',
    @password = 'secreta',
    @id_rol = 2;

EXEC sp_crear_usuario 
    @nombre = 'Ana Rodríguez',
    @email = 'ana.rodriguez@prueba.com',
    @password = 'coor2025',
    @id_rol = 2;

EXEC sp_crear_usuario 
    @nombre = 'Roberto Santos',
    @email = 'roberto.santos@prueba.com',
    @password = 'passCoord',
    @id_rol = 2;