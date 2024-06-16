import { Elysia } from 'elysia';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();
const server = new Elysia();

// Configura tus rutas y lógica del servidor aquí
const registro = await prisma.usuario.create({
    data: {
      direccion_correo: 'nuevo_usuario@example.com',
      descripcion: 'Nombre del Nuevo Usuario',
      fecha_creacion: new Date(), // Asegúrate de incluir todos los campos obligatorios
    },
  });
  console.log('Usuario creado:', registro);
  

server.listen(3000, () => {
  console.log('Server running on http://localhost:3000');
});
