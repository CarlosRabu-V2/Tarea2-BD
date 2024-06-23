-- CreateTable
CREATE TABLE "usuario" (
    "id" SERIAL NOT NULL,
    "direccion_correo" TEXT NOT NULL,
    "nombre" TEXT NOT NULL,
    "clave" TEXT NOT NULL,
    "descripcion" TEXT,
    "fecha_creacion" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "usuario_pkey" PRIMARY KEY ("id")
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

    CONSTRAINT "correo_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "direccion_bloqueada" (
    "usuario_id" INTEGER NOT NULL,
    "direccion_bloqueada" TEXT NOT NULL,
    "fecha_bloqueo" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "direccion_bloqueada_pkey" PRIMARY KEY ("usuario_id","direccion_bloqueada")
);

-- CreateIndex
CREATE UNIQUE INDEX "usuario_direccion_correo_key" ON "usuario"("direccion_correo");

-- AddForeignKey
ALTER TABLE "correo" ADD CONSTRAINT "correo_remitente_id_fkey" FOREIGN KEY ("remitente_id") REFERENCES "usuario"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "correo" ADD CONSTRAINT "correo_destinatario_id_fkey" FOREIGN KEY ("destinatario_id") REFERENCES "usuario"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "direccion_bloqueada" ADD CONSTRAINT "direccion_bloqueada_usuario_id_fkey" FOREIGN KEY ("usuario_id") REFERENCES "usuario"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
