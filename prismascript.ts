import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  // Crear un nuevo usuario
  const nuevoUsuario = await prisma.usuario.create({
    data: {
      direccion_correo: 'john.doe@example.com',
      descripcion: 'Un usuario de prueba',
      fecha_creacion: new Date(),
    },
  });
  console.log('Nuevo usuario creado:', nuevoUsuario);

  // Obtener todos los usuarios
  const usuarios = await prisma.usuario.findMany();
  console.log('Todos los usuarios:', usuarios);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });