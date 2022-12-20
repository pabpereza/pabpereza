---
date: 2022-12-20
title: "CKA: Mi experiencia"
linkTitle: "CKA: Mi experiencia"
tags: [kubernetes]
description: ""
---

¡Hola! En esta entrada me gustaría contar mi experiencia con la certificación CKA (Certified Kubernetes Administrator). Esta es ofrecida por la Linux Foundation.

Todo este último año he dedica mis esfuerzos tanto en lo personal como en lo profesiona a profundizar mis conocimientos en contenedores y orquestadores de los mismos. Aunque sabía lo que era kuberentes, no había tenido la posibilidad de pelearme con sus tripas.

Lo primero es contestar a las preguntas esenciales que posiblemente os estéis haciendo: 
* ¿Por qué elegí esta certificación? Personalmente me interesaba más la certificación CKS, la cuál, profundiza en kubernetes desde el punto de vista de seguridad pero sacarse el CKA primero era más que recomendado.
* ¿Cuánto tiempo requiere? Sin conocimientos previos, si estas familiarizado con contenedores, entre tres y seis meses te la puedes sacar sin problemas. Todo depende de tu carga te trabajo, rutina personal.. etc. En mi caso, dedicando unas tres horas semanales terminé el temario del libro en 6 meses y el último le pegué un maratón para repasar todo y presentarme al examen. 
* ¿Cuánto tiempo dispongo para hacerlo? La plataforma te deja acceder al curso y examinarte durante un año. Además también tienen dereho a un examen extra en caso de que suspendas.
* ¿Necesito un super ordenador? No, no es necesario. El examen se puede hacer desde cualquier navegador y no requiere de una gran potencia de procesamiento. Para realizar los ejercicios si que es recomendable un ordenador con al menos 16GB de RAM (32GB recomendable) para las múltiples instancias de kubernetes que se van a crear. También podrías hacerlo en máquinas virtuales en la nube, pero yo lo hice en mi ordenador personal.


## Mi experiencia
Ahora si, vamos a lo que nos interesa. Mi experiencia con la certificación CKA. Personalmente no se me hizo especialmente dura, aunque es cierto que tenía conocimientos previos de contenedores y orquestadores y el tema no me era completamente desconocido.

El temario es bastante completo y es recomendable siempre ir poco más allá de los ejercicios que te plantea el libro para adquirir unos conocimientos más sólidos. No te recomiendo dilatar mucho en el tiempo la certificación, si tienes tiempo, hazlo cuanto antes. Cuando al sexto mes había terminado los ejercicios del libro, había olvidado gran parte de lo aprendido y tuve que repasar todo de nuevo para llegar al examen con soltura.

IMPORTANTE. Junto con el libro y el exmanen, también se te da acceso a dos exámenes de prueba en la plataforma killer.sh que te ayudarán a familiarizarte con el examen y a saber si estás preparado para presentarte al examen final. No te frustres si suspendes, es muy normal. Estos tienen una duración y dificultad bastante mayor respecto al examen final. Lo importante es que aunque no te de tiempo o falles, tienes accedo durante 24 horas al examen para que lo termines de completar. Además, puedes ver si las respuestas que has dado son correctas o no (algo que en el examen final no puedes hacer).

De forma complementaria, también puedes hacer ejercicios en la plataforma katacoda, la cuál te permite crear instancias de kubernetes y jugar con ellas. Es una forma muy buena de practicar y aprender.

## El examen
El examen son 17 preguntas ( si no recuerdo mal), estas estan bien descritas y son bastante claras. Hay que obtener al menos 65 puntos para aprobar. Si has hecho los dos exámenes de prueba y has practicado con katacoda, no deberías tener problemas en aprobar.

No creo que sea muy complejo pero si que hay que ir ligero para que luego tengas tiempo de repasar todas las preguntas. Personalmente, ya traía bastante experiencia en vim y tmux por lo que era bastante ágil con el terminal. Por eso es importante que estés familiarizado con los comandos para que no pierdas tiempo en buscarlos.

En cualquier caso, tienes a tu disposición en el navegador de la máquina del examen, acceso a la documentación de kubernetes, entre otras.

### Algunos trucos concretos para mejorar tu velocidad
Cuando empieces el examen la máquina virtual a la que te dan acceso trae la configuración de un linux por defecto. Aquí es interesante que inviertas un par de minutos en configurar tu entorno de trabajo. 

Sin duda ganarás mucho tiempo configurando alias de kubernetes. Al menos el `k` para abreviar `kubectl` y el `dro` para `--dry-run=client -o yaml` te permitirá crear plantillas de objetos de kubernetes mucho más rápido (y el dry-run te permite ver el resultado sin crear el objeto). Estas configuraciones las puedes hacer en el fichero `.bashrc`:
``` bash
alias k=kubectl
alias dro=--dry-run=client -o yaml
```

También puede ser interesante configurar tmux y vim si tienes alguna personalización que aumente tu productividad. Personalmente, con los alias tenía suficiente para ganar tiempo.


## Conclusión
En resumen, la certificación CKA te permite sentirte cómodo administrando un cluster de kubernetes. Si tienes conocimientos previos de contenedores y orquestadores, no debería ser un problema. Si no los tienes, te recomiendo que te familiarices con ellos antes de empezar con la certificación. En cualquier caso, aún con la certificación, te encuentras con muchas situaciones en el día a día que no están cubiertas en el temario y que tendrás que investigar por tu cuenta.

Espero que os haya servido de ayuda. Si tenéis cualquier duda, podéis preguntarme por cualquiera de mis redes sociales. ¡Un saludo!


