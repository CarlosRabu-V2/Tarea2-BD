import { Elysia } from 'elysia';
import { PrismaClient } from '@prisma/client';

const app = new Elysia();
const prisma = new PrismaClient();


interface bloquear_usuario {
  correo: string;
  clave: string;
  correo_bloquear: string;
}

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

app.post('/api/bloquear', async (req) =>{
    try{
        const { correo, clave, correo_bloquear } = req.body as bloquear_usuario;

        const admin = await prisma.usuario.findUnique({
            where: {
                direccion_correo: correo,
            },
        });

        if (!admin || admin.clave !== clave) {
            return {
                status: 400,
                body: {message: "Error"}
            };
        }

        const bloqueado = await prisma.direccion_bloqueada.create({
            data:{
                usuario_id: admin.id,
                direccion_bloqueada: correo_bloquear,
                fecha_bloqueo: new Date(),
            },
        });

        console.log(`[${new Date().toISOString()}] Dirección bloqueada: ${correo_bloquear} por usuario ${correo}`);
        return {
            status: 200,
            body: { message: "Dirección bloqueada" }
        };
    } catch (error) {
        console.error(error);
        return {
            status: 500,
            body: { message: "Error"}
        };
    }
});

app.get('/api/informacion/:correo', async (req) => {
    try {
        const correo = req.params.correo;

        const usuario = await prisma.usuario.findUnique({
            where: {
                direccion_correo: correo,
            },
            select: {
                nombre: true,
                direccion_correo: true,
                descripcion: true,
            },
        });

        if (!usuario) {
            return {
                status: 404,
                body: { message: "Usuario no encontrado" }
            };
        }

        return {
            status: 200,
            body: {
                estado: 200,
                nombre: usuario.nombre,
                correo: usuario.direccion_correo,
                descripcion: usuario.descripcion || "Sin descripción"
            }
        };
    } catch (error) {
        console.error(error);
        return {
            status: 500,
            body: { message: 'Error al obtener la información del usuario' }
        };
    }
});

app.post('/api/marcarcorreo', async (req) => {
    try {
        const { correo, clave, id_correo_favorito } = req.body as {
            correo: string;
            clave: string;
            id_correo_favorito: number;
        };

        const usuario = await prisma.usuario.findUnique({
            where: {
                direccion_correo: correo,
            },
        });

        if (!usuario || usuario.clave !== clave) {
            return {
                status: 400,
                body: { message: "Error" }
            };
        }

        const correoFavorito = await prisma.correo.update({
            where: {
                id: id_correo_favorito,
            },
            data: {
                es_favorito: true,
            },
        });

        return {
            status: 200,
            body: { message: "Correo marcado como favorito", correoFavorito }
        };
    } catch (error) {
        console.error(error);
        return {
            status: 500,
            body: { message: 'Error al marcar el correo como favorito' }
        };
    }
});

app.post('/api/desmarcarcorreo', async (req) => {
    try {
        const { correo, clave, id_correo_favorito } = req.body as {
            correo: string;
            clave: string;
            id_correo_favorito: number;
        };

        const usuario = await prisma.usuario.findUnique({
            where: {
                direccion_correo: correo,
            },
        });

        if (!usuario || usuario.clave !== clave) {
            return {
                status: 400,
                body: { message: "Error" }
            };
        }

        const correoFavorito = await prisma.correo.update({
            where: {
                id: id_correo_favorito,
            },
            data: {
                es_favorito: false,
            },
        });

        return {
            status: 200,
            body: { message: "Correo desmarcado", correoFavorito }
        };
    } catch (error) {
        console.error(error);
        return {
            status: 500,
            body: { message: 'Error al desmarcar el correo como favorito' }
        };
    }
});

app.get('/', () => {
    return 'Alabado sea Dios';
});


app.listen(3000, () => {
    console.log('Server running on http://localhost:3000');
});

