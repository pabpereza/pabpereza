"use strict";(self.webpackChunkpabpereza=self.webpackChunkpabpereza||[]).push([[3996],{63636:(e,n,s)=>{s.r(n),s.d(n,{assets:()=>d,contentTitle:()=>l,default:()=>u,frontMatter:()=>t,metadata:()=>c,toc:()=>o});var a=s(17624),r=s(4552);const t={},l=void 0,c={id:"notas/Kubernetes/mantenimiento",title:"mantenimiento",description:"El mantenimiento de kubernetes es una tarea que se realiza con frecuencia.",source:"@site/docs/notas/Kubernetes/mantenimiento.md",sourceDirName:"notas/Kubernetes",slug:"/notas/Kubernetes/mantenimiento",permalink:"/docs/notas/Kubernetes/mantenimiento",draft:!1,unlisted:!1,editUrl:"https://github.com/pabpereza/pabpereza/tree/main/docs/notas/Kubernetes/mantenimiento.md",tags:[],version:"current",frontMatter:{},sidebar:"notas",previous:{title:"manifest",permalink:"/docs/notas/Kubernetes/manifest"},next:{title:"namespaces",permalink:"/docs/notas/Kubernetes/namespaces"}},d={},o=[{value:"Backup base de datos etcd",id:"backup-base-de-datos-etcd",level:2},{value:"Actualizar el cluster",id:"actualizar-el-cluster",level:2}];function i(e){const n={code:"code",h2:"h2",li:"li",ol:"ol",p:"p",pre:"pre",...(0,r.M)(),...e.components};return(0,a.jsxs)(a.Fragment,{children:[(0,a.jsx)(n.p,{children:"El mantenimiento de kubernetes es una tarea que se realiza con frecuencia."}),"\n",(0,a.jsx)(n.h2,{id:"backup-base-de-datos-etcd",children:"Backup base de datos etcd"}),"\n",(0,a.jsx)(n.p,{children:"Durante los procesos de actualizaci\xf3n, por muy estables que sean, siempre es\nbuena idea crear una copia de seguridad de la base de datos del cluster."}),"\n",(0,a.jsxs)(n.ol,{children:["\n",(0,a.jsx)(n.li,{children:"Lo primero que tenemos que hacer es buscar el directorio de los datos de etcd:"}),"\n"]}),"\n",(0,a.jsx)(n.pre,{children:(0,a.jsx)(n.code,{className:"language-bash",children:"sudo grep data-dir /etc/kubernetes/manifests/etcd.yaml\n"})}),"\n",(0,a.jsxs)(n.p,{children:["Toda esta parte se realiza ejecutando comandos dentro del contenedor de etcd. Se llama ",(0,a.jsx)(n.code,{children:"etcd-<nombre nodo>"}),"\n, aunque podr\xedas listar los pods del sistema para encontrarlo con ",(0,a.jsx)(n.code,{children:"kubectl -n kube-system get pods"}),"."]}),"\n",(0,a.jsxs)(n.ol,{start:"2",children:["\n",(0,a.jsx)(n.li,{children:"Comprobamos el estado de la base de datos de etcd:"}),"\n"]}),"\n",(0,a.jsx)(n.pre,{children:(0,a.jsx)(n.code,{className:"language-bash",children:'kubectl -n kube-system exec -it etcd-<nombre_pod> -- sh -c "ETCDCTL_API=3 \\\nETCDCTL_CACERT=/etc/kubernetes/pki/etcd/ca.crt \\\nETCDCTL_CERT=/etc/kubernetes/pki/etcd/server.crt \\\nETCDCTL_KEY=/etc/kubernetes/pki/etcd/server.key \\\netcdctl endpoint health"\n'})}),"\n",(0,a.jsxs)(n.ol,{start:"3",children:["\n",(0,a.jsx)(n.li,{children:"Comprobamos el estado del cluster:"}),"\n"]}),"\n",(0,a.jsx)(n.pre,{children:(0,a.jsx)(n.code,{className:"language-bash",children:'kubectl -n kube-system exec -it etcd-kube-master -- sh -c "ETCDCTL_API=3 \\\nETCDCTL_CACERT=/etc/kubernetes/pki/etcd/ca.crt \\\nETCDCTL_CERT=/etc/kubernetes/pki/etcd/server.crt \\\nETCDCTL_KEY=/etc/kubernetes/pki/etcd/server.key \\\netcdctl --endpoints=https://127.0.0.1:2379 member list -w table"\n'})}),"\n",(0,a.jsxs)(n.ol,{start:"4",children:["\n",(0,a.jsxs)(n.li,{children:["Por \xfaltimo, hacemos la copia de seguridad con el comando ",(0,a.jsx)(n.code,{children:"snapshot"}),":"]}),"\n"]}),"\n",(0,a.jsx)(n.pre,{children:(0,a.jsx)(n.code,{className:"language-bash",children:'kubectl -n kube-system exec -it etcd-kube-master -- sh -c "ETCDCTL_API=3 \\\nETCDCTL_CACERT=/etc/kubernetes/pki/etcd/ca.crt \\\nETCDCTL_CERT=/etc/kubernetes/pki/etcd/server.crt \\\nETCDCTL_KEY=/etc/kubernetes/pki/etcd/server.key \\\netcdctl --endpoints=https://127.0.0.1:2379 snapshot save /var/lib/etcd/snapshot.db"\n'})}),"\n",(0,a.jsx)(n.p,{children:"Si hacemos un ls en directorio del paso 1 (normalmente /var/lib/etcd)\npodremos ver el la base de datos que acabamos de extraer:"}),"\n",(0,a.jsx)(n.pre,{children:(0,a.jsx)(n.code,{className:"language-bash",children:"sudo ls -l /var/lib/etcd\n"})}),"\n",(0,a.jsx)(n.h2,{id:"actualizar-el-cluster",children:"Actualizar el cluster"}),"\n",(0,a.jsx)(n.p,{children:"Lo primero es actualizar la herramienta kubeadm, la cu\xe1l, nos ayudar\xe1 a\nactualizar el cluster."}),"\n",(0,a.jsxs)(n.ol,{children:["\n",(0,a.jsx)(n.li,{children:"Actualizamos los metadatos de los paquetes del sistema con:"}),"\n"]}),"\n",(0,a.jsx)(n.pre,{children:(0,a.jsx)(n.code,{className:"language-bash",children:"sudo apt update\n"})}),"\n",(0,a.jsxs)(n.ol,{start:"2",children:["\n",(0,a.jsxs)(n.li,{children:["Podemos consultar las versiones disponibles con la herramienta ",(0,a.jsx)(n.code,{children:"madison"})," las versiones disponibles con la herramienta ",(0,a.jsx)(n.code,{children:"madison"}),":"]}),"\n"]}),"\n",(0,a.jsx)(n.pre,{children:(0,a.jsx)(n.code,{className:"language-bash",children:"sudo apt-cache madison kubeadm\n"})}),"\n",(0,a.jsxs)(n.ol,{start:"3",children:["\n",(0,a.jsx)(n.li,{children:"Si ten\xedamos bloqueado el paquete kubeadm para que no se actualizara\nautom\xe1ticamente, lo desbloqueamos:"}),"\n"]}),"\n",(0,a.jsx)(n.pre,{children:(0,a.jsx)(n.code,{className:"language-bash",children:"sudo apt-mark unhold kubeadm\n"})}),"\n",(0,a.jsxs)(n.ol,{start:"4",children:["\n",(0,a.jsx)(n.li,{children:"Instalamos la versi\xf3n deseada:"}),"\n"]}),"\n",(0,a.jsx)(n.pre,{children:(0,a.jsx)(n.code,{className:"language-bash",children:"sudo apt install -y kubeadm=1.23.1-00\n"})}),"\n",(0,a.jsxs)(n.ol,{start:"5",children:["\n",(0,a.jsx)(n.li,{children:"Volvemos a bloquear la actualizaci\xf3n del paquete:"}),"\n"]}),"\n",(0,a.jsx)(n.pre,{children:(0,a.jsx)(n.code,{className:"language-bash",children:"sudo apt-mark hold kubeadm\n"})}),"\n",(0,a.jsxs)(n.ol,{start:"6",children:["\n",(0,a.jsx)(n.li,{children:"Podemos comprobar la versi\xf3n que accabamos de instalar:"}),"\n"]}),"\n",(0,a.jsx)(n.pre,{children:(0,a.jsx)(n.code,{className:"language-bash",children:"sudo kubeadm version\n"})}),"\n",(0,a.jsxs)(n.ol,{start:"7",children:["\n",(0,a.jsx)(n.li,{children:"Para preparar el nodo para la actualizaci\xf3n, tenemos que desalojar\na todos los pods como sea posible (si estuvieramos actualizando un nodo\ntrabajador el drain tendr\xedamos que hacerlo desde el maestro).\nSe puede realizar as\xed:"}),"\n"]}),"\n",(0,a.jsx)(n.pre,{children:(0,a.jsx)(n.code,{className:"language-bash",children:"kubectl drain <nombre_nodo> --ignore-daemonsets\n"})}),"\n",(0,a.jsxs)(n.ol,{start:"8",children:["\n",(0,a.jsxs)(n.li,{children:["El comando ",(0,a.jsx)(n.code,{children:"kubeadm"})," nos permite previsualizar los cambios que va a\ngenerar la actualizaci\xf3n con el comando ",(0,a.jsx)(n.code,{children:"plan"}),":"]}),"\n"]}),"\n",(0,a.jsx)(n.pre,{children:(0,a.jsx)(n.code,{children:"sudo kubeadm upgrade plan\n"})}),"\n",(0,a.jsxs)(n.ol,{start:"9",children:["\n",(0,a.jsxs)(n.li,{children:["Podemos realizar la actualizaci\xf3n del nodo con el comando ",(0,a.jsx)(n.code,{children:"apply"}),":"]}),"\n"]}),"\n",(0,a.jsx)(n.pre,{children:(0,a.jsx)(n.code,{className:"language-bash",children:"sudo kubeadm upgrade plan\n"})}),"\n",(0,a.jsxs)(n.ol,{start:"10",children:["\n",(0,a.jsx)(n.li,{children:"Actualizamos el resto de paquetes a la misma version:"}),"\n"]}),"\n",(0,a.jsx)(n.pre,{children:(0,a.jsx)(n.code,{className:"language-bash",children:"sudo apt-mark unhold kubelet kubectl\nsudo apt-get install -y kubelet=1.23.1-00 kubectl=1.23.1-00\nsudo apt-mark hold kubelet kubectl\n"})}),"\n",(0,a.jsxs)(n.ol,{start:"11",children:["\n",(0,a.jsxs)(n.li,{children:["Aunque hemos actualizado correctamente, si ejecutamos ",(0,a.jsx)(n.code,{children:"kubectl get nodes"}),"\nnos seguir\xe1 mostrando la versi\xf3n anterior. La actualizaci\xf3n se har\xe1\nefectiva hasta que reiniciemos los servicios:"]}),"\n"]}),"\n",(0,a.jsx)(n.pre,{children:(0,a.jsx)(n.code,{className:"language-bash",children:"sudo systemctl daemon-reload\nsudo systemctl restart kubelet\n"})}),"\n",(0,a.jsxs)(n.ol,{start:"12",children:["\n",(0,a.jsx)(n.li,{children:"Por \xfaltimo, en el proceso de actualizaci\xf3n de un nodo, este desactiva\nel planificador de tareas. Podemos desbloquearlo as\xed:"}),"\n"]}),"\n",(0,a.jsx)(n.pre,{children:(0,a.jsx)(n.code,{className:"language-bash",children:"kubectl uncordon <nombre_nodo>\n"})}),"\n",(0,a.jsx)(n.p,{children:"Se puede verificar el estado con el comando:"}),"\n",(0,a.jsx)(n.pre,{children:(0,a.jsx)(n.code,{className:"language-bash",children:"kubectl get nodes\n"})})]})}function u(e={}){const{wrapper:n}={...(0,r.M)(),...e.components};return n?(0,a.jsx)(n,{...e,children:(0,a.jsx)(i,{...e})}):i(e)}},4552:(e,n,s)=>{s.d(n,{I:()=>c,M:()=>l});var a=s(11504);const r={},t=a.createContext(r);function l(e){const n=a.useContext(t);return a.useMemo((function(){return"function"==typeof e?e(n):{...n,...e}}),[n,e])}function c(e){let n;return n=e.disableParentContext?"function"==typeof e.components?e.components(r):e.components||r:l(e.components),a.createElement(t.Provider,{value:n},e.children)}}}]);