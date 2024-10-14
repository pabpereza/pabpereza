"use strict";(self.webpackChunkpabpereza=self.webpackChunkpabpereza||[]).push([[6700],{11924:(e,o,n)=>{n.r(o),n.d(o,{assets:()=>i,contentTitle:()=>d,default:()=>u,frontMatter:()=>a,metadata:()=>c,toc:()=>t});var s=n(17624),r=n(4552);const a={},d=void 0,c={id:"notas/seguridad-contenedores",title:"seguridad-contenedores",description:"Introducci\xf3n",source:"@site/docs/notas/seguridad-contenedores.md",sourceDirName:"notas",slug:"/notas/seguridad-contenedores",permalink:"/docs/notas/seguridad-contenedores",draft:!1,unlisted:!1,editUrl:"https://github.com/pabpereza/pabpereza/tree/main/docs/notas/seguridad-contenedores.md",tags:[],version:"current",frontMatter:{},sidebar:"notas",previous:{title:"redes",permalink:"/docs/notas/redes"},next:{title:"SQLMap",permalink:"/docs/notas/sqlmap"}},i={},t=[{value:"Introducci\xf3n",id:"introducci\xf3n",level:2},{value:"Aislados pero no herm\xe9ticos - Posibles malas configuraciones",id:"aislados-pero-no-herm\xe9ticos---posibles-malas-configuraciones",level:2},{value:"Montaje de vol\xfamenes",id:"montaje-de-vol\xfamenes",level:3},{value:"Ejecuci\xf3n de contenedores en modo privilegiado",id:"ejecuci\xf3n-de-contenedores-en-modo-privilegiado",level:3},{value:"Escalado a trav\xe9s del grupo de docker",id:"escalado-a-trav\xe9s-del-grupo-de-docker",level:3},{value:"Host vulnerable",id:"host-vulnerable",level:3},{value:"Secretos o variables de entorno",id:"secretos-o-variables-de-entorno",level:3},{value:"Montaje del socket",id:"montaje-del-socket",level:3},{value:"Pivotar a otros contenedores de la red.",id:"pivotar-a-otros-contenedores-de-la-red",level:3},{value:"Herramientas",id:"herramientas",level:2},{value:"Deepce",id:"deepce",level:3}];function l(e){const o={a:"a",code:"code",h2:"h2",h3:"h3",p:"p",pre:"pre",...(0,r.M)(),...e.components};return(0,s.jsxs)(s.Fragment,{children:[(0,s.jsx)(o.h2,{id:"introducci\xf3n",children:"Introducci\xf3n"}),"\n",(0,s.jsx)(o.p,{children:"Los contenedores son procesos aislados que, por defecto, \xbfse podr\xedan considerar como seguros?. Su enfoque nos dice que s\xed pero existen muchos casos en los que, principalmente por malas configuraciones, podr\xedan ser vulnerables."}),"\n",(0,s.jsx)(o.h2,{id:"aislados-pero-no-herm\xe9ticos---posibles-malas-configuraciones",children:"Aislados pero no herm\xe9ticos - Posibles malas configuraciones"}),"\n",(0,s.jsx)(o.p,{children:"Tecnolog\xedas de contenedores como Docker, LXC, LXD, etc.. permiten a los usuarios lanzar un proceso aislado pero, existen multiples funcionalidades, que podr\xedan comprometer la aplicaci\xf3n en mayor o menor medida:"}),"\n",(0,s.jsx)(o.h3,{id:"montaje-de-vol\xfamenes",children:"Montaje de vol\xfamenes"}),"\n",(0,s.jsx)(o.p,{children:"Esta funcionalidad permite montar un volumen en un contenedor. Un volumen puede ser una carpeta o archivo en el sistema de archivos del host o un filesystem aislado que cree docker junto con el contenedor. Los vol\xfamenes se suelen utilizar para dar persistencia a los datos de un contenedor y as\xed evitar cuando se para o se vuelve a desplegar un contenedor los datos ser pierdan."}),"\n",(0,s.jsx)(o.p,{children:"Cuando montamos como volumen parte del host en un contenedor tenemos que tener en cuenta el usuario que ejecuta el engine de docker y el grupo de permisos y, por otra parte, el usuario que ejecuta el contenedor. Si montamos ficheros del hosts sensibles y los montamos en cualquier contenedor que ejecute el usuario root, este usuario ser\xeda capaz de acceder a los ficheros. Es importante que los contenedores no utilicen vol\xfamenes sensibles, montar ficheros o directorios muy espec\xedficos y que los contenedores no utilicen el usuario root."}),"\n",(0,s.jsx)(o.p,{children:"Tambi\xe9n se podr\xeda cambiar el usuario que ejecuta el engine de docker pero acarreo muchos problemas de funcionamiento a d\xeda de hoy y no lo recomiendo. Lo ideal es crear un usuario en el host y asignarle la propiedad de los archivos que queremos montar en el contenedor y, a su vez, ejecutar el contenedor con dicho usuario."}),"\n",(0,s.jsxs)(o.p,{children:["Si por ejemplo ejecutamos un contenedor montado un directorio del host (en este caso ",(0,s.jsx)(o.code,{children:"/etc"}),") y ejecutamos el contenedor como root, este podr\xe1 leerlo y modificarlo sin problemas."]}),"\n",(0,s.jsx)(o.pre,{children:(0,s.jsx)(o.code,{className:"language-shell",children:"docker run -it -v /etc:/host busybox sh  \n\ncat /host/shadow # Comando dentro del contenedor\nroot:*:18970:0:99999:7:::\n...\nsystemd-timesync:*:18970:0:99999:7:::\nsystemd-network:*:18970:0:99999:7:::\nsystemd-resolve:*:18970:0:99999:7:::\nstrike:<CENSORED>:18986:0:99999:7:::\n...\n"})}),"\n",(0,s.jsx)(o.p,{children:"En mi linux tengo un usuario strike que no tiene permiso de root. Vamos a ejecutar este contenedor con este usuario para entender que docker arrastra los permisos de archivos del host a los contenedores."}),"\n",(0,s.jsxs)(o.p,{children:["Primero hago un ",(0,s.jsx)(o.code,{children:"cat /etc/passwd"})," para obtener el uid de mi usuario strike:"]}),"\n",(0,s.jsx)(o.pre,{children:(0,s.jsx)(o.code,{className:"language-shell",children:"cat /etc/passwd                                                                                           \nroot:x:0:0:root:/root:/bin/bash\ndaemon:x:1:1:daemon:/usr/sbin:/usr/sbin/nologin\n...\nstrike:x:1000:1000:,,,:/home/strike:/usr/bin/zsh\n...\n"})}),"\n",(0,s.jsxs)(o.p,{children:["Sabiendo que el uid de mi usuario strike es 1000, vamos a ejecutar el contenedor con este usuario (especificamos el usuario con el par\xe1metro ",(0,s.jsx)(o.code,{children:"-u <uid>"}),"):"]}),"\n",(0,s.jsx)(o.pre,{children:(0,s.jsx)(o.code,{className:"language-shell",children:"docker run -it -u 1000 -v /etc/:/host busybox sh\n\ncat /host/shadow # Comando dentro del contenedor> $ docker run -it -u 1000 -v /etc/:/host busybox \ncat: cant open host/shadow: Permission denied\n/ $\n"})}),"\n",(0,s.jsx)(o.p,{children:"Es importante entender esto para no comprometer la seguridad de los archivos del host. Por eso hay que evitar utilizar el usuario root en los contenedores y, por otra parte, evitar montar ficheros sensibles."}),"\n",(0,s.jsx)(o.h3,{id:"ejecuci\xf3n-de-contenedores-en-modo-privilegiado",children:"Ejecuci\xf3n de contenedores en modo privilegiado"}),"\n",(0,s.jsxs)(o.p,{children:["Este modo de ejecuci\xf3n permite a un contenedor acceder a ciertos recursos que, por defecto, estan restringidos. Este modo se activa con la opci\xf3n ",(0,s.jsx)(o.code,{children:"--privileged"})," en el comando run de un contenedor."]}),"\n",(0,s.jsx)(o.p,{children:"Esto permitir\xeda acceder al hardware del host y los recursos de red. Podr\xeda montar dispositivos como USB, interfaces de red.. etc."}),"\n",(0,s.jsx)(o.p,{children:"Dicho esto, la forma m\xe1s sencilla de escalar privilegios es montando el disco del host y buscando secretos u otros accesos:"}),"\n",(0,s.jsx)(o.pre,{children:(0,s.jsx)(o.code,{className:"language-bash",children:"# Dentro del contenedor privilegiado suponiendo que el disco del hosts se llama /dev/sda\nmkdir -p /mnt/hola\nmount /dev/sda1 /mnt/hola\n"})}),"\n",(0,s.jsxs)(o.p,{children:["Hay m\xe1s formas pero he documentado la m\xe1s sencilla e interesante. En esta referencia pod\xe9is encontrar m\xe1s formas:\n",(0,s.jsx)(o.a,{href:"https://book.hacktricks.xyz/linux-unix/privilege-escalation/docker-breakout/docker-breakout-privilege-escalation#privileged",children:"Documentaci\xf3n de Hacktricks"})]}),"\n",(0,s.jsx)(o.h3,{id:"escalado-a-trav\xe9s-del-grupo-de-docker",children:"Escalado a trav\xe9s del grupo de docker"}),"\n",(0,s.jsx)(o.p,{children:"Imaginaros ahora que hemos accedido a un hosts del que no somos root pero tiene docker instalado y nuestro usuario tiene permisos para ejecutar docker. Podr\xedamos ejecutar un contenedor en modo privilegiado para acceder a los recursos del host y conseguir escalar."}),"\n",(0,s.jsx)(o.pre,{children:(0,s.jsx)(o.code,{className:"language-bash",children:"docker run -it -v /:/host/ debian chroot /host/ bash\n"})}),"\n",(0,s.jsx)(o.h3,{id:"host-vulnerable",children:"Host vulnerable"}),"\n",(0,s.jsx)(o.p,{children:"Aunque no es muy frecuente, aparecen vulnerabilidades en las tecnolog\xedas, ya sea en docker, el kernel de linux, etc. que puede permitir que un host sea vulnerado."}),"\n",(0,s.jsx)(o.p,{children:"Como siempre, la recomendaci\xf3n es tener actualizado el kernel de linux a la \xfaltima versi\xf3n estable, as\xed como tambi\xe9n el engine de docker o la tecnolog\xeda de contenedores que est\xe9s utilizando."}),"\n",(0,s.jsx)(o.h3,{id:"secretos-o-variables-de-entorno",children:"Secretos o variables de entorno"}),"\n",(0,s.jsx)(o.p,{children:"El objetivo de crear una imagen de contenedor es paquetizar tu software para que est\xe9 listo para arrancar al instante, eso s\xed, siempre requiere una configuraci\xf3n en la mayor\xeda de los casos. Si es una base de datos, necesitar\xe1 definir usuarios y contrase\xf1as, si es una p\xe1gina web, necesitar\xe1 definir una configuraci\xf3n de servidor, etc."}),"\n",(0,s.jsx)(o.p,{children:"Meter esos secretos en la imagen ser\xeda un fallo de seguridad y adem\xe1s romper\xeda la versatilidad de coger una imagen que pueda funcionar en diferentes casos. Para configurar un contenedor, lo m\xe1s com\xfan, es a\xf1adir variables de entono a la imagen en tiempo de ejecuci\xf3n."}),"\n",(0,s.jsx)(o.p,{children:"Por ejemplo, para configurar un servidor de base de datos de mariadb y que funcione en un contenedor tenemos que definir al menos la contrase\xf1a del usuario root:"}),"\n",(0,s.jsx)(o.pre,{children:(0,s.jsx)(o.code,{className:"language-bash",children:"docker run --name some-mariadb -e MARIADB_ROOT_PASSWORD=contrase\xf1a -d mariadb:latest\n"})}),"\n",(0,s.jsx)(o.p,{children:"Muchas aplicaciones no gestionan esto correctamente, es decir, no limpian las variables de entorno que datos sensibles una vez que cargan los secretos en memoria."}),"\n",(0,s.jsxs)(o.p,{children:["Por eso, uno de los primeros pasos de un pentester es consultar el ",(0,s.jsx)(o.code,{children:"environment"})," del contenedor:"]}),"\n",(0,s.jsx)(o.pre,{children:(0,s.jsx)(o.code,{className:"language-bash",children:"# Simplemente entrando al terminal del contenedor y ejecutando el comando env dentro del contenedor\n> $ docker exec -it some-mariadb /bin/bash\nroot@5f3f1ce5b7e1: env\nHOSTNAME=5f3f1ce5b7e1\nPWD=/\nHOME=/root\nMARIADB_VERSION=1:10.7.3+maria~focal\nGOSU_VERSION=1.14\nTERM=xterm\nMARIADB_MAJOR=10.7\nSHLVL=1\nMARIADB_ROOT_PASSWORD=contrase\xf1a\nPATH=/usr/local/sbin:/usr/local/bin:/usr/sbin:/usr/bin:/sbin:/bin\n_=/usr/bin/env\n"})}),"\n",(0,s.jsx)(o.p,{children:"Podr\xedamos ver que el credencial sigue ah\xed una vez arrancado el contenedor."}),"\n",(0,s.jsx)(o.p,{children:"Tambi\xe9n podr\xedamos ver las variables de entorno desde fuera con el siguiente comando:"}),"\n",(0,s.jsx)(o.pre,{children:(0,s.jsx)(o.code,{className:"language-bash",children:"docker container inspect --format '{{.Config.Env}}' <nombre contenedor>\n"})}),"\n",(0,s.jsx)(o.h3,{id:"montaje-del-socket",children:"Montaje del socket"}),"\n",(0,s.jsx)(o.p,{children:"Cuando utilizamos diferentes comandos de docker, como por ejemplo docker run, lo que hace el cliente de docker es comunicarse con el engine mediante un socket."}),"\n",(0,s.jsx)(o.p,{children:"En algunos escenarios en los que se necesita ejecutar comandos de docker dentro de un contenedor, por ejemplo, un orquestador de servicios montado sobre docker que necesite levantar otros contenedores a su vez."}),"\n",(0,s.jsxs)(o.p,{children:["Ejemplo de una herramienta ",(0,s.jsx)(o.code,{children:"Jenkins"})," que orquesta el despliegue de contenedores. A su vez, esta herramienta tambi\xe9n est\xe1 dentro de un contenedor y tiene el socket de docker montado. Por \xfaltimo, tanto el contenedor del front como el del jenkins est\xe1n expuestos a internet."]}),"\n",(0,s.jsx)(o.p,{children:"Si este orquestador es vulnerado por un atacante, teniendo acceso al socket del docker engine (que recordemos que se ejecuta con el usuario root), podr\xeda montar el sistema de archivos del host con permisos de root f\xe1cilmente."}),"\n",(0,s.jsx)(o.p,{children:"Por ejemplo, para docker:"}),"\n",(0,s.jsx)(o.pre,{children:(0,s.jsx)(o.code,{className:"language-bash",children:"docker run -it -v /:/host/ debian:11 chroot /host/ bash\n"})}),"\n",(0,s.jsx)(o.h3,{id:"pivotar-a-otros-contenedores-de-la-red",children:"Pivotar a otros contenedores de la red."}),"\n",(0,s.jsx)(o.p,{children:"Docker por defecto crea una red donde ejecuta todos estos contenedores. Si no especificamos nada, todos los contenedores se ejecutan en la misma red. Esto puede permitir que se comprometa las seguridad de otros contenedores de la red."}),"\n",(0,s.jsx)(o.p,{children:"Supongamos el escenario anterior del jenkins con el socket de docker montado. Imaginaros que este caso pudi\xe9semos vulnerar el back de la aplicaci\xf3n. Este no tendr\xeda acceso directamente al socket de docker pero podr\xedamos intentar pivotar a otros contenedores de la red."}),"\n",(0,s.jsx)(o.p,{children:"Para solventar esto, en el momento de la creaci\xf3n de un contenedor, podemos especificar una red diferente. Por ejemplo, para aislar la aplicaci\xf3n web completamente del jenkins:"}),"\n",(0,s.jsx)(o.pre,{children:(0,s.jsx)(o.code,{className:"language-bash",children:"# Primero creamos la red\ndocker network create <nombre de la red>\n\n# Creamos el front y el back de la aplicaci\xf3n y los a\xf1adimos a la nueva red\ndocker run -d --name front --network <nombre de la red> <imagen del front>\ndocker run -d --name back --network <nombre de la red> <imagen del back>\n"})}),"\n",(0,s.jsx)(o.p,{children:"As\xed evitar\xedamos que aunque una aplicaci\xf3n sea vulnerada no afecte al resto de contenedor y servicios que est\xe9n desplegados en el mismo host."}),"\n",(0,s.jsx)(o.h2,{id:"herramientas",children:"Herramientas"}),"\n",(0,s.jsx)(o.h3,{id:"deepce",children:"Deepce"}),"\n",(0,s.jsxs)(o.p,{children:["Esta herramienta permite enumerar y escalar privilegios en contenedores. Est\xe1 escrita puramente en ",(0,s.jsx)(o.code,{children:"sh"})," sin ninguna dependencia pero, para aprovechar todas las funcionalidades, usa herramientas como ",(0,s.jsx)(o.code,{children:"curl"}),", ",(0,s.jsx)(o.code,{children:"nmap"}),", ",(0,s.jsx)(o.code,{children:"nslookup"})," y ",(0,s.jsx)(o.code,{children:"dig"})," si estan disponibles."]}),"\n",(0,s.jsxs)(o.p,{children:["Este es su repositorio de github:\n",(0,s.jsx)(o.a,{href:"https://github.com/stealthcopter/deepce",children:"https://github.com/stealthcopter/deepce"})]}),"\n",(0,s.jsx)(o.p,{children:"La descarga de la aplicaci\xf3n se puede hacer:"}),"\n",(0,s.jsx)(o.pre,{children:(0,s.jsx)(o.code,{className:"language-shell",children:"# Con wget\nwget https://github.com/stealthcopter/deepce/raw/main/deepce.sh\n\n# Con curl\ncurl -sL https://github.com/stealthcopter/deepce/raw/main/deepce.sh -o deepce.sh\n"})}),"\n",(0,s.jsx)(o.p,{children:"Una vez descargado, le asignamos permisos de ejecuci\xf3n y lo ejecutamos:"}),"\n",(0,s.jsx)(o.pre,{children:(0,s.jsx)(o.code,{className:"language-shell",children:"chmod +x deepce.sh\n./deepce.sh\n"})})]})}function u(e={}){const{wrapper:o}={...(0,r.M)(),...e.components};return o?(0,s.jsx)(o,{...e,children:(0,s.jsx)(l,{...e})}):l(e)}},4552:(e,o,n)=>{n.d(o,{I:()=>c,M:()=>d});var s=n(11504);const r={},a=s.createContext(r);function d(e){const o=s.useContext(a);return s.useMemo((function(){return"function"==typeof e?e(o):{...o,...e}}),[o,e])}function c(e){let o;return o=e.disableParentContext?"function"==typeof e.components?e.components(r):e.components||r:d(e.components),s.createElement(a.Provider,{value:o},e.children)}}}]);