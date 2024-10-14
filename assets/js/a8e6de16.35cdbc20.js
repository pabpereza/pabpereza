"use strict";(self.webpackChunkpabpereza=self.webpackChunkpabpereza||[]).push([[2224],{33128:(e,o,n)=>{n.r(o),n.d(o,{assets:()=>c,contentTitle:()=>s,default:()=>d,frontMatter:()=>r,metadata:()=>i,toc:()=>l});var a=n(17624),t=n(4552);const r={},s=void 0,i={id:"notas/index_lock",title:"index_lock",description:"Git tiene un sistema de funcionamiento muy estricto para evitar conflictos y ayudarnos a mantener nuestro bien versionado.",source:"@site/docs/notas/index_lock.md",sourceDirName:"notas",slug:"/notas/index_lock",permalink:"/docs/notas/index_lock",draft:!1,unlisted:!1,editUrl:"https://github.com/pabpereza/pabpereza/tree/main/docs/notas/index_lock.md",tags:[],version:"current",frontMatter:{},sidebar:"notas",previous:{title:"herramientas_busqueda",permalink:"/docs/notas/herramientas_busqueda"},next:{title:"nfs",permalink:"/docs/notas/nfs"}},c={},l=[];function u(e){const o={code:"code",em:"em",p:"p",pre:"pre",...(0,t.M)(),...e.components};return(0,a.jsxs)(a.Fragment,{children:[(0,a.jsx)(o.p,{children:"Git tiene un sistema de funcionamiento muy estricto para evitar conflictos y ayudarnos a mantener nuestro bien versionado.\nPara ello, solo a un proceso realziar cambios a la vez para mantener la integridad de la informaci\xf3n."}),"\n",(0,a.jsx)(o.p,{children:'Cuando realizamos cualquier tarea en git, un commit, push, pull... este genera un archivo llamado "index.lock" y lo guarda\ndentro de la carpeta ".git" en la raiz del repositorio.'}),"\n",(0,a.jsx)(o.p,{children:"Este archivo bloquea el repositorio ante cualquier otro acceso o proceso simult\ufffdneo que quiera realizar cambios. En algunos casos,\npoco frecuentes, puede pasar que una acci\xf3n o tarea nunca termine ( por fallo del SO u otros) y el repositorio se quede bloqueado."}),"\n",(0,a.jsx)(o.p,{children:"Si tenemos claro lo que estamos haciendo, podr\xedamos borrar simplemente este archivo con el comando:"}),"\n",(0,a.jsx)(o.pre,{children:(0,a.jsx)(o.code,{className:"language-shell",children:"rm .git/index.lock\n"})}),"\n",(0,a.jsxs)(o.p,{children:["As\xed de simple conseguir\xedamos quitar el bloqueo de git pero ",(0,a.jsx)(o.em,{children:"atenci\xf3n"})," que no tengamos otro proceso ejecutando alguna tarea sobre git\no podr\xedamos corromper datos del repositorio."]})]})}function d(e={}){const{wrapper:o}={...(0,t.M)(),...e.components};return o?(0,a.jsx)(o,{...e,children:(0,a.jsx)(u,{...e})}):u(e)}},4552:(e,o,n)=>{n.d(o,{I:()=>i,M:()=>s});var a=n(11504);const t={},r=a.createContext(t);function s(e){const o=a.useContext(r);return a.useMemo((function(){return"function"==typeof e?e(o):{...o,...e}}),[o,e])}function i(e){let o;return o=e.disableParentContext?"function"==typeof e.components?e.components(t):e.components||t:s(e.components),a.createElement(r.Provider,{value:o},e.children)}}}]);