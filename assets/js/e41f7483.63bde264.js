"use strict";(self.webpackChunkpabpereza=self.webpackChunkpabpereza||[]).push([[5596],{69664:(e,a,n)=>{n.r(a),n.d(a,{assets:()=>l,contentTitle:()=>s,default:()=>u,frontMatter:()=>r,metadata:()=>i,toc:()=>c});var t=n(17624),o=n(4552);const r={date:new Date("2021-10-24T00:00:00.000Z"),title:"La alternativa a Docker que estabas buscando - Rancher Desktop",slug:"Rancher Desktop",tags:["docker","devops"],authors:"pabpereza"},s=void 0,i={permalink:"/blog/Rancher Desktop",editUrl:"https://github.com/pabpereza/pabpereza/tree/main/blog/2023_01_10_rancher_desktop/index.md",source:"@site/blog/2023_01_10_rancher_desktop/index.md",title:"La alternativa a Docker que estabas buscando - Rancher Desktop",description:"Ya estuve explicando en este art\xedculo los nuevos planes de Docker Desktop y como afectar\xeda a los usuarios.",date:"2021-10-24T00:00:00.000Z",tags:[{label:"docker",permalink:"/blog/tags/docker"},{label:"devops",permalink:"/blog/tags/devops"}],readingTime:1.62,hasTruncateMarker:!1,authors:[{name:"Pablo P\xe9rez-Aradros",title:"CISO SecDevOps @ Santander Group",url:"https://github.com/pabpereza",email:"pabloperezaradros@gmail.com",imageURL:"https://github.com/pabpereza.png",key:"pabpereza"}],frontMatter:{date:"2021-10-24T00:00:00.000Z",title:"La alternativa a Docker que estabas buscando - Rancher Desktop",slug:"Rancher Desktop",tags:["docker","devops"],authors:"pabpereza"},unlisted:!1,prevItem:{title:"Kali en Docker recopilaci\xf3n",permalink:"/blog/kalilinux_en_docker"},nextItem:{title:"Analizar la seguridad de las im\xe1genes de Docker",permalink:"/blog/Analizar seguridad docker"}},l={authorsImageUrls:[void 0]},c=[{value:"\xbfQu\xe9 es rancher desktop?",id:"qu\xe9-es-rancher-desktop",level:2},{value:"\xbfQu\xe9 aporta?",id:"qu\xe9-aporta",level:2},{value:"La alternativa definitiva",id:"la-alternativa-definitiva",level:2}];function d(e){const a={a:"a",h2:"h2",img:"img",p:"p",...(0,o.M)(),...e.components};return(0,t.jsxs)(t.Fragment,{children:[(0,t.jsxs)(a.p,{children:["Ya estuve explicando en este ",(0,t.jsx)(a.a,{href:"/blog/docker_desktop_de_pago",children:"art\xedculo"})," los nuevos planes de Docker Desktop y como afectar\xeda a los usuarios.\nAunque existen otras alternativas como Buildah o Podman, estas, solo funcionan sobre linux y si sois usuarios de\nWindows o Mac y pensais en montar una m\xe1quina Linux quiz\xe1 prefir\xe1is usar docker engine por la familiaridad que no usar otras herramientas."]}),"\n",(0,t.jsxs)(a.p,{children:["Rancher Desktop se posiciona como una alternativa a tener en cuenta. Dentro v\xeddeo ",(0,t.jsx)("i",{class:"fa fa-film"}),"\n",(0,t.jsx)(a.a,{href:"https://youtu.be/LmKN4NvpR-4",children:"https://youtu.be/LmKN4NvpR-4"})]}),"\n",(0,t.jsx)(a.h2,{id:"qu\xe9-es-rancher-desktop",children:"\xbfQu\xe9 es rancher desktop?"}),"\n",(0,t.jsx)(a.p,{children:"Si vienes del mundo de kubernetes seguro que Rancher te es familiar. Este es una plataforma de kubernetes con una capa de gesti\xf3n\npensado en la facilidad de despliegue y gesti\xf3n de cl\xfasters."}),"\n",(0,t.jsx)(a.p,{children:"En esta ocasi\xf3n, rancher desktop es una forma de acercarse a los desarrolladores y competir directamente con docker en el escritorio."}),"\n",(0,t.jsx)(a.h2,{id:"qu\xe9-aporta",children:"\xbfQu\xe9 aporta?"}),"\n",(0,t.jsx)(a.p,{children:"El planteamiento es similar al de Docker Desktop, gestiona autom\xe1ticamente la instalaci\xf3n de una interfaz de usario, el engine de contenedores (containerd), k3s (la misma tecnolog\xeda que utiliza rancher para kubernetes), kubectl... etc y todo este paquete en una instalaci\xf3n sencilla."}),"\n",(0,t.jsx)(a.p,{children:(0,t.jsx)(a.img,{src:n(36672).c+"",width:"2122",height:"1652"})}),"\n",(0,t.jsx)(a.p,{children:"Si has visto el v\xeddeo Rancher Desktop, al menos en Windows, tiene algunos peque\xf1os errores. Cabe recordar que su estado de desarrollo es pre-release y es normal que durante sus betas encontremos\nerrores que nos impidan utilizarlo a d\xeda de hoy."}),"\n",(0,t.jsx)(a.h2,{id:"la-alternativa-definitiva",children:"La alternativa definitiva"}),"\n",(0,t.jsx)(a.p,{children:"Como ya comentaba, una soluci\xf3n 100% efectiva es instalar docker en una m\xe1quina virtual de linux. Esto lo podr\xedamos hacer manualmente pero, puestos a hacerlo, mejor hacerlo bien."}),"\n",(0,t.jsxs)(a.p,{children:["Un viejo compa\xf1ero con alias ",(0,t.jsx)(a.a,{href:"https://github.com/Yohnah",children:"Yohnah"})," en Github ha creado un repositorio con automatismos y una m\xe1quina virtual preparada para desplegar autom\xe1ticamente con Vagrant.\nLa m\xe1quina virtual viene con docker instalado y listo para funcionar, adem\xe1s, el automatismo deja el host configurado para que utilice el docker engine de la m\xe1quina virtual de una forma similar a la que lo hace docker desktop. Toda la gu\xeda aqu\xed:\n",(0,t.jsx)(a.a,{href:"https://github.com/Yohnah/Docker",children:"https://github.com/Yohnah/Docker"})]}),"\n",(0,t.jsx)(a.p,{children:"\xa1Hasta el siguiente!"})]})}function u(e={}){const{wrapper:a}={...(0,o.M)(),...e.components};return a?(0,t.jsx)(a,{...e,children:(0,t.jsx)(d,{...e})}):d(e)}},36672:(e,a,n)=>{n.d(a,{c:()=>t});const t=n.p+"assets/images/rancher_desktop_panel-7a643584ce769a926a9d9013771742ff.png"},4552:(e,a,n)=>{n.d(a,{I:()=>i,M:()=>s});var t=n(11504);const o={},r=t.createContext(o);function s(e){const a=t.useContext(r);return t.useMemo((function(){return"function"==typeof e?e(a):{...a,...e}}),[a,e])}function i(e){let a;return a=e.disableParentContext?"function"==typeof e.components?e.components(o):e.components||o:s(e.components),t.createElement(r.Provider,{value:a},e.children)}}}]);