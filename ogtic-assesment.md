
## repo:
## notas:
vi que los requests podian retornar errores con mensaje "Unauthorized" por lo que asumi que la API necesitaba implementar algun tipo de mecanismo de autorizacion. Lo que hice fue implementar funciones bien basicas para enviar al ciente JWTs y luego validarlos.

No use ningun ORM ya que es la primera API que escribo en Node y quise mantener las cosas sencillas. Quise hacerlo en Node porque la semana pasada habia empezado a hacer un tutorial de APIs con Express y aproveche este assessment para practicar.

## ejemplo de uso:
* correr `docker-compose build` y luego `docker-compose up` (hay que tener Docker y docker-compose instalado)
* POST a /api/users con body {"username":"andres", "password":"1234"}
* POST a /api/auth con body { username:"andres", password:"1234"} para recibir un JWT que se debe poner en el header de las siguientes peticiones.
Agregar al header el token recibido con el siguiente formato:
```
Key: Authorization
Value: Bearer <token here>
```
* ya se puede hacer GET a todos los endpoints especificados en los requerimientos. Los endpoints `/api/paises` y `/api/paises/1/show` no validan tokens

para correr el build de produccion que no incluye los dev dependencies: `docker-compose -f docker-compose.yml -f docker-compose.prod.yml up -d`
* registro de usuario con encriptado de contraseña

si no tiene docker puede correr `npm install` > `npm run dev` , correr una instancia de postgres localmente y ejecutar manualmente el script que inicializa la base de datos ubicado en `./db_queries/
