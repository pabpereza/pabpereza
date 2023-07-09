Un dockerfile permite la definición del proceso de construcción de un contenedor #docker .



## Seguridad y buenas prácticas
Lista de checks de #security 
- [ ] Usar una imagen ligera
- [ ] Optimizar orden de construcción
	- [ ] Instalar paquetes y dependencias de SO lo primero (cachear en otro imagen)
	- [ ] Copiar primero definición de librerías y luego construir.
- [ ] Multi-stage
	- [ ] Evitar compiladores
	- [ ] Evitar cache del proceso de build
- [ ] Evitar usuario root
- [ ] Permisos de archivos (al copiar del builder)

## Por tecnología
[[Dockerfile Python]]
[[Dockerfile Node]]
[[Dockerfile Java]]

