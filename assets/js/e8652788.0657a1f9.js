"use strict";(self.webpackChunkpabpereza=self.webpackChunkpabpereza||[]).push([[3140],{16204:(e,a,s)=>{s.r(a),s.d(a,{assets:()=>l,contentTitle:()=>n,default:()=>p,frontMatter:()=>o,metadata:()=>i,toc:()=>c});var r=s(17624),t=s(4552);const o={},n=void 0,i={id:"notas/MySQL/export_import",title:"export_import",description:"Exportar e importar bases de datos es un proceso cr\xedtico y totalmente necesario para proteger nuestros datos.",source:"@site/docs/notas/MySQL/export_import.md",sourceDirName:"notas/MySQL",slug:"/notas/MySQL/export_import",permalink:"/docs/notas/MySQL/export_import",draft:!1,unlisted:!1,editUrl:"https://github.com/pabpereza/pabpereza/tree/main/docs/notas/MySQL/export_import.md",tags:[],version:"current",frontMatter:{},sidebar:"notas",previous:{title:"cursores",permalink:"/docs/notas/MySQL/cursores"},next:{title:"funciones_en_consultas",permalink:"/docs/notas/MySQL/funciones_en_consultas"}},l={},c=[{value:"MySQL",id:"mysql",level:2},{value:"Exportar",id:"exportar",level:3},{value:"Importar",id:"importar",level:3}];function d(e){const a={code:"code",h2:"h2",h3:"h3",p:"p",pre:"pre",...(0,t.M)(),...e.components};return(0,r.jsxs)(r.Fragment,{children:[(0,r.jsx)(a.p,{children:"Exportar e importar bases de datos es un proceso cr\xedtico y totalmente necesario para proteger nuestros datos."}),"\n",(0,r.jsx)(a.p,{children:"Estas exportaciones se puede hacer con clientes como mysql workbench, phpmyadmin, etc. En la pr\xe1ctica, suele haber incompatibilidades entre algunas vesiones de los clientes con el servidor de bases de datos. Personalmente, siempre recomiendo utilizar la utilidad de terminal que lleva el propio servidor para minimizar la posibilidad de errores."}),"\n",(0,r.jsx)(a.p,{children:"A continuaci\xf3n, una lista de como exportar e importar bases de datos sql clasificados por tecnolog\xeda:"}),"\n",(0,r.jsx)(a.h2,{id:"mysql",children:"MySQL"}),"\n",(0,r.jsx)(a.h3,{id:"exportar",children:"Exportar"}),"\n",(0,r.jsx)(a.p,{children:"Podemos exportar con el siguiente comando:"}),"\n",(0,r.jsx)(a.pre,{children:(0,r.jsx)(a.code,{className:"language-bash",children:"mysqldump -u USER -p DATABASE > salida.sql #La contrase\xf1a nos la pedir\xe1 interactivamente\n"})}),"\n",(0,r.jsx)(a.p,{children:"Ejemplo real:"}),"\n",(0,r.jsx)(a.pre,{children:(0,r.jsx)(a.code,{className:"language-bash",children:"mysqldump -u root -p database1 > database1.sql\n"})}),"\n",(0,r.jsx)(a.p,{children:"Exportar m\xfaltiples bases de datos:"}),"\n",(0,r.jsx)(a.pre,{children:(0,r.jsx)(a.code,{className:"language-bash",children:"mysqldump -u root -p --databases database1 database2 database3 > databases.sql\n"})}),"\n",(0,r.jsx)(a.p,{children:"Exportar tablas espec\xedficas:"}),"\n",(0,r.jsx)(a.pre,{children:(0,r.jsx)(a.code,{className:"language-bash",children:"mysqldump -u root -p --databases database1 --tables table1 table2 table3 > tables.sql\n"})}),"\n",(0,r.jsx)(a.h3,{id:"importar",children:"Importar"}),"\n",(0,r.jsx)(a.p,{children:"Podemos importar con el siguiente comando:"}),"\n",(0,r.jsx)(a.pre,{children:(0,r.jsx)(a.code,{className:"language-bash",children:"mysql -u USER -p DATABASE < salida.sql\n"})})]})}function p(e={}){const{wrapper:a}={...(0,t.M)(),...e.components};return a?(0,r.jsx)(a,{...e,children:(0,r.jsx)(d,{...e})}):d(e)}},4552:(e,a,s)=>{s.d(a,{I:()=>i,M:()=>n});var r=s(11504);const t={},o=r.createContext(t);function n(e){const a=r.useContext(o);return r.useMemo((function(){return"function"==typeof e?e(a):{...a,...e}}),[a,e])}function i(e){let a;return a=e.disableParentContext?"function"==typeof e.components?e.components(t):e.components||t:n(e.components),r.createElement(o.Provider,{value:a},e.children)}}}]);