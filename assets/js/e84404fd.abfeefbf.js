"use strict";(self.webpackChunkpabpereza=self.webpackChunkpabpereza||[]).push([[7492],{9008:(e,o,s)=>{s.r(o),s.d(o,{assets:()=>i,contentTitle:()=>t,default:()=>p,frontMatter:()=>r,metadata:()=>c,toc:()=>d});var a=s(17624),n=s(4552);const r={date:new Date("2022-12-01T00:00:00.000Z"),title:"Crea y comparte backups en docker",slug:"Crea y comparte backups en docker",tags:["docker","noticia"],authors:"pabpereza"},t=void 0,c={permalink:"/blog/Crea y comparte backups en docker",editUrl:"https://github.com/pabpereza/pabpereza/tree/main/blog/2022_12_01_docker_backups/index.md",source:"@site/blog/2022_12_01_docker_backups/index.md",title:"Crea y comparte backups en docker",description:"En docker, podemos utilizar vol\xfamenes para persistir datos incluso cuando los contenedores se destruyen. Estos vol\xfamenes eran complejos de administrar en muchas circunstancias, por lo que docker ha creado una nueva funcionalidad para docker desktop, que nos permite crear backups de los vol\xfamenes y compartirlos con otros usuarios de una forma sencilla.",date:"2022-12-01T00:00:00.000Z",tags:[{label:"docker",permalink:"/blog/tags/docker"},{label:"noticia",permalink:"/blog/tags/noticia"}],readingTime:.87,hasTruncateMarker:!1,authors:[{name:"Pablo P\xe9rez-Aradros",title:"CISO SecDevOps @ Santander Group",url:"https://github.com/pabpereza",email:"pabloperezaradros@gmail.com",imageURL:"https://github.com/pabpereza.png",key:"pabpereza"}],frontMatter:{date:"2022-12-01T00:00:00.000Z",title:"Crea y comparte backups en docker",slug:"Crea y comparte backups en docker",tags:["docker","noticia"],authors:"pabpereza"},unlisted:!1,prevItem:{title:"CKA: Mi experiencia",permalink:"/blog/CKA: Mi experiencia"},nextItem:{title:"Pentesting desde un contenedor",permalink:"/blog/pentesting_desde_un_contenedor"}},i={authorsImageUrls:[void 0]},d=[{value:"\xbfC\xf3mo funciona?",id:"c\xf3mo-funciona",level:2},{value:"Comandos utilizados",id:"comandos-utilizados",level:2}];function l(e){const o={a:"a",code:"code",h2:"h2",img:"img",p:"p",pre:"pre",strong:"strong",...(0,n.M)(),...e.components};return(0,a.jsxs)(a.Fragment,{children:[(0,a.jsx)(o.p,{children:"En docker, podemos utilizar vol\xfamenes para persistir datos incluso cuando los contenedores se destruyen. Estos vol\xfamenes eran complejos de administrar en muchas circunstancias, por lo que docker ha creado una nueva funcionalidad para docker desktop, que nos permite crear backups de los vol\xfamenes y compartirlos con otros usuarios de una forma sencilla."}),"\n",(0,a.jsx)(o.p,{children:(0,a.jsx)(o.img,{src:"https://www.docker.com/wp-content/uploads/2022/09/share-volume-docker.png.webp",alt:"Docker backups"})}),"\n",(0,a.jsx)(o.h2,{id:"c\xf3mo-funciona",children:"\xbfC\xf3mo funciona?"}),"\n",(0,a.jsx)(o.p,{children:"Docker desktop empez\xf3 a ofrecer extensiones hace unos meses. Estas extensiones nos permiten a\xf1adir funcionalidades a docker desktop, como por ejemplo, gesti\xf3n visual de logs, uso de disco, herramientas de desarrollo, seguridad, etc."}),"\n",(0,a.jsxs)(o.p,{children:[(0,a.jsx)(o.a,{href:"https://www.youtube.com/watch?v=6je3tV-_7I0",children:"Tengo un v\xeddeo en youtube hablando de las extensiones de docker desktop"}),", si quieres saber m\xe1s sobre ellas."]}),"\n",(0,a.jsxs)(o.p,{children:["En este caso, la extensi\xf3n que nos interesa es la de ",(0,a.jsx)(o.strong,{children:"Docker Backup"}),". Esta extensi\xf3n nos permite crear backups de los vol\xfamenes de docker y compartirlos con otros usuarios de diferentes formas. Dentro v\xeddeo:"]}),"\n",(0,a.jsx)(o.p,{children:(0,a.jsx)(o.a,{href:"https://youtu.be/thqgLGMfsGw",children:"https://youtu.be/thqgLGMfsGw"})}),"\n",(0,a.jsx)(o.h2,{id:"comandos-utilizados",children:"Comandos utilizados"}),"\n",(0,a.jsx)(o.p,{children:"Crear el contenedor de postgresql para las pruebas:"}),"\n",(0,a.jsx)(o.pre,{children:(0,a.jsx)(o.code,{className:"language-bash",children:"docker run --hostname=cb8f628fbe6d --mac-address=02:42:ac:11:00:02 --env=POSTGRES_PASSWORD=postgrespw --env=PATH=/usr/local/sbin:/usr/local/bin:/usr/sbin:/usr/bin:/sbin:/bin:/usr/lib/postgresql/15/bin --env=GOSU_VERSION=1.14 --env=LANG=en_US.utf8 --env=PG_MAJOR=15 --env=PG_VERSION=15.1-1.pgdg110+1 --env=PGDATA=/var/lib/postgresql/data --volume=/var/lib/postgresql/data -p 5432 --label='com.docker/featured-image=postgres:latest' --runtime=runc -d postgres:latest\n"})})]})}function p(e={}){const{wrapper:o}={...(0,n.M)(),...e.components};return o?(0,a.jsx)(o,{...e,children:(0,a.jsx)(l,{...e})}):l(e)}},4552:(e,o,s)=>{s.d(o,{I:()=>c,M:()=>t});var a=s(11504);const n={},r=a.createContext(n);function t(e){const o=a.useContext(r);return a.useMemo((function(){return"function"==typeof e?e(o):{...o,...e}}),[o,e])}function c(e){let o;return o=e.disableParentContext?"function"==typeof e.components?e.components(n):e.components||n:t(e.components),a.createElement(r.Provider,{value:o},e.children)}}}]);