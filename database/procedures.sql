-- ===========================================
-- INSERT USER
-- ===========================================

CREATE PROCEDURE sp_crear_usuario
    @nombre VARCHAR(100),
    @email VARCHAR(120),
    @password VARCHAR(200),
    @id_rol INT
AS
BEGIN
    SET NOCOUNT ON;

    BEGIN TRY
        BEGIN TRAN;

        INSERT INTO USUARIOS (
            nombre, email, password, id_rol
        )
        VALUES (
            @nombre,
            @email,
            HASHBYTES('SHA2_256', @password),
            @id_rol
        );

        SELECT SCOPE_IDENTITY() AS id_usuario;

        COMMIT;
    END TRY
    BEGIN CATCH
        ROLLBACK;
        SELECT ERROR_MESSAGE() AS error;
    END CATCH
END;
GO

-- ===========================================
-- LOGIN
-- ===========================================
GO
CREATE PROCEDURE sp_login_usuario
    @email VARCHAR(120),
    @password VARCHAR(200)
AS
BEGIN
    SET NOCOUNT ON;

    SELECT 
        id_usuario,
        nombre,
        email,
        id_rol,
        estado
    FROM USUARIOS
    WHERE email = @email
      AND password = HASHBYTES('SHA2_256', @password)
      AND estado = 1;
END;
GO

-- ===========================================
-- CREAR EXPEDIENTE
-- ===========================================
CREATE PROCEDURE sp_crear_expediente
    @numero_expediente VARCHAR(50),
    @descripcion VARCHAR(500),
    @id_tecnico INT
AS
BEGIN
    SET NOCOUNT ON;
    BEGIN TRY
        BEGIN TRAN;

        INSERT INTO EXPEDIENTE (
            numero_expediente, descripcion, id_tecnico_registro
        )
        VALUES (@numero_expediente, @descripcion, @id_tecnico);

        SELECT SCOPE_IDENTITY() AS id_expediente;

        COMMIT;
    END TRY
    BEGIN CATCH
        ROLLBACK;
        SELECT ERROR_MESSAGE() AS error;
    END CATCH
END;

-- ===========================================
-- REGISTRAR INDICIO
-- ===========================================
CREATE PROCEDURE sp_crear_indicio
    @id_expediente INT,
    @descripcion VARCHAR(500),
    @color VARCHAR(50),
    @tamano VARCHAR(50),
    @peso VARCHAR(50),
    @ubicacion VARCHAR(200),
    @id_usuario_registro INT
AS
BEGIN
    SET NOCOUNT ON;

    BEGIN TRY
        BEGIN TRAN;

        INSERT INTO INDICIO (
            id_expediente, descripcion, color, tamano, peso, ubicacion, 
            id_usuario_registro
        )
        VALUES (
            @id_expediente, @descripcion, @color, @tamano, @peso,
            @ubicacion, @id_usuario_registro
        );

        SELECT SCOPE_IDENTITY() AS id_indicio;

        COMMIT;
    END TRY
    BEGIN CATCH
        ROLLBACK;
        SELECT ERROR_MESSAGE() AS error;
    END CATCH
END;

-- ===========================================
-- APROBAR EXPEDIENTE
-- ===========================================
CREATE PROCEDURE sp_aprobar_expediente
    @id_expediente INT,
    @id_coordinador INT
AS
BEGIN
    SET NOCOUNT ON;

    BEGIN TRY
        BEGIN TRAN;

        -- Registrar revisión
        INSERT INTO REVISION_EXPEDIENTE (
            id_expediente, id_coordinador, accion
        )
        VALUES (@id_expediente, @id_coordinador, 'aprobado');

        -- Cambiar estado del expediente
        UPDATE EXPEDIENTE
        SET estado = 'aprobado',
            fecha_aprobacion = GETDATE()
        WHERE id_expediente = @id_expediente;

        COMMIT;

        SELECT 'Expediente aprobado correctamente' AS mensaje;
    END TRY
    BEGIN CATCH
        ROLLBACK;
        SELECT ERROR_MESSAGE() AS error;
    END CATCH
END;

-- ===========================================
-- RECHAZAR EXPEDIENTE
-- ===========================================
CREATE PROCEDURE sp_rechazar_expediente
    @id_expediente INT,
    @id_coordinador INT,
    @justificacion VARCHAR(500)
AS
BEGIN
    SET NOCOUNT ON;

    BEGIN TRY
        BEGIN TRAN;

        INSERT INTO REVISION_EXPEDIENTE (
            id_expediente, id_coordinador, accion, justificacion
        )
        VALUES (@id_expediente, @id_coordinador, 'rechazado', @justificacion);

        UPDATE EXPEDIENTE
        SET estado = 'rechazado',
            fecha_rechazo = GETDATE()
        WHERE id_expediente = @id_expediente;

        COMMIT;

        SELECT 'Expediente rechazado correctamente' AS mensaje;
    END TRY
    BEGIN CATCH
        ROLLBACK;
        SELECT ERROR_MESSAGE() AS error;
    END CATCH
END;

-- ===========================================
-- LISTAR EXPEDIENTES
-- ===========================================
CREATE PROCEDURE sp_listar_expedientes
    @estado VARCHAR(20) = NULL,
    @id_tecnico INT = NULL
AS
BEGIN
    SET NOCOUNT ON;

    SELECT 
        e.id_expediente,
        e.numero_expediente,
        e.descripcion,
        e.fecha_registro,
        e.estado,
        u.nombre AS tecnico
    FROM EXPEDIENTE e
    INNER JOIN USUARIOS u ON e.id_tecnico_registro = u.id_usuario
    WHERE (@estado IS NULL OR e.estado = @estado)
      AND (@id_tecnico IS NULL OR e.id_tecnico_registro = @id_tecnico)
    ORDER BY e.fecha_registro DESC;
END;

-- ===========================================
-- LISTAR INDICIOS POR EXPEDIENTE
-- ===========================================
GO
CREATE PROCEDURE sp_listar_indicios_por_expediente
    @id_expediente INT
AS
BEGIN
    SET NOCOUNT ON;

    BEGIN TRY
        
        -- Verificar si existe el expediente
        IF NOT EXISTS (SELECT 1 FROM EXPEDIENTE WHERE id_expediente = @id_expediente)
        BEGIN
            SELECT 'El expediente no existe' AS error;
            RETURN;
        END

        -- Obtener indicios
        SELECT
            i.id_indicio,
            i.descripcion,
            i.color,
            i.tamano,
            i.peso,
            i.ubicacion,
            i.fecha_registro,
            u.nombre AS usuario_registro
        FROM INDICIO i
        INNER JOIN USUARIOS u ON i.id_usuario_registro = u.id_usuario
        WHERE i.id_expediente = @id_expediente
        ORDER BY i.fecha_registro DESC;

    END TRY
    BEGIN CATCH
        SELECT ERROR_MESSAGE() AS error;
    END CATCH
END;
GO
