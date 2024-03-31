"use strict";(self.webpackChunkpabpereza=self.webpackChunkpabpereza||[]).push([[4748],{3164:(e,a,i)=>{i.r(a),i.d(a,{assets:()=>l,contentTitle:()=>r,default:()=>u,frontMatter:()=>o,metadata:()=>t,toc:()=>c});var n=i(17624),s=i(4552);const o={date:new Date("2023-03-08T00:00:00.000Z"),title:"Aligerar im\xe1genes Docker",slug:"aligerar_imagenes_docker",tags:["docker"],authors:"pabpereza"},r=void 0,t={permalink:"/blog/aligerar_imagenes_docker",editUrl:"https://github.com/pabpereza/pabpereza/tree/main/blog/2023_03_08_aligerar_imagenes_docker/Docker images multi stage.md",source:"@site/blog/2023_03_08_aligerar_imagenes_docker/Docker images multi stage.md",title:"Aligerar im\xe1genes Docker",description:"En el mundo de la infraestructura como c\xf3digo, Docker se ha convertido en una herramienta esencial para desarrolladores y administradores de sistemas. Una de las ventajas de Docker es la capacidad de crear im\xe1genes ligeras, lo que permite un despliegue r\xe1pido y eficiente de aplicaciones.",date:"2023-03-08T00:00:00.000Z",tags:[{label:"docker",permalink:"/blog/tags/docker"}],readingTime:3.905,hasTruncateMarker:!1,authors:[{name:"Pablo P\xe9rez-Aradros",title:"CISO SecDevOps @ Santander Group",url:"https://github.com/pabpereza",email:"pabloperezaradros@gmail.com",imageURL:"https://github.com/pabpereza.png",key:"pabpereza"}],frontMatter:{date:"2023-03-08T00:00:00.000Z",title:"Aligerar im\xe1genes Docker",slug:"aligerar_imagenes_docker",tags:["docker"],authors:"pabpereza"},unlisted:!1,prevItem:{title:"Cracking de contrase\xf1as con Hashcat",permalink:"/blog/cracking_passwords_hashcat"},nextItem:{title:"PowerToys",permalink:"/blog/PowerToys"}},l={authorsImageUrls:[void 0]},c=[{value:"Paso 1: Utilizar una imagen base peque\xf1a",id:"paso-1-utilizar-una-imagen-base-peque\xf1a",level:2},{value:"Paso 2: Eliminar archivos no necesarios",id:"paso-2-eliminar-archivos-no-necesarios",level:2},{value:"Paso 3: Utilizar multi-etapas de construcci\xf3n",id:"paso-3-utilizar-multi-etapas-de-construcci\xf3n",level:2},{value:"Post-paso 1: Monitorizar el rendimiento de la imagen.",id:"post-paso-1-monitorizar-el-rendimiento-de-la-imagen",level:2},{value:"Post-paso 2: Utilizar herramientas de an\xe1lisis de im\xe1genes",id:"post-paso-2-utilizar-herramientas-de-an\xe1lisis-de-im\xe1genes",level:2},{value:"Bonus: Distroless",id:"bonus-distroless",level:2},{value:"Conclusi\xf3n",id:"conclusi\xf3n",level:2}];function d(e){const a={a:"a",code:"code",h2:"h2",li:"li",p:"p",ul:"ul",...(0,s.M)(),...e.components};return(0,n.jsxs)(n.Fragment,{children:[(0,n.jsx)(a.p,{children:"En el mundo de la infraestructura como c\xf3digo, Docker se ha convertido en una herramienta esencial para desarrolladores y administradores de sistemas. Una de las ventajas de Docker es la capacidad de crear im\xe1genes ligeras, lo que permite un despliegue r\xe1pido y eficiente de aplicaciones."}),"\n",(0,n.jsx)(a.p,{children:"Existen casos, ya sea por la complejidad de la aplicaci\xf3n, la cantidad de paquetes instalados o la cantidad de archivos, en los que las im\xe1genes Docker pueden llegar a ser muy pesadas. Esto puede afectar muy negativamente el rendimiento y la eficiencia de los automatismos de construcci\xf3n, pruebas y despliegue."}),"\n",(0,n.jsx)(a.p,{children:"En este art\xedculo, vamos a explorar c\xf3mo crear im\xe1genes de Docker ligeras para optimizar el rendimiento y la eficiencia en el despliegue de aplicaciones."}),"\n",(0,n.jsx)(a.p,{children:"Por si lo prefieres, puedes ver el v\xeddeo en YouTube:"}),"\n",(0,n.jsx)(a.p,{children:(0,n.jsx)(a.a,{href:"https://youtu.be/QVcLTxmcJ8s",children:"https://youtu.be/QVcLTxmcJ8s"})}),"\n",(0,n.jsx)(a.h2,{id:"paso-1-utilizar-una-imagen-base-peque\xf1a",children:"Paso 1: Utilizar una imagen base peque\xf1a"}),"\n",(0,n.jsx)(a.p,{children:'La primera etapa en la creaci\xf3n de una imagen de Docker ligera es elegir una imagen base peque\xf1a. Esto significa elegir una imagen que tenga el menor tama\xf1o posible y solo contenga los componentes esenciales para ejecutar la aplicaci\xf3n. Por ejemplo, dentro de las im\xe1genes de debian, podemos optar por las versiones con tag "-slim" (debian:11-slim) las cuales traen muchos menos paquetes por defecto.'}),"\n",(0,n.jsx)(a.p,{children:"Otras im\xe1genes que se han vuelto muy populares los \xfaltimos a\xf1os son las de Alpine Linux. Estas tienen un tama\xf1o min\xfasculo y tienen un sistema de paquetes muy poblado y bien mantenido."}),"\n",(0,n.jsx)(a.h2,{id:"paso-2-eliminar-archivos-no-necesarios",children:"Paso 2: Eliminar archivos no necesarios"}),"\n",(0,n.jsx)(a.p,{children:"Una vez que tenemos nuestra imagen base, es importante eliminar cualquier archivo o paquete que no sea necesario para la ejecuci\xf3n de la aplicaci\xf3n. Esto puede incluir documentaci\xf3n, archivos de configuraci\xf3n y aplicaciones adicionales."}),"\n",(0,n.jsx)(a.p,{children:"Un caso pr\xe1ctico, construyo una aplicaci\xf3n Java con Maven y luego utilizo una imagen base de OpenJDK para ejecutar la aplicaci\xf3n. En este caso, Maven no es necesario para la ejecuci\xf3n de la aplicaci\xf3n, por lo que puedo eliminarlo de la imagen. Esto ser\xeda extrapolable a npm para aplicaciones Node.js, pip para aplicaciones Python, etc."}),"\n",(0,n.jsx)(a.p,{children:"Tenemos que pensar que solo tenemos que dejar lo esencial para que la aplicaci\xf3n funcione. Esto no es solo una cuesti\xf3n de optimizaci\xf3n, sino tambi\xe9n de seguridad. Si dejamos archivos o paquetes innecesarios en la imagen, podemos estar expuestos a vulnerabilidades debido a aumentar la superficie de ataque."}),"\n",(0,n.jsx)(a.h2,{id:"paso-3-utilizar-multi-etapas-de-construcci\xf3n",children:"Paso 3: Utilizar multi-etapas de construcci\xf3n"}),"\n",(0,n.jsx)(a.p,{children:"La caracter\xedstica de multi-etapas de construcci\xf3n de Docker nos permite utilizar varias im\xe1genes en una sola definici\xf3n de construcci\xf3n. Esto significa que podemos utilizar una imagen base para compilar nuestra aplicaci\xf3n y luego utilizar otra imagen base m\xe1s peque\xf1a para desplegar la aplicaci\xf3n. Esto nos permite eliminar cualquier paquete o archivo no necesario utilizado solo en la etapa de compilaci\xf3n."}),"\n",(0,n.jsxs)(a.p,{children:["Tengo una ",(0,n.jsx)(a.a,{href:"https://youtube.com/playlist?list=PLQhxXeq1oc2mB6_KY-l_zgWJWZo_ne9MZ",children:"lista de v\xeddeos en youtube hablando del tema"})," y tambi\xe9n ",(0,n.jsx)(a.a,{href:"https://github.com/pabpereza/multi-stage-containers-examples",children:"un repositorio con varios ejemplos"}),"."]}),"\n",(0,n.jsx)(a.h2,{id:"post-paso-1-monitorizar-el-rendimiento-de-la-imagen",children:"Post-paso 1: Monitorizar el rendimiento de la imagen."}),"\n",(0,n.jsx)(a.p,{children:"Algunos errores de optimizaci\xf3n no ser\xe1n visibles hasta que la imagen se ejecute en un entorno de producci\xf3n. Por lo tanto, es importante monitorizar el rendimiento de la imagen una vez que se haya desplegado en producci\xf3n. Esto nos permitir\xe1 identificar cualquier problema de rendimiento y optimizar la imagen de forma proactiva."}),"\n",(0,n.jsx)(a.p,{children:"Aqu\xed podr\xedamos vigilar que no se escriban demasiados archivos en el disco, que no se consuma demasiada memoria, que no se consuma demasiado ancho de banda, etc."}),"\n",(0,n.jsxs)(a.p,{children:["El comando ",(0,n.jsx)(a.code,{children:"docker stats"})," nos permite realizar esta tarea. Aunque tendremos que ejecutarlo manualmente, tambi\xe9n podr\xedamos automatizarlo o utilizar herramientas como ",(0,n.jsx)(a.a,{href:"https://prometheus.io/",children:"Prometheus"})," para monitorizar el rendimiento de la imagen y guardar los datos en un servidor de m\xe9tricas."]}),"\n",(0,n.jsx)(a.h2,{id:"post-paso-2-utilizar-herramientas-de-an\xe1lisis-de-im\xe1genes",children:"Post-paso 2: Utilizar herramientas de an\xe1lisis de im\xe1genes"}),"\n",(0,n.jsx)(a.p,{children:"Algunas herramientas de an\xe1lisis de im\xe1genes nos permiten analizar las im\xe1genes Docker y obtener informaci\xf3n sobre el tama\xf1o de la imagen, los archivos y los paquetes que contiene."}),"\n",(0,n.jsxs)(a.p,{children:["Por ejemplo, la herramienta ",(0,n.jsx)(a.a,{href:"https://github.com/wagoodman/dive",children:"Dive"}),", la cual, dispone recientemente de extensi\xf3n de docker."]}),"\n",(0,n.jsx)(a.p,{children:"Esta extensi\xf3n nos permite visualizar el tama\xf1o de cada capa de la imagen, as\xed como los archivos y los paquetes que contiene. Esto nos permite identificar archivos y paquetes innecesarios que podemos eliminar de la imagen."}),"\n",(0,n.jsx)(a.h2,{id:"bonus-distroless",children:"Bonus: Distroless"}),"\n",(0,n.jsxs)(a.p,{children:["Esto me lo guardo para un art\xedculo/v\xeddeo aparte, pero os dejo un enlace a enlace a la documentaci\xf3n de google por si no pod\xe9is esperar. ",(0,n.jsx)(a.a,{href:"https://github.com/GoogleContainerTools/distroless",children:"Distroless"})]}),"\n",(0,n.jsx)(a.p,{children:"Dejar\xe9 un enlace aqu\xed cuando lo publique."}),"\n",(0,n.jsx)(a.h2,{id:"conclusi\xf3n",children:"Conclusi\xf3n"}),"\n",(0,n.jsx)(a.p,{children:"Para generar im\xe1genes Docker ligeras, debemos seguir los siguientes pasos:"}),"\n",(0,n.jsxs)(a.ul,{children:["\n",(0,n.jsx)(a.li,{children:"Utilizar una imagen base peque\xf1a, como las versiones slim de debian, las UBI de Red Hat o las im\xe1genes de Alpine."}),"\n",(0,n.jsx)(a.li,{children:"Eliminar archivos no necesarios, como componentes de desarrollo, compiladores, documentaci\xf3n.. etc. Para esto, podemos utilizar herramientas como Dive, tanto desde la l\xednea de comandos como desde docker desktop."}),"\n",(0,n.jsx)(a.li,{children:"Construir una imagen con multi-etapas de construcci\xf3n."}),"\n"]})]})}function u(e={}){const{wrapper:a}={...(0,s.M)(),...e.components};return a?(0,n.jsx)(a,{...e,children:(0,n.jsx)(d,{...e})}):d(e)}},4552:(e,a,i)=>{i.d(a,{I:()=>t,M:()=>r});var n=i(11504);const s={},o=n.createContext(s);function r(e){const a=n.useContext(o);return n.useMemo((function(){return"function"==typeof e?e(a):{...a,...e}}),[a,e])}function t(e){let a;return a=e.disableParentContext?"function"==typeof e.components?e.components(s):e.components||s:r(e.components),n.createElement(o.Provider,{value:a},e.children)}}}]);