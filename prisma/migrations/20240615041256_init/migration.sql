/*
  Warnings:

  - You are about to drop the `animaciones` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `correos` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `direcciones_bloqueadas` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `direcciones_favoritas` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `plugins_correo` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `publicidades` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `temas_correo` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `usuarios` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `versiones_software` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
DROP TABLE "animaciones";

-- DropTable
DROP TABLE "correos";

-- DropTable
DROP TABLE "direcciones_bloqueadas";

-- DropTable
DROP TABLE "direcciones_favoritas";

-- DropTable
DROP TABLE "plugins_correo";

-- DropTable
DROP TABLE "publicidades";

-- DropTable
DROP TABLE "temas_correo";

-- DropTable
DROP TABLE "usuarios";

-- DropTable
DROP TABLE "versiones_software";

-- CreateTable
CREATE TABLE "version_software" (
    "id" SERIAL NOT NULL,
    "nombre_version" TEXT NOT NULL,
    "fecha_lanzamiento" TIMESTAMP(3) NOT NULL,
    "usuario_asociado_id" INTEGER,

    CONSTRAINT "version_software_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "correo" (
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

    CONSTRAINT "correo_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "animacion" (
    "id" SERIAL NOT NULL,
    "nombre" TEXT NOT NULL,
    "duracion_segundos" INTEGER NOT NULL,

    CONSTRAINT "animacion_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "plugin_correo" (
    "id" SERIAL NOT NULL,
    "nombre_plugin" TEXT NOT NULL,
    "correos_afectados" TEXT,
    "idiomas_soportados" TEXT NOT NULL,
    "estilo_firma_id" INTEGER,

    CONSTRAINT "plugin_correo_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "usuario" (
    "id" SERIAL NOT NULL,
    "direccion_correo" TEXT NOT NULL,
    "descripcion" TEXT,
    "fecha_creacion" TIMESTAMP(3) NOT NULL,
    "fuente_preferida" TEXT,

    CONSTRAINT "usuario_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "publicidad" (
    "id" SERIAL NOT NULL,
    "contenido_anuncio" TEXT NOT NULL,
    "fecha_mostrado" TIMESTAMP(3) NOT NULL,
    "usuario_id" INTEGER,
    "animacion_id" INTEGER,

    CONSTRAINT "publicidad_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "direccion_bloqueada" (
    "usuario_id" INTEGER NOT NULL,
    "direccion_bloqueada" TEXT NOT NULL,
    "fecha_bloqueo" TIMESTAMP(3) NOT NULL,
    "version_softwareId" INTEGER,

    CONSTRAINT "direccion_bloqueada_pkey" PRIMARY KEY ("usuario_id","direccion_bloqueada")
);

-- CreateTable
CREATE TABLE "direccion_favorita" (
    "usuario_id" INTEGER NOT NULL,
    "direccion_favorita" TEXT NOT NULL,
    "fecha_agregado" TIMESTAMP(3) NOT NULL,
    "categoria" TEXT,

    CONSTRAINT "direccion_favorita_pkey" PRIMARY KEY ("usuario_id","direccion_favorita")
);

-- CreateTable
CREATE TABLE "tema_correo" (
    "id" SERIAL NOT NULL,
    "nombre_tema" TEXT NOT NULL,
    "usuario_creador_id" INTEGER NOT NULL,
    "plugin_correo_id" INTEGER,

    CONSTRAINT "tema_correo_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "usuario_direccion_correo_key" ON "usuario"("direccion_correo");
