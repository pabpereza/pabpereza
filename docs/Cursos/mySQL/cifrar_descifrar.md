
Cifrar y descifrar datos es una tarea muy común en la programación. En este artículo vamos a ver como hacerlo en MySQL.

## Cifrado sin reversibilidad
Estos métodos de cifrado no permiten descifrar el texto cifrado. Es decir, no se puede obtener el texto original a partir del texto cifrado. Se utilizan para almacenar contraseñas en la base de datos. El valor cifrado se llama hash. Este hash se puede comparar con otro hash para comprobar si la contraseña es correcta o no. Así se evita que un atacante pueda obtener las contraseñas de los usuarios.

### SHA1
El algoritmo SHA1 es un algoritmo de cifrado sin reversibilidad. Se utiliza para generar hashes de 40 caracteres. El hash se genera a partir de un texto plano. El texto plano no se puede obtener a partir del hash.

```sql
SELECT SHA1('texto_plano');
```

## Cifrados con reversibilidad
Estos métodos de cifrado permiten descifrar el texto cifrado. Es decir, se puede obtener el texto original a partir del texto cifrado. Se utilizan para almacenar datos sensibles en la base de datos.

Para cifrar y descifrar datos en MySQL se utiliza la función AES_ENCRYPT y AES_DECRYPT. Estas funciones requieren de una clave de cifrado. Esta clave debe ser la misma para cifrar y descifrar los datos.

Ejemplo:

```sql
SELECT AES_ENCRYPT('texto_plano', 'clave_cifrado');
SELECT AES_DECRYPT('texto_cifrado', 'clave_cifrado');
```