import { Elysia } from 'elysia';
import { PrismaClient } from '@prisma/client';

const app = new Elysia();
const prisma = new PrismaClient();

app.post('/api/registrar', async (req) => {
    try {
        const { nombre, direccion_correo, clave, descripcion } = req.body as {
            nombre: string;
            direccion_correo: string;
            clave: string;
            descripcion?: string;
        };

        const nuevoUsuario = await prisma.usuario.create({
            data: {
                nombre,
                direccion_correo,
                clave,
                descripcion,
                fecha_creacion: new Date(),
                fuente_preferida: null,
            },
        });

        return {
            status: 201,
            body: { message: 'Usuario registrado exitosamente', usuario: nuevoUsuario }
        };
    } catch (error) {
        console.error(error);

        let errorMessage = 'Ocurrió un error al registrar el usuario';
        if (error.code === 'P2002') {
            errorMessage = 'El correo electrónico ya está registrado';
        }

        return {
            status: 500,
            body: { error: errorMessage }
        };
    }
});

app.listen(3000, () => {
    console.log('Servidor escuchando en el puerto 3000');
});


