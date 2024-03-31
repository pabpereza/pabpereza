"use strict";(self.webpackChunkpabpereza=self.webpackChunkpabpereza||[]).push([[1800],{68116:(e,n,s)=>{s.r(n),s.d(n,{assets:()=>d,contentTitle:()=>t,default:()=>u,frontMatter:()=>r,metadata:()=>l,toc:()=>o});var i=s(17624),a=s(4552);const r={title:"Esc\xe1neres de vulnerabilidades",weight:4,tags:["docker","seguridad","vulnerabilidades"],authors:"pabpereza Herramientas que nos permiten analizar la seguridad en nuestros contenedores."},t=void 0,l={id:"notas/analizar_contenedores",title:"Esc\xe1neres de vulnerabilidades",description:"Introducci\xf3n",source:"@site/docs/notas/analizar_contenedores.md",sourceDirName:"notas",slug:"/notas/analizar_contenedores",permalink:"/docs/notas/analizar_contenedores",draft:!1,unlisted:!1,editUrl:"https://github.com/pabpereza/pabpereza/tree/main/docs/notas/analizar_contenedores.md",tags:[{label:"docker",permalink:"/docs/tags/docker"},{label:"seguridad",permalink:"/docs/tags/seguridad"},{label:"vulnerabilidades",permalink:"/docs/tags/vulnerabilidades"}],version:"current",frontMatter:{title:"Esc\xe1neres de vulnerabilidades",weight:4,tags:["docker","seguridad","vulnerabilidades"],authors:"pabpereza Herramientas que nos permiten analizar la seguridad en nuestros contenedores."},sidebar:"notas",previous:{title:"SNMP",permalink:"/docs/notas/SNMP"},next:{title:"claves_ssh",permalink:"/docs/notas/claves_ssh"}},d={},o=[{value:"Introducci\xf3n",id:"introducci\xf3n",level:2},{value:"Herramientas",id:"herramientas",level:2},{value:"Snyk - Docker Desktop",id:"snyk---docker-desktop",level:3}];function c(e){const n={a:"a",code:"code",h2:"h2",h3:"h3",p:"p",pre:"pre",...(0,a.M)(),...e.components};return(0,i.jsxs)(i.Fragment,{children:[(0,i.jsx)(n.h2,{id:"introducci\xf3n",children:"Introducci\xf3n"}),"\n",(0,i.jsx)(n.p,{children:"Los contenedores nos han permitido la facilidad y comodidad de empaquetar nuestras aplicaciones y servicios, y tambi\xe9n nos permiten asegurar que se ejecuten de forma segura. Sin embargo, las im\xe1genes se contruyen con muchos componentes de terceros sobre los que no tenemos visibilidad. Para esta labor tenemos diferentes herramientas que nos ayudan a analizar la seguridad de nuestros contenedores."}),"\n",(0,i.jsx)(n.h2,{id:"herramientas",children:"Herramientas"}),"\n",(0,i.jsx)(n.h3,{id:"snyk---docker-desktop",children:"Snyk - Docker Desktop"}),"\n",(0,i.jsx)(n.p,{children:"Es sin duda una de las m\xe1s desconocidas debido a su reciente implementaci\xf3n en la plataforma de Docker pero, dada su integraci\xf3n nativa y que no es necesario realizar instalaciones adicionales, es una herramienta m\xe1s que adecuada."}),"\n",(0,i.jsxs)(n.p,{children:["Tiene unas limitaciones de uso mensual pero podemos iniciar sesi\xf3n con una cuenta gratuita para ampliarlo. ",(0,i.jsx)(n.a,{href:"https://snyk.io/",children:"Snyk"}),"."]}),"\n",(0,i.jsx)(n.p,{children:"Podemos utilizar esta herramienta simplemente escribiendo:"}),"\n",(0,i.jsx)(n.pre,{children:(0,i.jsx)(n.code,{className:"language-bash",children:"docker scan <imagen>\n"})}),"\n",(0,i.jsx)(n.p,{children:'Otra forma de utilizarla, es con el par\xe1metro "--dependency-tree", el cu\xe1l muestra todo el \xe1rbol\nde dependencias de la images.'}),"\n",(0,i.jsx)(n.pre,{children:(0,i.jsx)(n.code,{className:"language-bash",children:"docker scan --dependency-tree <imagen>\n     \u251c\u2500 ca-certificates @ 20200601~deb10u1\n     \u2502  \u2514\u2500 openssl @ 1.1.1d-0+deb10u3\n     \u2502     \u2514\u2500 openssl/libssl1.1 @ 1.1.1d-0+deb10u3\n     \u251c\u2500 curl @ 7.64.0-4+deb10u1\n     \u2502  \u2514\u2500 curl/libcurl4 @ 7.64.0-4+deb10u1\n     \u2502     \u251c\u2500 e2fsprogs/libcom-err2 @ 1.44.5-1+deb10u3\n     \u2502     \u251c\u2500 krb5/libgssapi-krb5-2 @ 1.17-3\n     \u2502     \u2502  \u251c\u2500 e2fsprogs/libcom-err2 @ 1.44.5-1+deb10u3\n     \u2502     \u2502  \u251c\u2500 krb5/libk5crypto3 @ 1.17-3\n     \u2502     \u2502  \u2502  \u2514\u2500 krb5/libkrb5support0 @ 1.17-3\n     \u2502     \u2502  \u251c\u2500 krb5/libkrb5-3 @ 1.17-3\n     \u2502     \u2502  \u2502  \u251c\u2500 e2fsprogs/libcom-err2 @ 1.44.5-1+deb10u3\n     \u2502     \u2502  \u2502  \u251c\u2500 krb5/libk5crypto3 @ 1.17-3\n     \u2502     \u2502  \u2502  \u251c\u2500 krb5/libkrb5support0 @ 1.17-3\n     \u2502     \u2502  \u2502  \u2514\u2500 openssl/libssl1.1 @ 1.1.1d-0+deb10u3\n     \u2502     \u2502  \u2514\u2500 krb5/libkrb5support0 @ 1.17-3\n     \u2502     \u251c\u2500 libidn2/libidn2-0 @ 2.0.5-1+deb10u1\n     \u2502     \u2502  \u2514\u2500 libunistring/libunistring2 @ 0.9.10-1\n     \u2502     \u251c\u2500 krb5/libk5crypto3 @ 1.17-3\n     \u2502     \u251c\u2500 krb5/libkrb5-3 @ 1.17-3\n     \u2502     \u251c\u2500 openldap/libldap-2.4-2 @ 2.4.47+dfsg-3+deb10u2\n     \u2502     \u2502  \u251c\u2500 gnutls28/libgnutls30 @ 3.6.7-4+deb10u4\n     \u2502     \u2502  \u2502  \u251c\u2500 nettle/libhogweed4 @ 3.4.1-1\n     \u2502     \u2502  \u2502  \u2502  \u2514\u2500 nettle/libnettle6 @ 3.4.1-1\n     \u2502     \u2502  \u2502  \u251c\u2500 libidn2/libidn2-0 @ 2.0.5-1+deb10u1\n     \u2502     \u2502  \u2502  \u251c\u2500 nettle/libnettle6 @ 3.4.1-1\n     \u2502     \u2502  \u2502  \u251c\u2500 p11-kit/libp11-kit0 @ 0.23.15-2\n     \u2502     \u2502  \u2502  \u2502  \u2514\u2500 libffi/libffi6 @ 3.2.1-9\n     \u2502     \u2502  \u2502  \u251c\u2500 libtasn1-6 @ 4.13-3\n     \u2502     \u2502  \u2502  \u2514\u2500 libunistring/libunistring2 @ 0.9.10-1\n     \u2502     \u2502  \u251c\u2500 cyrus-sasl2/libsasl2-2 @ 2.1.27+dfsg-1+deb10u1\n     \u2502     \u2502  \u2502  \u2514\u2500 cyrus-sasl2/libsasl2-modules-db @ 2.1.27+dfsg-1+deb10u1\n     \u2502     \u2502  \u2502     \u2514\u2500 db5.3/libdb5.3 @ 5.3.28+dfsg1-0.5\n     \u2502     \u2502  \u2514\u2500 openldap/libldap-common @ 2.4.47+dfsg-3+deb10u2\n     \u2502     \u251c\u2500 nghttp2/libnghttp2-14 @ 1.36.0-2+deb10u1\n     \u2502     \u251c\u2500 libpsl/libpsl5 @ 0.20.2-2\n     \u2502     \u2502  \u251c\u2500 libidn2/libidn2-0 @ 2.0.5-1+deb10u1\n     \u2502     \u2502  \u2514\u2500 libunistring/libunistring2 @ 0.9.10-1\n     \u2502     \u251c\u2500 rtmpdump/librtmp1 @ 2.4+20151223.gitfa8646d.1-2\n     \u2502     \u2502  \u251c\u2500 gnutls28/libgnutls30 @ 3.6.7-4+deb10u4\n     \u2502     \u2502  \u251c\u2500 nettle/libhogweed4 @ 3.4.1-1\n     \u2502     \u2502  \u2514\u2500 nettle/libnettle6 @ 3.4.1-1\n     \u2502     \u251c\u2500 libssh2/libssh2-1 @ 1.8.0-2.1\n     \u2502     \u2502  \u2514\u2500 libgcrypt20 @ 1.8.4-5\n     \u2502     \u2514\u2500 openssl/libssl1.1 @ 1.1.1d-0+deb10u3\n     \u251c\u2500 gnupg2/dirmngr @ 2.2.12-1+deb10u1\n"})})]})}function u(e={}){const{wrapper:n}={...(0,a.M)(),...e.components};return n?(0,i.jsx)(n,{...e,children:(0,i.jsx)(c,{...e})}):c(e)}},4552:(e,n,s)=>{s.d(n,{I:()=>l,M:()=>t});var i=s(11504);const a={},r=i.createContext(a);function t(e){const n=i.useContext(r);return i.useMemo((function(){return"function"==typeof e?e(n):{...n,...e}}),[n,e])}function l(e){let n;return n=e.disableParentContext?"function"==typeof e.components?e.components(a):e.components||a:t(e.components),i.createElement(r.Provider,{value:n},e.children)}}}]);