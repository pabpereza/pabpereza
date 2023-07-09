---
title: "Path Traversal"
tags: ["dotnet"]
---

![[Path Traversal]]


# DotNET Path Traversal

En el contexto de .NET, un ejemplo de una vulnerabilidad de Path Traversal podría ser el manejo no seguro de la entrada del usuario para cargar un archivo:

```csharp
[HttpGet]
public IActionResult Download(string fileName)
{
    string path = Path.Combine(_hostingEnvironment.WebRootPath, fileName);
    byte[] fileBytes = System.IO.File.ReadAllBytes(path);
    
    return File(fileBytes, "application/octet-stream", fileName);
}
```

En este ejemplo, el método Download acepta un parámetro de fileName que se utiliza directamente para crear una ruta al archivo que se va a descargar. Si un atacante proporciona una ruta de archivo manipulada, podría acceder a cualquier archivo al que el servidor tenga acceso, no solo a los archivos dentro del directorio web.

Para proteger contra los ataques de Path Traversal, debes asegurarte de que cualquier entrada del usuario que se utilice en la construcción de rutas de archivos esté correctamente validada y saneada. Una manera de hacer esto en .NET es usar el método Path.GetFullPath para obtener la ruta absoluta del archivo y luego verificar que la ruta esté dentro del directorio permitido:

```csharp
[HttpGet]
public IActionResult Download(string fileName)
{
    string fullPath = Path.GetFullPath(Path.Combine(_hostingEnvironment.WebRootPath, fileName));

    if (!fullPath.StartsWith(_hostingEnvironment.WebRootPath))
    {
        // Si la ruta del archivo no comienza con la ruta permitida, se devuelve un error.
        return BadRequest();
    }

    byte[] fileBytes = System.IO.File.ReadAllBytes(fullPath);

    return File(fileBytes, "application/octet-stream", fileName);
}
```

En este código, si un atacante intenta usar una ruta manipulada para fileName, la ruta final no comenzará con _hostingEnvironment.WebRootPath y el método devolverá un error.

## Contramedidas
1. **Validación de Entrada**: Antes de utilizar la entrada del usuario en operaciones de sistemas de archivos, se debe verificar que la entrada sea válida. Esto podría incluir la comprobación de que la entrada no contenga caracteres o secuencias de caracteres no permitidos (como "../" o "./") o que no exceda una cierta longitud.
2. **Saneamiento de Entrada**: Incluso después de la validación, es una buena práctica realizar el saneamiento de las entradas para asegurarse de que no contengan ninguna secuencia maliciosa. Esto podría implicar el uso de funciones como Path.GetFullPath() en .NET para obtener una ruta de archivo normalizada.
3. **Limitación del Acceso a los Archivos:** Idealmente, los usuarios sólo deberían tener acceso a un conjunto limitado de archivos específicos en el servidor. Esto puede lograrse manteniendo estos archivos en un directorio específico y asegurándose de que cualquier operación de archivo se realice sólo dentro de este directorio.
4. **Aplicación del Principio del Mínimo Privilegio:** Este principio dicta que el código debería ejecutarse con el menor conjunto de privilegios posible. En el caso de las operaciones del sistema de archivos, esto podría implicar que el proceso del servidor se ejecute con una cuenta de usuario con permisos limitados para prevenir el acceso a archivos sensibles del sistema.
5. **Uso de Listas de Control de Acceso (ACL)**: Las ACLs pueden usarse para limitar qué usuarios o procesos pueden acceder a qué archivos. Esto puede proporcionar una capa adicional de protección contra los ataques de Path Traversal.
6. **Gestión de Errores**: Los errores o excepciones que ocurren durante las operaciones del sistema de archivos deben gestionarse de forma segura para evitar la divulgación de información sensible. Esto podría implicar la captura de excepciones y el registro de los detalles del error en un lugar seguro, y la presentación al usuario de un mensaje de error genérico.
