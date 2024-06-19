/*
  Warnings:

  - Added the required column `clave` to the `usuario` table without a default value. This is not possible if the table is not empty.
  - Added the required column `nombre` to the `usuario` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "usuario" ADD COLUMN     "clave" TEXT NOT NULL,
ADD COLUMN     "nombre" TEXT NOT NULL;
