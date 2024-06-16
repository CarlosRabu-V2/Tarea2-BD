-- CreateTable
CREATE TABLE "versiones_software" (
    "id" SERIAL NOT NULL,
    "nombre_version" TEXT NOT NULL,
    "fecha_lanzamiento" TIMESTAMP(3) NOT NULL,
    "usuario_asociado_id" INTEGER,

    CONSTRAINT "versiones_software_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "correos" (
    "id" SERIAL NOT NULL,
    "remitente_id" INTEGER NOT NULL,
    "destinatario_id" INTEGER NOT NULL,
    "asunto" TEXT NOT NULL,
    "cuerpo" TEXT NOT NULL,
    "fecha_envio" TIMESTAMP(3) NOT NULL,
    "leido" BOOLEAN NOT NULL,
    "es_favorito" BOOLEAN NOT NULL,
    "color_fondo" TEXT,
    "animacion_id" INTEGER,
    "publicidad_id" INTEGER,

    CONSTRAINT "correos_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "animaciones" (
    "id" SERIAL NOT NULL,
    "nombre" TEXT NOT NULL,
    "duracion_segundos" INTEGER NOT NULL,

    CONSTRAINT "animaciones_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "plugins_correo" (
    "id" SERIAL NOT NULL,
    "nombre_plugin" TEXT NOT NULL,
    "correos_afectados" TEXT,
    "idiomas_soportados" TEXT NOT NULL,
    "estilo_firma_id" INTEGER,

    CONSTRAINT "plugins_correo_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "usuarios" (
    "id" SERIAL NOT NULL,
    "direccion_correo" TEXT NOT NULL,
    "descripcion" TEXT,
    "fecha_creacion" TIMESTAMP(3) NOT NULL,
    "fuente_preferida" TEXT,

    CONSTRAINT "usuarios_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "publicidades" (
    "id" SERIAL NOT NULL,
    "contenido_anuncio" TEXT NOT NULL,
    "fecha_mostrado" TIMESTAMP(3) NOT NULL,
    "usuario_id" INTEGER,
    "animacion_id" INTEGER,

    CONSTRAINT "publicidades_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "direcciones_bloqueadas" (
    "usuario_id" INTEGER NOT NULL,
    "direccion_bloqueada" TEXT NOT NULL,
    "fecha_bloqueo" TIMESTAMP(3) NOT NULL,
    "version_softwareId" INTEGER,

    CONSTRAINT "direcciones_bloqueadas_pkey" PRIMARY KEY ("usuario_id","direccion_bloqueada")
);

-- CreateTable
CREATE TABLE "direcciones_favoritas" (
    "usuario_id" INTEGER NOT NULL,
    "direccion_favorita" TEXT NOT NULL,
    "fecha_agregado" TIMESTAMP(3) NOT NULL,
    "categoria" TEXT,

    CONSTRAINT "direcciones_favoritas_pkey" PRIMARY KEY ("usuario_id","direccion_favorita")
);

-- CreateTable
CREATE TABLE "temas_correo" (
    "id" SERIAL NOT NULL,
    "nombre_tema" TEXT NOT NULL,
    "usuario_creador_id" INTEGER NOT NULL,
    "plugin_correo_id" INTEGER,

    CONSTRAINT "temas_correo_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "usuarios_direccion_correo_key" ON "usuarios"("direccion_correo");
