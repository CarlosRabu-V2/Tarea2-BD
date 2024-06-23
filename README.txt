Para ejecutar correctamente el cliente asegurarse de tener instalado bun, elysia, python, prisma y postgresql. 
En nuestro caso trabajamos desde windows.

Para correr el cliente:
1.Configurar correctamente los datos de la base de datos en el archivo .env

2. Migrar y generar las tablas de la base de datos con los siguientes comandos en la terminal:
bun x prisma migrate dev --name init
bun x prisma generate 

3. Correr el servidor en la direccion correcta, es decir en la carpeta api con el comando bun run server.ts

4. Correr el archivo cliente.py en una terminal de python 