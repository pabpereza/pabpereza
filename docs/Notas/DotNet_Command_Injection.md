
![[Command Injection]]

## Métodos de ejecución de comandos en DotNet

### System.Diagnostics.Process.Start
El método process start es el más común para ejecutar comandos en DotNet. Este método permite ejecutar comandos del sistema operativo y recibir la salida.
```csharp
var process = new System.Diagnostics.Process();
var startInfo = new System.Diagnostics.ProcessStartInfo();
startInfo.FileName = "ls";
startInfo.Arguments = "-la";
process.StartInfo = startInfo;
process.Start();
```

## Contramedidas
1. **Validar la entrada del usuario**: Si usas la entrada del usuario para determinar qué proceso iniciar o qué argumentos pasar, debes validar esa entrada cuidadosamente. Puedes usar una lista blanca de comandos permitidos y validar cualquier argumento contra patrones conocidos y seguros.

2. **Evitar la inyección de comandos**: No concatenes directamente la entrada del usuario en una cadena de comandos. En su lugar, usa la propiedad ProcessStartInfo.ArgumentList para pasar argumentos de manera segura al proceso.

3. **Limitar los privilegio**s: Si es posible, ejecuta el proceso con el menor privilegio posible. Si un atacante logra explotar una vulnerabilidad, los daños que pueda causar serán limitados.

4. **Manejar errores de manera segura**: Si se produce un error al iniciar el proceso o mientras se está ejecutando, no reveles detalles internos del sistema que podrían ayudar a un atacante a refinar sus tácticas.

5. **Evitar el uso de ShellExecute**: Establecer UseShellExecute en true puede hacer que tu código sea más vulnerable a ataques, ya que permite que el proceso interactúe con el shell y, por lo tanto, tenga más acceso a realizar acciones potencialmente dañinas.

6. **Mantener el código actualizado**: Mantén tu código y las dependencias actualizadas para beneficiarte de las últimas correcciones de seguridad.


