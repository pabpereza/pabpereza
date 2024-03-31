"use strict";(self.webpackChunkpabpereza=self.webpackChunkpabpereza||[]).push([[4880],{29928:(e,n,a)=>{a.r(n),a.d(n,{assets:()=>d,contentTitle:()=>t,default:()=>p,frontMatter:()=>s,metadata:()=>i,toc:()=>c});var o=a(17624),r=a(4552);const s={date:new Date("2022-08-29T00:00:00.000Z"),title:"Pentesting desde un contenedor",slug:"pentesting_desde_un_contenedor",tags:["docker","pentesting","seguridad"],authors:"pabpereza"},t=void 0,i={permalink:"/blog/pentesting_desde_un_contenedor",editUrl:"https://github.com/pabpereza/pabpereza/tree/main/blog/2022_08_29_pentesting_desde_contenedor/index.md",source:"@site/blog/2022_08_29_pentesting_desde_contenedor/index.md",title:"Pentesting desde un contenedor",description:"He hablado mucho de como hacer diversas acciones en docker y contenedores. Tampoco quiero que mi contenido sea monotem\xe1tico pero",date:"2022-08-29T00:00:00.000Z",tags:[{label:"docker",permalink:"/blog/tags/docker"},{label:"pentesting",permalink:"/blog/tags/pentesting"},{label:"seguridad",permalink:"/blog/tags/seguridad"}],readingTime:2.845,hasTruncateMarker:!1,authors:[{name:"Pablo P\xe9rez-Aradros",title:"CISO SecDevOps @ Santander Group",url:"https://github.com/pabpereza",email:"pabloperezaradros@gmail.com",imageURL:"https://github.com/pabpereza.png",key:"pabpereza"}],frontMatter:{date:"2022-08-29T00:00:00.000Z",title:"Pentesting desde un contenedor",slug:"pentesting_desde_un_contenedor",tags:["docker","pentesting","seguridad"],authors:"pabpereza"},unlisted:!1,prevItem:{title:"Crea y comparte backups en docker",permalink:"/blog/Crea y comparte backups en docker"},nextItem:{title:"Potencia powershell",permalink:"/blog/Potencia powershell"}},d={authorsImageUrls:[void 0]},c=[{value:"\xbfPor qu\xe9?",id:"por-qu\xe9",level:2},{value:"Retos",id:"retos",level:2},{value:"Contenedor para pentesting de un sitio web p\xfablico",id:"contenedor-para-pentesting-de-un-sitio-web-p\xfablico",level:3},{value:"Contenedor para pentesting en un laboratorio privado",id:"contenedor-para-pentesting-en-un-laboratorio-privado",level:3},{value:"Limitaciones",id:"limitaciones",level:4},{value:"V\xeddeo",id:"v\xeddeo",level:2}];function l(e){const n={a:"a",code:"code",h2:"h2",h3:"h3",h4:"h4",img:"img",p:"p",pre:"pre",...(0,r.M)(),...e.components};return(0,o.jsxs)(o.Fragment,{children:[(0,o.jsx)(n.p,{children:"He hablado mucho de como hacer diversas acciones en docker y contenedores. Tampoco quiero que mi contenido sea monotem\xe1tico pero\nme han lanzando una sugerencia de v\xeddeo y no me puedo resistir a abordar el tema."}),"\n",(0,o.jsxs)(n.p,{children:["Concretamente, el usuario pwnhun73r me sugiri\xf3 utilizar contenedores para pentesting en laboratorios como HackTheBox o TryHackMe. Gracias por el apoyo y la sugerencia. Tu tambi\xe9n puedes sugerir nuevo contenido desde ",(0,o.jsx)(n.a,{href:"https://github.com/pabpereza/pabpereza/issues",children:"la secci\xf3n de issues de esta p\xe1gina en GitHub"}),"."]}),"\n",(0,o.jsx)(n.p,{children:"Hace tiempo que no me dedico al pentesting profesionalmente pero tampoco me gusta que se me oxide el tema. Youtube es muy restrictivo con el contenido del hacking por lo que, para este v\xeddeo, me limitar\xe9 a plantear el entorno sin entrar en la explotaci\xf3n."}),"\n",(0,o.jsx)(n.h2,{id:"por-qu\xe9",children:"\xbfPor qu\xe9?"}),"\n",(0,o.jsx)(n.p,{children:"Esta es la pregunta del mill\xf3n... \xbfPor qu\xe9?\xbfCu\xe1l es la necesidad?. Realmente las m\xe1quinas virtuales para esta labor igual son m\xe1s pr\xe1cticas que un contenedor, tienes tus copias de seguridad, tu interfaz, puedes conectarles hardware c\xf3modamente (antenas, cables, etc) y puedes configurar los servicios que necesites."}),"\n",(0,o.jsx)(n.p,{children:"Para los fan\xe1ticos de los contenedores como yo, es por amor de llevar la tecnolog\xeda al l\xedmite. Hay que reconocer que los contenedores tienen sus ventajas. F\xe1ciles de ejecutar, versionar y almacenar. Suficiente para justificar este v\xeddeo."}),"\n",(0,o.jsx)(n.h2,{id:"retos",children:"Retos"}),"\n",(0,o.jsx)(n.p,{children:"Tenemos dos retos a tener en cuenta basados en dos escenarios:"}),"\n",(0,o.jsx)(n.h3,{id:"contenedor-para-pentesting-de-un-sitio-web-p\xfablico",children:"Contenedor para pentesting de un sitio web p\xfablico"}),"\n",(0,o.jsx)(n.p,{children:"Antes de nada recordad que el sitio deber\xe1 ser de vuestra propiedad o deber\xe9is tener permiso para auditarlo."}),"\n",(0,o.jsx)(n.p,{children:"En este supuesto, accedemos a alg\xfan sitio p\xfablico y queremos hacer pentesting. Para la parte de la enumeraci\xf3n no tendremos limitaci\xf3n alguna. El problema surge cuando queremos explotar un sitio. La mayor\xeda de conexiones que intentaremos generar ser\xe1n inversas y, por tanto, necesitaremos abrir puertos en el router."}),"\n",(0,o.jsx)(n.p,{children:(0,o.jsx)(n.img,{src:a(54407).c+"",width:"331",height:"461"})}),"\n",(0,o.jsx)(n.p,{children:"Supongamos que hacemos las pruebas desde un servidor p\xfablico tambi\xe9n, como un VPS. En este caso, no tendremos problema para abrir puertos. Aunque no todo queda ah\xed, tendremos que natear al contenedor un rango de puertos para que el servidor pueda acceder a los servicios que estemos ejecutando en el contenedor."}),"\n",(0,o.jsx)(n.p,{children:"Imaginaros que estamos escuchando una conexi\xf3n con netcat en el puerto 4444. Deber\xedamos ejecutar el contenedor con ese puerto mapeado del host para que podamos capturar las conexiones desde del contenedor."}),"\n",(0,o.jsx)(n.p,{children:"Esto podemos hacerlo as\xed:"}),"\n",(0,o.jsx)(n.pre,{children:(0,o.jsx)(n.code,{className:"language-bash",children:"docker run -it -p 4444:4444 kalilinux/kali-rolling /bin/bash\n"})}),"\n",(0,o.jsx)(n.h3,{id:"contenedor-para-pentesting-en-un-laboratorio-privado",children:"Contenedor para pentesting en un laboratorio privado"}),"\n",(0,o.jsx)(n.p,{children:"En este caso, la parte de acceso y enrutamiento es m\xe1s sencillo dado que normalmente a los laboratorios de pentesting nos conectamos a trav\xe9s de una VPN, la cu\xe1l, nos crea un tunel directamente desde el contenedor al laboratorio."}),"\n",(0,o.jsx)(n.p,{children:(0,o.jsx)(n.img,{src:a(16372).c+"",width:"337",height:"545"})}),"\n",(0,o.jsx)(n.p,{children:"La problem\xe1tica viene por la parte del cliente VPN en los contenedores."}),"\n",(0,o.jsx)(n.h4,{id:"limitaciones",children:"Limitaciones"}),"\n",(0,o.jsx)(n.p,{children:"La principal limitaci\xf3n es la acceso a las interfaces de red. En una m\xe1quina virtual virtualizas tanto software como hardware. En el caso de los contenedores, al ser procesos aislados, tenemos que lidiar con la problem\xe1tica de crear interfaces de red para las VPN de algunos laboratorio."}),"\n",(0,o.jsxs)(n.p,{children:["Podemos levantar un contenedor con Kali Linux solventando estas limitaciones, usando el par\xe1metro ",(0,o.jsx)(n.code,{children:"--privileged"})," para que el contenedor tenga acceso a las interfaces de red del host y ",(0,o.jsx)(n.code,{children:"--sysctl net.ipv6.conf.all.disable_ipv6=0"})," para que el contenedor tenga acceso a la red IPv6."]}),"\n",(0,o.jsx)(n.p,{children:"El comando completo ser\xeda:"}),"\n",(0,o.jsx)(n.pre,{children:(0,o.jsx)(n.code,{className:"language-bash",children:"docker run -it --privileged --sysctl net.ipv6.conf.all.disable_ipv6=0 kalilinux/kali-rolling /bin/bash\n"})}),"\n",(0,o.jsx)(n.p,{children:"As\xed ya podr\xedamos conectarnos a HackTheBox, por ejemplo."}),"\n",(0,o.jsx)(n.h2,{id:"v\xeddeo",children:"V\xeddeo"}),"\n",(0,o.jsxs)(n.p,{children:["Sin m\xe1s pre\xe1mbulos, dentro v\xeddeo:\n",(0,o.jsx)(n.a,{href:"https://youtu.be/0GsiBPVRMyI",children:"https://youtu.be/0GsiBPVRMyI"})]})]})}function p(e={}){const{wrapper:n}={...(0,r.M)(),...e.components};return n?(0,o.jsx)(n,{...e,children:(0,o.jsx)(l,{...e})}):l(e)}},16372:(e,n,a)=>{a.d(n,{c:()=>o});const o=a.p+"assets/images/lab_container.drawio-a4162f70dbd2bab1f2eb134638aaede0.png"},54407:(e,n,a)=>{a.d(n,{c:()=>o});const o=a.p+"assets/images/web_container.drawio-b767414a90567864b66d89884997ba48.png"},4552:(e,n,a)=>{a.d(n,{I:()=>i,M:()=>t});var o=a(11504);const r={},s=o.createContext(r);function t(e){const n=o.useContext(s);return o.useMemo((function(){return"function"==typeof e?e(n):{...n,...e}}),[n,e])}function i(e){let n;return n=e.disableParentContext?"function"==typeof e.components?e.components(r):e.components||r:t(e.components),o.createElement(s.Provider,{value:n},e.children)}}}]);