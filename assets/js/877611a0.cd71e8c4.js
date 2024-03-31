"use strict";(self.webpackChunkpabpereza=self.webpackChunkpabpereza||[]).push([[6340],{22212:(e,a,s)=>{s.r(a),s.d(a,{assets:()=>i,contentTitle:()=>o,default:()=>u,frontMatter:()=>c,metadata:()=>d,toc:()=>l});var n=s(17624),r=s(4552);const c={},o=void 0,d={id:"notas/herramientas_busqueda",title:"herramientas_busqueda",description:"Bash nos ofrece una serie de utilidades para buscar informaci\xf3n en ficheros de texto. En este apartado vamos a ver algunas de ellas.",source:"@site/docs/notas/herramientas_busqueda.md",sourceDirName:"notas",slug:"/notas/herramientas_busqueda",permalink:"/docs/notas/herramientas_busqueda",draft:!1,unlisted:!1,editUrl:"https://github.com/pabpereza/pabpereza/tree/main/docs/notas/herramientas_busqueda.md",tags:[],version:"current",frontMatter:{},sidebar:"notas",previous:{title:"grub",permalink:"/docs/notas/grub"},next:{title:"index_lock",permalink:"/docs/notas/index_lock"}},i={},l=[{value:"Find",id:"find",level:2},{value:"Locate",id:"locate",level:2},{value:"Which",id:"which",level:2},{value:"Grep",id:"grep",level:2}];function t(e){const a={code:"code",h2:"h2",p:"p",pre:"pre",...(0,r.M)(),...e.components};return(0,n.jsxs)(n.Fragment,{children:[(0,n.jsx)(a.p,{children:"Bash nos ofrece una serie de utilidades para buscar informaci\xf3n en ficheros de texto. En este apartado vamos a ver algunas de ellas."}),"\n",(0,n.jsx)(a.h2,{id:"find",children:"Find"}),"\n",(0,n.jsxs)(a.p,{children:["El comando ",(0,n.jsx)(a.code,{children:"find"})," nos permite buscar ficheros en un directorio y sus subdirectorios. Para realizar una b\xfasqueda simple, podemos hacerlo de la siguiente forma:"]}),"\n",(0,n.jsx)(a.pre,{children:(0,n.jsx)(a.code,{className:"language-bash",children:"find / -name fichero\n"})}),"\n",(0,n.jsxs)(a.p,{children:["En este caso, la b\xfasqueda se realiza en el directorio ra\xedz del sistema. El par\xe1metro ",(0,n.jsx)(a.code,{children:"-name"})," indica el nombre del fichero que queremos buscar. Si queremos buscar un fichero que contenga una cadena de caracteres, podemos usar el par\xe1metro ",(0,n.jsx)(a.code,{children:"-iname"}),":"]}),"\n",(0,n.jsx)(a.pre,{children:(0,n.jsx)(a.code,{className:"language-bash",children:"find / -iname fichero\n"})}),"\n",(0,n.jsxs)(a.p,{children:["Para buscar directorios, podemos usar el par\xe1metro ",(0,n.jsx)(a.code,{children:"-type d"}),":"]}),"\n",(0,n.jsx)(a.pre,{children:(0,n.jsx)(a.code,{className:"language-bash",children:"find / -type d -iname directorio\n"})}),"\n",(0,n.jsxs)(a.p,{children:["Si queremos buscar ficheros que contengan una cadena de caracteres, podemos usar el par\xe1metro ",(0,n.jsx)(a.code,{children:"-exec grep"}),":"]}),"\n",(0,n.jsx)(a.pre,{children:(0,n.jsx)(a.code,{className:"language-bash",children:'find / -type f -iname fichero -exec grep "cadena" {} \\;\n'})}),"\n",(0,n.jsx)(a.h2,{id:"locate",children:"Locate"}),"\n",(0,n.jsxs)(a.p,{children:["La utilidad ",(0,n.jsx)(a.code,{children:"locate"})," nos permite buscar ficheros en el sistema. Para ello, utiliza una base de datos que se actualiza peri\xf3dicamente. Para buscar un fichero, podemos hacerlo de la siguiente forma:"]}),"\n",(0,n.jsx)(a.pre,{children:(0,n.jsx)(a.code,{className:"language-bash",children:"locate fichero\n"})}),"\n",(0,n.jsxs)(a.p,{children:["Para que la base de datos se actualice, podemos usar el comando ",(0,n.jsx)(a.code,{children:"updatedb"}),":"]}),"\n",(0,n.jsx)(a.pre,{children:(0,n.jsx)(a.code,{className:"language-bash",children:"updatedb\n"})}),"\n",(0,n.jsxs)(a.p,{children:["Esta utilidad es m\xe1s r\xe1pida que ",(0,n.jsx)(a.code,{children:"find"}),", pero no siempre encuentra los ficheros que buscamos ya que se basa en una base de datos que no siempre est\xe1 actualizada."]}),"\n",(0,n.jsx)(a.h2,{id:"which",children:"Which"}),"\n",(0,n.jsxs)(a.p,{children:["La utilidad ",(0,n.jsx)(a.code,{children:"which"})," nos permite buscar la localizaci\xf3n de un comando en el sistema. Para buscar un comando, podemos hacerlo de la siguiente forma:"]}),"\n",(0,n.jsx)(a.pre,{children:(0,n.jsx)(a.code,{className:"language-bash",children:"which comando\n"})}),"\n",(0,n.jsxs)(a.p,{children:["Por ejemplo, imaginemos que queremos saber donde esta instalado el comando ",(0,n.jsx)(a.code,{children:"ls"}),". Podemos hacerlo de la siguiente forma:"]}),"\n",(0,n.jsx)(a.pre,{children:(0,n.jsx)(a.code,{className:"language-bash",children:"which ls\n"})}),"\n",(0,n.jsxs)(a.p,{children:["Esto nos devolver\xe1 la ruta donde se encuentra el comando ",(0,n.jsx)(a.code,{children:"ls"}),":"]}),"\n",(0,n.jsx)(a.pre,{children:(0,n.jsx)(a.code,{className:"language-bash",children:"/usr/bin/ls # Habitualmente, el comando ls se encuentra en esta ruta\n"})}),"\n",(0,n.jsx)(a.h2,{id:"grep",children:"Grep"}),"\n",(0,n.jsxs)(a.p,{children:["El comando ",(0,n.jsx)(a.code,{children:"grep"})," nos permite buscar una cadena de caracteres en un fichero de texto. Para buscar una cadena de caracteres, podemos hacerlo de la siguiente forma:"]}),"\n",(0,n.jsx)(a.pre,{children:(0,n.jsx)(a.code,{className:"language-bash",children:'grep "cadena" fichero\n'})}),"\n",(0,n.jsxs)(a.p,{children:["Si queremos buscar una cadena de caracteres en todos los ficheros de un directorio, podemos usar el par\xe1metro ",(0,n.jsx)(a.code,{children:"-r"}),":"]}),"\n",(0,n.jsx)(a.pre,{children:(0,n.jsx)(a.code,{className:"language-bash",children:'grep -r "cadena" directorio\n'})}),"\n",(0,n.jsxs)(a.p,{children:["Si queremos buscar una cadena de caracteres en todos los ficheros de un directorio y sus subdirectorios, podemos usar el par\xe1metro ",(0,n.jsx)(a.code,{children:"-R"}),":"]}),"\n",(0,n.jsx)(a.pre,{children:(0,n.jsx)(a.code,{className:"language-bash",children:'grep -R "cadena" directorio\n'})}),"\n",(0,n.jsx)(a.p,{children:"Podr\xedamos filtar el flujo de salida de otro comando. Por ejemplo, si queremos buscar una cadena de caracteres en los ficheros de un directorio, podemos hacerlo de la siguiente forma:"}),"\n",(0,n.jsx)(a.pre,{children:(0,n.jsx)(a.code,{className:"language-bash",children:'ls directorio | grep "cadena"\n'})})]})}function u(e={}){const{wrapper:a}={...(0,r.M)(),...e.components};return a?(0,n.jsx)(a,{...e,children:(0,n.jsx)(t,{...e})}):t(e)}},4552:(e,a,s)=>{s.d(a,{I:()=>d,M:()=>o});var n=s(11504);const r={},c=n.createContext(r);function o(e){const a=n.useContext(c);return n.useMemo((function(){return"function"==typeof e?e(a):{...a,...e}}),[a,e])}function d(e){let a;return a=e.disableParentContext?"function"==typeof e.components?e.components(r):e.components||r:o(e.components),n.createElement(c.Provider,{value:a},e.children)}}}]);