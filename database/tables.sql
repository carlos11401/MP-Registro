-- ===========================================
-- 1. TABLA ROLES
-- ===========================================
CREATE TABLE ROLES (
    id_rol INT IDENTITY(1,1) PRIMARY KEY,
    nombre VARCHAR(50) NOT NULL
);

-- Cargar roles iniciales
INSERT INTO ROLES (nombre)
VALUES ('tecnico'), ('coordinador');


-- ===========================================
-- 2. TABLA USUARIOS
-- ===========================================
CREATE TABLE USUARIOS (
    id_usuario INT IDENTITY(1,1) PRIMARY KEY,
    nombre VARCHAR(100) NOT NULL,
    email VARCHAR(120) NOT NULL UNIQUE,
    password VARBINARY(32) NOT NULL,
    id_rol INT NOT NULL,
    estado BIT NOT NULL DEFAULT 1,
    fecha_creacion DATETIME NOT NULL DEFAULT GETDATE(),
    FOREIGN KEY (id_rol) REFERENCES ROLES(id_rol)
);

-- ===========================================
-- 3. TABLA EXPEDIENTE
-- ===========================================
CREATE TABLE EXPEDIENTE (
    id_expediente INT IDENTITY(1,1) PRIMARY KEY,
    numero_expediente VARCHAR(50) NOT NULL UNIQUE,
    descripcion VARCHAR(500),
    fecha_registro DATETIME NOT NULL DEFAULT GETDATE(),
    id_tecnico_registro INT NOT NULL,
    estado VARCHAR(20) NOT NULL DEFAULT 'pendiente',  -- pendiente, aprobado, rechazado
    fecha_aprobacion DATETIME NULL,
    fecha_rechazo DATETIME NULL,
    FOREIGN KEY (id_tecnico_registro) REFERENCES USUARIOS(id_usuario)
);
 

-- ===========================================
-- 4. TABLA INDICIO
-- ===========================================
CREATE TABLE INDICIO (
    id_indicio INT IDENTITY(1,1) PRIMARY KEY,
    id_expediente INT NOT NULL,
    descripcion VARCHAR(500) NOT NULL,
    color VARCHAR(50),
    tamano VARCHAR(50),
    peso VARCHAR(50),
    ubicacion VARCHAR(200),
    id_usuario_registro INT NOT NULL,
    fecha_registro DATETIME NOT NULL DEFAULT GETDATE(),
    FOREIGN KEY (id_expediente) REFERENCES EXPEDIENTE(id_expediente),
    FOREIGN KEY (id_usuario_registro) REFERENCES USUARIOS(id_usuario)
);

SELECT * FROM INDICIO
-- ===========================================
-- 5. TABLA REVISION_EXPEDIENTE
-- ===========================================
CREATE TABLE REVISION_EXPEDIENTE (
    id_revision INT IDENTITY(1,1) PRIMARY KEY,
    id_expediente INT NOT NULL,
    id_coordinador INT NOT NULL,
    accion VARCHAR(20) NOT NULL,     -- aprobado / rechazado
    justificacion VARCHAR(500) NULL, -- solo en caso de rechazo
    fecha_accion DATETIME NOT NULL DEFAULT GETDATE(),
    FOREIGN KEY (id_expediente) REFERENCES EXPEDIENTE(id_expediente),
    FOREIGN KEY (id_coordinador) REFERENCES USUARIOS(id_usuario)
);


-- ===========================================
-- 6. TABLA LOG_ACCIONES
-- ===========================================
CREATE TABLE LOG_ACCIONES (
    id_log INT IDENTITY(1,1) PRIMARY KEY,
    id_usuario INT NOT NULL,
    accion VARCHAR(100) NOT NULL,
    entidad_afectada VARCHAR(50),
    id_entidad INT,
    fecha DATETIME NOT NULL DEFAULT GETDATE(),
    detalles VARCHAR(500),
    FOREIGN KEY (id_usuario) REFERENCES USUARIOS(id_usuario)
);



DROP TABLE USUARIOS;
DROP TABLE ROLES;
DROP TABLE expediente;
DROP TABLE revision_expediente;
DROP TABLE LOG_ACCIONES
