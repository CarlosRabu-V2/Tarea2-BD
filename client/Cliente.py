import requests
import getpass
import json
from datetime import datetime

BASE_URL = "http://localhost:3000"

def registrar_usuario():
    nombre = input("Ingrese su nombre: ")
    correo = input("Ingrese su correo: ")
    clave = input("Ingrese su clave: ")
    descripcion = input("Ingrese su descripcion: ")
    headers = {
        "Content-Type": "application/json"
    }
    data = {
        "nombre": nombre,
        "direccion_correo": correo,
        "clave": clave,
        "descripcion": descripcion
    }
    
    response = requests.post(f"{BASE_URL}/api/registrar", json=data, headers=headers)
    
    if response.status_code == 200:
        print("Usuario registrado exitosamente")
        print("Respuesta del servidor:", response.json())
    elif response.status_code == 500:
        print("Usuario ya registrado")
        print("Respuesta del servidor:", response.json())
        
    elif response.status_code == 201:
        print("Usuario registrado exitosamente")
        print("Respuesta del servidor:", response.json())
    else:
        print("Error al registrar el usuario")
        print("Código de estado:", response.status_code)
        try:
            print("Respuesta del servidor:", response.json())
        except requests.exceptions.JSONDecodeError:
            print("No se pudo decodificar la respuesta del servidor")
    return

def bloquear_usuario():
    correo = input("Ingrese su correo: ")
    clave = getpass.getpass("Ingrese su clave: ")
    correo_bloquear = input("Ingrese correo a bloquear: ")
    headers = {
        "Content-Type": "application/json"
    }
    data = {
        "correo": correo,
        "clave": clave,
        "correo_bloquear": correo_bloquear
    }
    
    response = requests.post(f"{BASE_URL}/api/bloquear", json=data, headers=headers)
    
    if response.status_code == 200:
        print("Usuario bloqueado exitosamente")
        print("Respuesta del servidor:", response.json())
    elif response.status_code == 201:
        print("Usuario registrado exitosamente")
        print("Respuesta del servidor:", response.json())
    else:
        print("Error al registrar el usuario")
        print("Código de estado:", response.status_code)
        try:
            print("Respuesta del servidor:", response.json())
        except requests.exceptions.JSONDecodeError:
            print("No se pudo decodificar la respuesta del servidor")
    return

def obtener_informacion_usuario():
    correo = input("Ingrese correo a buscar: ")
    headers = {
        "Content-Type": "application/json"
    }
    response = requests.get(f"{BASE_URL}/api/informacion/{correo}", headers=headers)
    
    if response.status_code == 200:
        print("Información del usuario obtenida exitosamente")
        print("Respuesta del servidor:", response.json())
    elif response.status_code == 201:
        print("Información del usuario obtenida exitosamente")
        print("Respuesta del servidor:", response.json())
    else:
        print("Error al obtener la información del usuario")
        print("Código de estado:", response.status_code)
        try:
            print("Respuesta del servidor:", response.json())
        except requests.exceptions.JSONDecodeError:
            print("No se pudo decodificar la respuesta del servidor")
    return

def marcar_correo_como_favorito():
    correo = input("Ingrese su correo: ")
    clave = getpass.getpass("Ingrese su clave: ")
    id_correo_favorito = input("Ingrese ID del correo favorito: ")
    headers = {
        "Content-Type": "application/json"
    }
    data = {
        "correo": correo,
        "clave": clave,
        "id_correo_favorito": int(id_correo_favorito)
    }
    
    response = requests.post(f"{BASE_URL}/api/marcarcorreo", json=data, headers=headers)
    
    if response.status_code == 200:
        print("Correo marcado como favorito exitosamente")
        print("Respuesta del servidor:", response.json())
    elif response.status_code == 201:
        print("Correo marcado como favorito exitosamente")
        print("Respuesta del servidor:", response.json())
    else:
        print("Error al marcar el correo como favorito")
        print("Código de estado:", response.status_code)
        try:
            print("Respuesta del servidor:", response.json())
        except requests.exceptions.JSONDecodeError:
            print("No se pudo decodificar la respuesta del servidor")
    return

def desmarcar_correo_como_favorito():
    correo = input("Ingrese su correo: ")
    clave = getpass.getpass("Ingrese su clave: ")
    id_correo_favorito = input("Ingrese ID del correo favorito: ")
    headers = {
        "Content-Type": "application/json"
    }
    data = {
        "correo": correo,
        "clave": clave,
        "id_correo_favorito": int(id_correo_favorito)
    }
    
    response = requests.post(f"{BASE_URL}/api/desmarcarcorreo", json=data, headers=headers)
    
    if response.status_code in [200, 201]:
        print("Correo desmarcado como favorito exitosamente")
        print("Respuesta del servidor:", response.json())
    else:
        print("Error al desmarcar el correo como favorito")
        print("Código de estado:", response.status_code)
        try:
            print("Respuesta del servidor:", response.json())
        except requests.exceptions.JSONDecodeError:
            print("No se pudo decodificar la respuesta del servidor")
    return



def verificar_usuario():
    correo=input("Ingrese correo:")
    headers = {
        "Content-Type": "application/json"
    }
    try: 
        response = requests.get(BASE_URL ,  headers=headers)
        if response.status_code == 200:
            print("Correo si existe")
            
            return True
        elif response.status_code == 404:
            print("Correo no existe")
            print("Respuesta del servidor:", response.json())
            return False
        else:
            print("Error al verificar el usuario:", response.json())
            return False
    except Exception as e:
        print("Error al realizar la solicitud:", str(e))
        return False
    
def main():
    registrar_usuario()
    while True:
        print("Menú de opciones:")
        print("1. Registrar un nuevo usuario")
        print("2. Enviar un correo")
        print("3. Bloquear un usuario")
        print("4. Ver información de una dirección de correo electrónico")
        print("5. Marcar un correo como favorito")
        print("6. Desmarcar un correo como favorito")
        print("7. Terminar con la ejecución del cliente")
        
        option = input("Elige una opción: ")
        
        if option == "1":
            registrar_usuario()
        elif option == "2":
            print("opción no disponible")
        elif option == "3":
            bloquear_usuario()
        elif option == "4":
            obtener_informacion_usuario()
        elif option == "5":
            marcar_correo_como_favorito()
        elif option == "6":
            desmarcar_correo_como_favorito()
        elif option == "7":
            print("Terminando la ejecución del cliente")
            break

        else:
            print("Opción no válida, intenta nuevamente")

if __name__ == "__main__":
    main()