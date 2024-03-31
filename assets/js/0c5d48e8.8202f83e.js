"use strict";(self.webpackChunkpabpereza=self.webpackChunkpabpereza||[]).push([[2548],{8668:(e,a,r)=>{r.r(a),r.d(a,{assets:()=>l,contentTitle:()=>o,default:()=>u,frontMatter:()=>s,metadata:()=>d,toc:()=>c});var n=r(17624),i=r(4552);const s={},o=void 0,d={id:"notas/trivy",title:"trivy",description:"Trivy es una herramienta de an\xe1lisis de vulnerabilidades para contenedores y ficheros de imagen. Es una herramienta de c\xf3digo abierto desarrollada por Aqua Security.",source:"@site/docs/notas/trivy.md",sourceDirName:"notas",slug:"/notas/trivy",permalink:"/docs/notas/trivy",draft:!1,unlisted:!1,editUrl:"https://github.com/pabpereza/pabpereza/tree/main/docs/notas/trivy.md",tags:[],version:"current",frontMatter:{},sidebar:"notas",previous:{title:"tmux",permalink:"/docs/notas/tmux"},next:{title:"x-frame-options",permalink:"/docs/notas/x-frame-options"}},l={},c=[{value:"Uso simple",id:"uso-simple",level:2},{value:"Analizar una imagen comprimida",id:"analizar-una-imagen-comprimida",level:3},{value:"Analizar un sistema de ficheros",id:"analizar-un-sistema-de-ficheros",level:3},{value:"Analizar un contenedor en ejecuci\xf3n",id:"analizar-un-contenedor-en-ejecuci\xf3n",level:3},{value:"Analizar un repositorio",id:"analizar-un-repositorio",level:3},{value:"Usos concretos",id:"usos-concretos",level:2},{value:"Entornos de CI/CD",id:"entornos-de-cicd",level:3},{value:"Ignorar vulnerabilidades sin parchear",id:"ignorar-vulnerabilidades-sin-parchear",level:3},{value:"Tipos de escaneos en im\xe1genes",id:"tipos-de-escaneos-en-im\xe1genes",level:3},{value:"Saltar escaneo de secretos",id:"saltar-escaneo-de-secretos",level:3}];function t(e){const a={a:"a",code:"code",h2:"h2",h3:"h3",li:"li",p:"p",pre:"pre",ul:"ul",...(0,i.M)(),...e.components};return(0,n.jsxs)(n.Fragment,{children:[(0,n.jsx)(a.p,{children:"Trivy es una herramienta de an\xe1lisis de vulnerabilidades para contenedores y ficheros de imagen. Es una herramienta de c\xf3digo abierto desarrollada por Aqua Security."}),"\n",(0,n.jsx)(a.p,{children:(0,n.jsx)(a.a,{href:"https://github.com/aquasecurity/trivy",children:"Repositorio oficial"})}),"\n",(0,n.jsx)(a.h2,{id:"uso-simple",children:"Uso simple"}),"\n",(0,n.jsx)(a.p,{children:"El uso simple de trivy nos permite analizar una imagen de docker y obtener un informe con las vulnerabilidades encontradas."}),"\n",(0,n.jsx)(a.pre,{children:(0,n.jsx)(a.code,{className:"language-bash",children:"trivy image <nombre_imagen>\n\ntrivy i <nombre_imagen> # Versi\xf3n corta\n"})}),"\n",(0,n.jsx)(a.p,{children:"Par\xe1metros:"}),"\n",(0,n.jsxs)(a.ul,{children:["\n",(0,n.jsxs)(a.li,{children:[(0,n.jsx)(a.code,{children:"--exit-code"}),": Devuelve un c\xf3digo de salida 1 si se encuentra alguna vulnerabilidad."]}),"\n",(0,n.jsxs)(a.li,{children:[(0,n.jsx)(a.code,{children:"--severity"}),": Filtro de severidad. Valores: ",(0,n.jsx)(a.code,{children:"UNKNOWN"}),", ",(0,n.jsx)(a.code,{children:"LOW"}),", ",(0,n.jsx)(a.code,{children:"MEDIUM"}),", ",(0,n.jsx)(a.code,{children:"HIGH"}),", ",(0,n.jsx)(a.code,{children:"CRITICAL"}),"."]}),"\n",(0,n.jsxs)(a.li,{children:[(0,n.jsx)(a.code,{children:"--ignore-unfixed"}),": Ignora las vulnerabilidades no arregladas."]}),"\n",(0,n.jsxs)(a.li,{children:[(0,n.jsx)(a.code,{children:"--no-progress"}),": Desactiva la barra de progreso."]}),"\n",(0,n.jsxs)(a.li,{children:[(0,n.jsx)(a.code,{children:"-o <formato>"}),": Formato de salida. Valores: ",(0,n.jsx)(a.code,{children:"table"}),", ",(0,n.jsx)(a.code,{children:"json"}),", ",(0,n.jsx)(a.code,{children:"template"}),", ",(0,n.jsx)(a.code,{children:"template-file"}),"."]}),"\n"]}),"\n",(0,n.jsx)(a.h3,{id:"analizar-una-imagen-comprimida",children:"Analizar una imagen comprimida"}),"\n",(0,n.jsxs)(a.p,{children:["Trivy tambi\xe9n puede analizar  un comprimido con la imagen. Para ello, se debe utilizar el par\xe1metro ",(0,n.jsx)(a.code,{children:"--input"})," y especificar el directorio."]}),"\n",(0,n.jsx)(a.pre,{children:(0,n.jsx)(a.code,{className:"language-bash",children:"trivy image --input <directorio>\n"})}),"\n",(0,n.jsx)(a.h3,{id:"analizar-un-sistema-de-ficheros",children:"Analizar un sistema de ficheros"}),"\n",(0,n.jsxs)(a.p,{children:["Se puede analizar un sistema de ficheros, aunque trivy se limitar\xe1 a buscar libre\xedas de terceros (declaradas en ficheros ",(0,n.jsx)(a.code,{children:"package.json"}),", ",(0,n.jsx)(a.code,{children:"requirements.txt"}),", etc`):"]}),"\n",(0,n.jsx)(a.pre,{children:(0,n.jsx)(a.code,{className:"language-bash",children:"trivy filesystem  <directorio>\n`` \n"})}),"\n",(0,n.jsx)(a.h3,{id:"analizar-un-contenedor-en-ejecuci\xf3n",children:"Analizar un contenedor en ejecuci\xf3n"}),"\n",(0,n.jsxs)(a.p,{children:["Trivy tambi\xe9n puede analizar un contenedor en ejecuci\xf3n. Para ello, se debe utilizar el par\xe1metro ",(0,n.jsx)(a.code,{children:"--input"})," y especificar el contenedor."]}),"\n",(0,n.jsx)(a.pre,{children:(0,n.jsx)(a.code,{className:"language-bash",children:"trivy image --input <nombre_contenedor>\n"})}),"\n",(0,n.jsx)(a.h3,{id:"analizar-un-repositorio",children:"Analizar un repositorio"}),"\n",(0,n.jsx)(a.p,{children:"Este comando permite un repositorio de git y analizar ficheros de IaC y de librer\xedas de terceros."}),"\n",(0,n.jsx)(a.pre,{children:(0,n.jsx)(a.code,{className:"language-bash",children:"trivy repo <url_repositorio>\n"})}),"\n",(0,n.jsx)(a.h2,{id:"usos-concretos",children:"Usos concretos"}),"\n",(0,n.jsx)(a.h3,{id:"entornos-de-cicd",children:"Entornos de CI/CD"}),"\n",(0,n.jsxs)(a.p,{children:["Trivy puede ser utilizado en entornos de CI/CD para comprobar la seguridad de las im\xe1genes que se van a desplegar. Para ello, se puede utilizar el par\xe1metro ",(0,n.jsx)(a.code,{children:"--exit-code"})," para que devuelva un c\xf3digo de salida 1 si se encuentra alguna vulnerabilidad."]}),"\n",(0,n.jsxs)(a.p,{children:["Tambi\xe9n podr\xedamos utilizar el par\xe1metro ",(0,n.jsx)(a.code,{children:"--severity"})," para filtrar las vulnerabilidades por severidad. Por ejemplo, si queremos que devuelva un c\xf3digo de salida 1 si se encuentra alguna vulnerabilidad de severidad alta o cr\xedtica, podr\xedamos utilizar el siguiente comando:"]}),"\n",(0,n.jsx)(a.pre,{children:(0,n.jsx)(a.code,{className:"language-bash",children:"trivy image <nombre_imagen> --exit-code 1 --severity HIGH,CRITICAL\n"})}),"\n",(0,n.jsx)(a.h3,{id:"ignorar-vulnerabilidades-sin-parchear",children:"Ignorar vulnerabilidades sin parchear"}),"\n",(0,n.jsxs)(a.p,{children:["Puede dar el caso de que una vulnerabilidad no tenga parche disponible. En este caso, trivy nos mostrar\xe1 la vulnerabilidad como si estuviera sin parchear. Para ignorar estas vulnerabilidades, se puede utilizar el par\xe1metro ",(0,n.jsx)(a.code,{children:"--ignore-unfixed"}),"."]}),"\n",(0,n.jsx)(a.pre,{children:(0,n.jsx)(a.code,{className:"language-bash",children:"trivy image <nombre_imagen> --ignore-unfixed\n"})}),"\n",(0,n.jsx)(a.h3,{id:"tipos-de-escaneos-en-im\xe1genes",children:"Tipos de escaneos en im\xe1genes"}),"\n",(0,n.jsxs)(a.p,{children:["Por defecto, trivy analiza las im\xe1genes de docker y busca vulnerabilidades en las librer\xedas de terceros. Sin embargo, tambi\xe9n es posible analizar las im\xe1genes de docker para buscar vulnerabilidades en los ficheros de IaC (Infrastructure as Code) y en los ficheros de configuraci\xf3n de la imagen. Para ello, se debe utilizar el par\xe1metro ",(0,n.jsx)(a.code,{children:"--scan-type"})," y especificar el tipo de escaneo que queremos realizar. Los valores posibles son: ",(0,n.jsx)(a.code,{children:"os"}),", ",(0,n.jsx)(a.code,{children:"library"}),", ",(0,n.jsx)(a.code,{children:"package"}),", ",(0,n.jsx)(a.code,{children:"all"}),"."]}),"\n",(0,n.jsx)(a.p,{children:"Ejemplos:"}),"\n",(0,n.jsx)(a.pre,{children:(0,n.jsx)(a.code,{className:"language-bash",children:"trivy image <nombre_imagen> --scan-type os # Solo packages de sistema operativo ignorando librer\xedas de terceros\n\ntrivy image <nombre_imagen> --scan-type library # Solo librer\xedas de terceros ignorando packages de sistema operativo\n\ntrivy image <nombre_imagen> --scan-type package # Solo packages de sistema operativo y librer\xedas de terceros\n\ntrivy image <nombre_imagen> --scan-type all # Todos los tipos de escaneo\n"})}),"\n",(0,n.jsx)(a.h3,{id:"saltar-escaneo-de-secretos",children:"Saltar escaneo de secretos"}),"\n",(0,n.jsx)(a.p,{children:"Por defecto, trivy tambi\xe9n busca secretos en la imagen. Esta labor puede sumar mucho tiempo a nuestros procesos de CI y puede ser que en algunas ramas o situaciones queramos desactivarlo. Esto se podr\xeda hacer as\xed:"}),"\n",(0,n.jsx)(a.pre,{children:(0,n.jsx)(a.code,{className:"language-bash",children:"trivy image --scanners vuln <nombre_imagen>\n"})})]})}function u(e={}){const{wrapper:a}={...(0,i.M)(),...e.components};return a?(0,n.jsx)(a,{...e,children:(0,n.jsx)(t,{...e})}):t(e)}},4552:(e,a,r)=>{r.d(a,{I:()=>d,M:()=>o});var n=r(11504);const i={},s=n.createContext(i);function o(e){const a=n.useContext(s);return n.useMemo((function(){return"function"==typeof e?e(a):{...a,...e}}),[a,e])}function d(e){let a;return a=e.disableParentContext?"function"==typeof e.components?e.components(i):e.components||i:o(e.components),n.createElement(s.Provider,{value:a},e.children)}}}]);