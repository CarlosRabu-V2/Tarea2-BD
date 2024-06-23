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

        if (!nombre || !direccion_correo || !clave) {
            return {
                status: 400,
                body: {
                    estado: 400,
                    mensaje: 'Ha existido un error al realizar la petición: Todos los campos obligatorios (nombre, direccion_correo, clave) deben ser proporcionados'
                }
            };
        }

        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(direccion_correo)) {
            return {
                status: 400,
                body: {
                    estado: 400,
                    mensaje: 'Ha existido un error al realizar la petición: El formato del correo electrónico no es válido'
                }
            };
        }

        const nuevoUsuario = await prisma.usuario.create({
            data: {
                nombre,
                direccion_correo,
                clave,
                descripcion,
                fecha_creacion: new Date(),
            },
        });

        return {
            status: 201,
            body: {
                estado: 201,
                mensaje: 'Se realizó la petición correctamente',
                usuario: nuevoUsuario
            }
        };
    } catch (error) {
        console.error(error);

        let errorMessage = 'Ha existido un error al realizar la petición';
        if (error.code === 'P2002') {
            errorMessage = 'Ha existido un error al realizar la petición: El correo electrónico ya está registrado';
        } else {
            errorMessage = `Ha existido un error al realizar la petición: ${error.message}`;
        }

        return {
            status: 500,
            body: {
                estado: 500,
                mensaje: errorMessage
            }
        };
    }
});

app.post('/api/bloquear', async (req) => {
    try {
        const { correo, clave, correo_bloquear } = req.body as bloquear_usuario;

        if (!correo || !clave || !correo_bloquear) {
            return {
                status: 400,
                body: {
                    estado: 400,
                    mensaje: 'Ha existido un error al realizar la petición: Todos los campos obligatorios (correo, clave, correo_bloquear) deben ser proporcionados'
                }
            };
        }

        const admin = await prisma.usuario.findUnique({
            where: {
                direccion_correo: correo,
            },
        });

        if (!admin || admin.clave !== clave) {
            return {
                status: 401,
                body: {
                    estado: 401,
                    mensaje: "Ha existido un error al realizar la petición: Credenciales incorrectas"
                }
            };
        }

        const bloqueado = await prisma.direccion_bloqueada.create({
            data: {
                usuario_id: admin.id,
                direccion_bloqueada: correo_bloquear,
                fecha_bloqueo: new Date(),
            },
        });

        console.log(`[${new Date().toISOString()}] Dirección bloqueada: ${correo_bloquear} por usuario ${correo}`);
        return {
            status: 200,
            body: {
                estado: 200,
                mensaje: "Se realizó la petición correctamente"
            }
        };
    } catch (error) {
        console.error(error);
        return {
            status: 500,
            body: {
                estado: 500,
                mensaje: "Ha existido un error al realizar la petición: Error al bloquear la dirección"
            }
        };
    }
});

app.get('/api/informacion/:correo', async (req) => {
    try {
        const correo = req.params.correo;

        if (!correo) {
            return {
                status: 400,
                body: { 
                    estado: 400,
                    mensaje: "Ha existido un error al realizar la petición: El correo es obligatorio"
                }
            };
        }

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
                body: { 
                    estado: 404,
                    mensaje: "Ha existido un error al realizar la petición: Usuario no encontrado"
                }
            };
        }

        return {
            status: 200,
            body: {
                nombre: usuario.nombre,
                correo: usuario.direccion_correo,
                descripcion: usuario.descripcion || "Sin descripción"
            }
        };
    } catch (error) {
        console.error(error);
        return {
            status: 500,
            body: {
                estado: 500,
                mensaje: 'Ha existido un error al realizar la petición: Error al obtener la información del usuario'
            }
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

        if (!correo || !clave || !id_correo_favorito) {
            return {
                status: 400,
                body: {
                    estado: 400,
                    mensaje: 'Ha existido un error al realizar la petición: Todos los campos obligatorios (correo, clave, id_correo_favorito) deben ser proporcionados'
                }
            };
        }

        const usuario = await prisma.usuario.findUnique({
            where: {
                direccion_correo: correo,
            },
        });

        if (!usuario || usuario.clave !== clave) {
            return {
                status: 401,
                body: {
                    estado: 401,
                    mensaje: "Ha existido un error al realizar la petición: Credenciales incorrectas"
                }
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
            body: {
                estado: 200,
                mensaje: "Se realizó la petición correctamente",
                correoFavorito
            }
        };
    } catch (error) {
        console.error(error);
        return {
            status: 500,
            body: {
                estado: 500,
                mensaje: 'Ha existido un error al realizar la petición: Error al marcar el correo como favorito'
            }
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

        if (!correo || !clave || !id_correo_favorito) {
            return {
                status: 400,
                body: {
                    estado: 400,
                    mensaje: 'Ha existido un error al realizar la petición: Todos los campos obligatorios (correo, clave, id_correo_favorito) deben ser proporcionados'
                }
            };
        }

        const usuario = await prisma.usuario.findUnique({
            where: {
                direccion_correo: correo,
            },
        });

        if (!usuario || usuario.clave !== clave) {
            return {
                status: 401,
                body: {
                    estado: 401,
                    mensaje: "Ha existido un error al realizar la petición: Credenciales incorrectas"
                }
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
            body: {
                estado: 200,
                mensaje: "Se realizó la petición correctamente",
                correoFavorito
            }
        };
    } catch (error) {
        console.error(error);
        return {
            status: 500,
            body: {
                estado: 500,
                mensaje: 'Ha existido un error al realizar la petición: Error al desmarcar el correo como favorito'
            }
        };
    }
});

app.get('/api/verificar-usuario/:correo', async (req, res) => {
    try {
        const correo = req.params.correo;

        const usuario = await prisma.usuario.findUnique({
            where: {
                direccion_correo: correo,
            },
        });

        if (!usuario) {
            return res.status(404).json({ message: "Usuario no encontrado" });
        }

        return res.status(200).json({ message: "Usuario encontrado" });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Error al verificar el usuario' });
    }
});



app.get('/', () => {
    return 'El servidor esta funcionando correctamente';
});


app.listen(3000, () => {
    console.log('El server esta funcionando en http://localhost:3000');
});

