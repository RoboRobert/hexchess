var Ot=Object.defineProperty;var Nt=(s,e,t)=>e in s?Ot(s,e,{enumerable:!0,configurable:!0,writable:!0,value:t}):s[e]=t;var H=(s,e,t)=>Nt(s,typeof e!="symbol"?e+"":e,t);import{s as me,n as fe,a as St,u as yt,g as Lt,b as Bt,r as je,o as Ht,e as bt,x as Je,k as Ze}from"../chunks/scheduler.BeaK0CkN.js";import{S as be,i as xe,y as $e,z as de,a as Z,d as O,o as L,p as R,g as F,h as X,e as te,c as ne,A as ie,k as p,l as w,u as C,v as A,w as I,x as M,m as Q,t as xt,b as qt,j as kt,q as ue,n as ge,s as qe,f as ke,B as Le,C as Ne,D as Pe,E as Re,F as De}from"../chunks/index.Daf1Fza9.js";import{w as Ke}from"../chunks/index.BIw2-lZ9.js";function ae(s){return(s==null?void 0:s.length)!==void 0?s:Array.from(s)}class Wt{constructor(e,t,n,r){this.q=e,this.r=t,this.size=n,this.color=r}}class ve{constructor(e,t){this.x=e,this.y=t}}const T=class T{constructor(e,t,n){H(this,"q");H(this,"r");H(this,"s");if(this.q=e,this.r=t,this.s=-e-t,Math.round(e+t+this.s)!==0)throw"q + r + s must be 0"}inRadius(e){return Math.abs(this.q)+Math.abs(this.r)+Math.abs(this.s)<=2*e}add(e){return new T(this.q+e.q,this.r+e.r,this.s+e.s)}subtract(e){return new T(this.q-e.q,this.r-e.r,this.s-e.s)}scale(e){return new T(this.q*e,this.r*e,this.s*e)}rotateLeft(){return new T(-this.s,-this.q,-this.r)}rotateRight(){return new T(-this.r,-this.s,-this.q)}static direction(e){return T.directions[e]}neighbor(e){return this.add(T.direction(e))}diagonalNeighbor(e){return this.add(T.diagonals[e])}knightNeighbor(e){return this.add(T.knightMoves[e])}len(){return(Math.abs(this.q)+Math.abs(this.r)+Math.abs(this.s))/2}distance(e){return this.subtract(e).len()}round(){var e=Math.round(this.q),t=Math.round(this.r),n=Math.round(this.s),r=Math.abs(e-this.q),i=Math.abs(t-this.r),o=Math.abs(n-this.s);return r>i&&r>o?e=-t-n:i>o?t=-e-n:n=-e-t,new T(e,t,n)}lerp(e,t){return new T(this.q*(1-t)+e.q*t,this.r*(1-t)+e.r*t,this.s*(1-t)+e.s*t)}linedraw(e){for(var t=this.distance(e),n=new T(this.q+1e-6,this.r+1e-6,this.s-2e-6),r=new T(e.q+1e-6,e.r+1e-6,e.s-2e-6),i=[],o=1/Math.max(t,1),h=0;h<=t;h++)i.push(n.lerp(r,o*h).round());return i}};H(T,"directions",[new T(1,0,-1),new T(1,-1,0),new T(0,-1,1),new T(-1,0,1),new T(-1,1,0),new T(0,1,-1)]),H(T,"diagonals",[new T(2,-1,-1),new T(1,-2,1),new T(-1,-1,2),new T(-2,1,1),new T(-1,2,-1),new T(1,1,-2)]),H(T,"knightMoves",[new T(2,1),new T(1,2),new T(-1,3),new T(-2,3),new T(-3,2),new T(-3,1),new T(-2,-1),new T(-1,-2),new T(1,-3),new T(2,-3),new T(3,-2),new T(3,-1)]);let oe=T;class Fe{constructor(e,t,n,r,i,o,h,$,k){this.f0=e,this.f1=t,this.f2=n,this.f3=r,this.b0=i,this.b1=o,this.b2=h,this.b3=$,this.start_angle=k}}class Se{constructor(e,t,n){this.orientation=e,this.size=t,this.origin=n}hexToPixel(e){var t=this.orientation,n=this.size,r=this.origin,i=(t.f0*e.q+t.f1*e.r)*n.x,o=(t.f2*e.q+t.f3*e.r)*n.y;return new ve(i+r.x,o+r.y)}pixelToHex(e){var t=this.orientation,n=this.size,r=this.origin,i=new ve((e.x-r.x)/n.x,(e.y-r.y)/n.y),o=t.b0*i.x+t.b1*i.y,h=t.b2*i.x+t.b3*i.y;return new oe(o,h,-o-h)}hexCornerOffset(e){var t=this.orientation,n=this.size,r=2*Math.PI*(t.start_angle-e)/6;return new ve(n.x*Math.cos(r),n.y*Math.sin(r))}polygonCorners(e){for(var t=[],n=this.hexToPixel(e),r=0;r<6;r++){var i=this.hexCornerOffset(r);t.push(new ve(n.x+i.x,n.y+i.y))}return t}}H(Se,"POINTY",new Fe(Math.sqrt(3),Math.sqrt(3)/2,0,3/2,Math.sqrt(3)/3,-1/3,0,2/3,.5)),H(Se,"FLAT",new Fe(3/2,0,Math.sqrt(3)/2,Math.sqrt(3),2/3,0,-1/3,Math.sqrt(3)/3,0)),H(Se,"FLIPPED",new Fe(-3/2,0,-Math.sqrt(3)/2,-Math.sqrt(3),-2/3,0,1/3,-Math.sqrt(3)/3,0));var We=(s=>(s[s.WOOD=0]="WOOD",s[s.GRAYSCALE=1]="GRAYSCALE",s))(We||{});class et{constructor(e,t){H(this,"colorArray",[["#d18b47","#e8ab6f","#ffce9e"],["#9a9a9a","#cdcdcd","#ffffff"]]);if(this.currentIndex=e,this.theme=t,e>2||e<0)throw"color picker must be within range [0,2]"}next(){let e=this.colorArray[this.theme][this.currentIndex];return this.currentIndex++,this.currentIndex>2&&(this.currentIndex=0),e}previous(){let e=this.colorArray[this.theme][this.currentIndex];return this.currentIndex--,this.currentIndex<0&&(this.currentIndex=2),e}}class Ct{constructor(e,t,n){H(this,"currentColor");H(this,"running");H(this,"stalemate");H(this,"selectedPiece");H(this,"checkmate");this.running=e,this.currentColor=t,this.stalemate=n}}var y=(s=>(s[s.WHITE_PAWN=0]="WHITE_PAWN",s[s.BLACK_PAWN=1]="BLACK_PAWN",s[s.WHITE_ROOK=2]="WHITE_ROOK",s[s.BLACK_ROOK=3]="BLACK_ROOK",s[s.WHITE_KNIGHT=4]="WHITE_KNIGHT",s[s.BLACK_KNIGHT=5]="BLACK_KNIGHT",s[s.WHITE_BISHOP=6]="WHITE_BISHOP",s[s.BLACK_BISHOP=7]="BLACK_BISHOP",s[s.WHITE_QUEEN=8]="WHITE_QUEEN",s[s.BLACK_QUEEN=9]="BLACK_QUEEN",s[s.WHITE_KING=10]="WHITE_KING",s[s.BLACK_KING=11]="BLACK_KING",s))(y||{});const Ue=[[0,0,"svgs/Chess_plt45.svg"],[1,0,"svgs/Chess_pdt45.svg"],[0,1,"svgs/Chess_rlt45.svg"],[1,1,"svgs/Chess_rdt45.svg"],[0,3,"svgs/Chess_nlt45.svg"],[1,3,"svgs/Chess_ndt45.svg"],[0,2,"svgs/Chess_blt45.svg"],[1,2,"svgs/Chess_bdt45.svg"],[0,4,"svgs/Chess_qlt45.svg"],[1,4,"svgs/Chess_qdt45.svg"],[0,5,"svgs/Chess_klt45.svg"],[1,5,"svgs/Chess_kdt45.svg"]];class d{constructor(e,t){H(this,"enumNumber");H(this,"pieceType");H(this,"pieceImage");H(this,"hex");H(this,"color");H(this,"enPassantable");H(this,"firstMove");H(this,"boardMeta",Ce);this.enumNumber=t,this.color=Ue[t][0],this.pieceType=Ue[t][1],this.pieceImage=Ue[t][2],this.enPassantable=!1,this.firstMove=!0,this.hex=new oe(e[0],e[1]),_e.subscribe(n=>{this.boardMeta=n})}static equals(e,t){return e.q===t.q&&e.r===t.r}static cloneArray(e){var t=[];return e.forEach(n=>{t.push(new d([n.hex.q,n.hex.r],n.enumNumber))}),t}static colorToEnum(e){return e.toLowerCase()=="white"?0:1}static enumToColor(e){return e==0?"WHITE":"BLACK"}getEnemyColor(){return this.color==0?1:0}movePiece(e){let t=[];Oe.subscribe(h=>{t=h});let n=this.getLegalMoves(!1,t).find(h=>d.equals(h.to,e));if(n==null)return!1;t=t.map(h=>(h.enPassantable=!1,h)),this.pieceType==0&&this.hex.distance(n.to)>1&&(this.enPassantable=!0),t=t.filter(h=>!d.equals(h.hex,n.attacking)),this.firstMove=!1,this.hex=n.to;const r=this.getPromotion();r&&(this.pieceImage=r.pieceImage,this.pieceType=r.pieceType,this.enumNumber=r.enumNumber),Oe.set(t);let i=this.getEnemyColor(),o=new Ct(!0,d.enumToColor(i),!1);return d.getAllLegalMoves(i).length==0&&(o.running=!1,d.inCheck(i)?o.checkmate=[d.enumToColor(this.color),d.enumToColor(i)]:o.stalemate=!0),Ye.set(o),!0}getLegalMoves(e,t){let n=[];if(t?n=t:Oe.subscribe(o=>{n=o}),!e){let o=At;if(Ye.subscribe(h=>o=h),!o.running||this.color!=d.colorToEnum(o.currentColor))return[]}let r=[];return this.getMoves(n).forEach(o=>{let h=d.cloneArray(n);d.testMove(o,h)&&r.push(o)}),r}static testMove(e,t){let n=t.find(i=>d.equals(i.hex,e.from)),r=[];return t.forEach(i=>{d.equals(i.hex,e.attacking)||r.push(i)}),n.hex=e.to,!d.inCheck(n.color,r)}static inCheck(e,t){let n=[];t?n=t:Oe.subscribe(o=>{n=o});let r=[];n.forEach(o=>{o.color!=e&&(r=r.concat(o.getMoves(n)))});let i=r.map(o=>o.attacking);return!!n.find(o=>o.color==e&&o.pieceType==5&&i.find(h=>d.equals(h,o.hex)))}static getAllLegalMoves(e,t){let n=[];t?n=t:Oe.subscribe(i=>{n=i});let r=[];return n.forEach(i=>{i.color===e&&(r=r.concat(i.getLegalMoves(!0)))}),r}getMoves(e){let t=[];switch(this.pieceType){case 4:{t=t.concat(this.diagonalMoves(this.boardMeta.radius,e),this.adjacentMoves(e),this.directionalMoves(e));break}case 5:{t=t.concat(this.diagonalMoves(1,e),this.adjacentMoves(e));break}case 2:{t=t.concat(this.diagonalMoves(this.boardMeta.radius,e));break}case 1:{t=t.concat(this.directionalMoves(e));break}case 3:{t=t.concat(this.knightMoves(e));break}case 0:{t=t.concat(this.pawnMoves(e));break}}return t}static pieceOn(e,t){let n=[];return t?n=t:Oe.subscribe(r=>{n=r}),n.find(r=>d.equals(r.hex,e))}adjacentMoves(e){let t=[];for(let n=0;n<6;n++){let r=this.hex.neighbor(n),i=d.pieceOn(r,e);r.inRadius(this.boardMeta.radius)&&(i===void 0||i.color!==this.color)&&t.push(new ee(this.hex,r,r))}return t}diagonalMoves(e,t){let n=[];for(let r=0;r<6;r++){let i=this.hex.diagonalNeighbor(r);for(let o=0;o<e&&i.inRadius(this.boardMeta.radius);o++){let h=d.pieceOn(i,t);if(h){h.color!==this.color&&n.push(new ee(this.hex,i,i));break}n.push(new ee(this.hex,i,i)),i=i.diagonalNeighbor(r)}}return n}directionalMoves(e){let t=[];for(let n=0;n<6;n++){let r=this.hex.neighbor(n);for(;r.inRadius(this.boardMeta.radius);){let i=d.pieceOn(r,e);if(i){i.color!==this.color&&t.push(new ee(this.hex,r,r));break}t.push(new ee(this.hex,r,r)),r=r.neighbor(n)}}return t}knightMoves(e){let t=[];for(let n=0;n<12;n++){let r=this.hex.knightNeighbor(n),i=d.pieceOn(r,e);r.inRadius(this.boardMeta.radius)&&(i===void 0||i.color!==this.color)&&t.push(new ee(this.hex,r,r))}return t}pawnMoves(e){var o,h,$,k,v,g,B,a;let t=[],n=[],r=[],i=1;switch(this.firstMove==!0&&(i=2),this.color){case 0:{let _=this.hex;for(let N=0;N<i&&(_=_.neighbor(2),!d.pieceOn(_,e));N++)t.push(new ee(this.hex,_,_));n.push(new ee(this.hex,this.hex.neighbor(1),this.hex.neighbor(1)),new ee(this.hex,this.hex.neighbor(3),this.hex.neighbor(3))),((o=d.pieceOn(this.hex.neighbor(0),e))==null?void 0:o.color)!=this.color&&((h=d.pieceOn(this.hex.neighbor(0),e))!=null&&h.enPassantable)&&r.push(new ee(this.hex,this.hex.neighbor(1),this.hex.neighbor(0))),(($=d.pieceOn(this.hex.neighbor(4),e))==null?void 0:$.color)!=this.color&&((k=d.pieceOn(this.hex.neighbor(4),e))!=null&&k.enPassantable)&&r.push(new ee(this.hex,this.hex.neighbor(3),this.hex.neighbor(4)));break}case 1:{let _=this.hex;for(let N=0;N<i&&(_=_.neighbor(5),!d.pieceOn(_,e));N++)t.push(new ee(this.hex,_,_));n.push(new ee(this.hex,this.hex.neighbor(0),this.hex.neighbor(0)),new ee(this.hex,this.hex.neighbor(4),this.hex.neighbor(4))),((v=d.pieceOn(this.hex.neighbor(1),e))==null?void 0:v.color)!=this.color&&((g=d.pieceOn(this.hex.neighbor(1),e))!=null&&g.enPassantable)&&r.push(new ee(this.hex,this.hex.neighbor(0),this.hex.neighbor(1))),((B=d.pieceOn(this.hex.neighbor(3),e))==null?void 0:B.color)!=this.color&&((a=d.pieceOn(this.hex.neighbor(3),e))!=null&&a.enPassantable)&&r.push(new ee(this.hex,this.hex.neighbor(4),this.hex.neighbor(3)));break}}return t.filter(_=>_.to.inRadius(this.boardMeta.radius)&&d.pieceOn(_.to,e)===void 0).concat(n.filter(_=>{var N;return _.to.inRadius(this.boardMeta.radius)&&d.pieceOn(_.to,e)!=null&&((N=d.pieceOn(_.to,e))==null?void 0:N.color)!=this.color})).concat(r)}getPromotion(){if(this.pieceType==0){if(this.color==0&&(this.hex.q+this.hex.r==-5||this.hex.r==-5))return new d([this.hex.q,this.hex.r],8);if(this.color==1&&(this.hex.q+this.hex.r==5||this.hex.r==5))return new d([this.hex.q,this.hex.r],9)}}}class ee{constructor(e,t,n){H(this,"from");H(this,"to");H(this,"attacking");this.from=e,this.to=t,this.attacking=n}}var He=(s=>(s[s.DEFAULT=0]="DEFAULT",s[s.FLIPPED=1]="FLIPPED",s))(He||{});class Kt{constructor(e,t,n,r){H(this,"layout");H(this,"theme");H(this,"radius");H(this,"hexSize");this.theme=t,this.radius=n,this.hexSize=r,this.layout=this.getLayout(e)}getLayout(e){return e==1?new Se(Se.FLIPPED,new ve(this.hexSize,this.hexSize),new ve(0,0)):new Se(Se.FLAT,new ve(this.hexSize,this.hexSize),new ve(0,0))}}var Be=(s=>(s.CURRENT="#57ff00",s.SELECTED="#ffb400",s.LEGAL="#525252",s.ATTACK="#ff0000",s.PREVIOUS="#fff700",s))(Be||{});class Qe{constructor(e,t,n,r,i){H(this,"current");H(this,"selections");H(this,"legal");H(this,"attacks");H(this,"previous");this.current=e,this.selections=t,this.legal=n,this.attacks=r,this.previous=i}}const Ce=new Kt(He.DEFAULT,We.GRAYSCALE,5,10),_e=Ke(Ce),At=new Ct(!0,"WHITE",!1),Ye=Ke(At);let zt;const ye=Ke(zt);let Pt=[new d([0,-5],y.BLACK_BISHOP),new d([0,-4],y.BLACK_BISHOP),new d([0,-3],y.BLACK_BISHOP),new d([0,5],y.WHITE_BISHOP),new d([0,4],y.WHITE_BISHOP),new d([0,3],y.WHITE_BISHOP),new d([-4,-1],y.BLACK_PAWN),new d([-3,-1],y.BLACK_PAWN),new d([-2,-1],y.BLACK_PAWN),new d([-1,-1],y.BLACK_PAWN),new d([0,-1],y.BLACK_PAWN),new d([1,-2],y.BLACK_PAWN),new d([2,-3],y.BLACK_PAWN),new d([3,-4],y.BLACK_PAWN),new d([4,-5],y.BLACK_PAWN),new d([-4,5],y.WHITE_PAWN),new d([-3,4],y.WHITE_PAWN),new d([-2,3],y.WHITE_PAWN),new d([-1,2],y.WHITE_PAWN),new d([0,1],y.WHITE_PAWN),new d([1,1],y.WHITE_PAWN),new d([2,1],y.WHITE_PAWN),new d([3,1],y.WHITE_PAWN),new d([4,1],y.WHITE_PAWN),new d([-3,-2],y.BLACK_ROOK),new d([3,-5],y.BLACK_ROOK),new d([-3,5],y.WHITE_ROOK),new d([3,2],y.WHITE_ROOK),new d([-2,-3],y.BLACK_KNIGHT),new d([2,-5],y.BLACK_KNIGHT),new d([-2,5],y.WHITE_KNIGHT),new d([2,3],y.WHITE_KNIGHT),new d([-1,-4],y.BLACK_QUEEN),new d([-1,5],y.WHITE_QUEEN),new d([1,-5],y.BLACK_KING),new d([1,4],y.WHITE_KING)];const Oe=Ke(Pt),Ve=Ke(new Qe(void 0,[],[],[],[]));function Rt(s){let e,t;return{c(){e=$e("g"),t=$e("polygon"),this.h()},l(n){e=de(n,"g",{transform:!0});var r=Z(e);t=de(r,"polygon",{class:!0,points:!0,style:!0,opacity:!0}),Z(t).forEach(O),r.forEach(O),this.h()},h(){L(t,"class","hexagon"),L(t,"points",s[3]),R(t,"fill",s[0]),R(t,"z-index","50"),R(t,"stroke","black"),R(t,"stroke-width",s[2]/25+"px"),L(t,"opacity","0.3"),L(e,"transform","translate("+s[1].x+", "+s[1].y+")")},m(n,r){F(n,e,r),X(e,t)},p(n,[r]){r&1&&R(t,"fill",n[0])},i:fe,o:fe,d(n){n&&O(e)}}}function Gt(s){var e="";return s.forEach(t=>{e=e.concat(`${t.x},${t.y} `)}),e}function Ft(s,e,t){let{q:n}=e,{r}=e,{color:i}=e,o=Ce;_e.subscribe(a=>{o=a});const h=new oe(0,0),$=o.layout.polygonCorners(h),k=new oe(n,r),v=o.layout.hexToPixel(k),g=o.hexSize,B=Gt($);return s.$$set=a=>{"q"in a&&t(4,n=a.q),"r"in a&&t(5,r=a.r),"color"in a&&t(0,i=a.color)},[i,v,g,B,n,r]}class It extends be{constructor(e){super(),xe(this,e,Ft,Rt,me,{q:4,r:5,color:0})}}function Ut(s){let e,t,n,r;const i=s[8].default,o=St(i,s,s[7],null);return{c(){e=te("div"),o&&o.c(),this.h()},l(h){e=ne(h,"DIV",{class:!0});var $=Z(e);o&&o.l($),$.forEach(O),this.h()},h(){L(e,"class","draggable svelte-kwdgvp")},m(h,$){F(h,e,$),o&&o.m(e,null),s[9](e),t=!0,n||(r=[ie(window,"pointermove",s[4]),ie(window,"pointerup",s[1]),ie(window,"touchend",s[1]),ie(window,"touchmove",s[5]),ie(window,"pointerdown",s[3]),ie(e,"pointerdown",s[2]),ie(e,"contextmenu",Yt)],n=!0)},p(h,[$]){o&&o.p&&(!t||$&128)&&yt(o,i,h,h[7],t?Bt(i,h[7],$,null):Lt(h[7]),null)},i(h){t||(p(o,h),t=!0)},o(h){w(o,h),t=!1},d(h){h&&O(e),o&&o.d(h),s[9](null),n=!1,je(r)}}}const Yt=function(s){s.preventDefault()};function Vt(s,e,t){let{$$slots:n={},$$scope:r}=e,{currentPiece:i}=e,o;ye.subscribe(E=>{o=E}),_e.subscribe(E=>{});let h,$,k=0,v=0,g=0,B=0,a,_=[],N,b=[],W=[],x=[],J=[];Ve.subscribe(E=>J=E.previous);let c=!1;Ht(()=>{u()});function u(){var G,V;g=a.getBoundingClientRect().width,B=a.getBoundingClientRect().height;let E=document.getElementById(`${i.hex.q},${i.hex.r}`).getBoundingClientRect();k=(G=a.parentElement)==null?void 0:G.getBoundingClientRect().left,v=(V=a.parentElement)==null?void 0:V.getBoundingClientRect().top,a.setAttribute("style",`left:${E.left+E.width/2-g/2-k}px; top:${E.top+E.height/2-B/2-v}px;`)}function l(E){if(t(0,a.style.cursor="",a),t(0,a.style.zIndex="",a),!!c){if(c=!1,x.length>0){let G=i.movePiece(x[0]);G?(o&&ye.set(void 0),W=[],b=[],J=[N,x[0]],N=void 0,u()):G||(o&&d.equals(o.hex,x[0])?(ye.set(void 0),N=void 0,W=[],b=[]):(!o||o!=i)&&ye.set(i))}return t(0,a.style.left=h,a),t(0,a.style.top=$,a),x=[],ce(),!0}}function S(E){var V,D;c=!0,t(0,a.style.zIndex="100",a),t(0,a.style.cursor="grabbing",a),h=a.style.left,$=a.style.top,k=(V=a.parentElement)==null?void 0:V.getBoundingClientRect().left,v=(D=a.parentElement)==null?void 0:D.getBoundingClientRect().top;let G=i.getLegalMoves(!1);N=i.hex,W=G.filter(j=>d.pieceOn(j.attacking)).map(j=>j.to),b=G.filter(j=>!d.pieceOn(j.attacking)).map(j=>j.to),he(E.clientX,E.clientY)}function q(E){let G=pe(E.clientX,E.clientY);!G||c||o==i&&(i.movePiece(G)?(o&&ye.set(void 0),W=[],b=[],J=[N,G],N=void 0,u()):(ye.set(void 0),N=void 0,W=[],b=[]),ce())}function z(E){he(E.clientX,E.clientY)}function re(E){return he(E.touches[0].clientX,E.touches[0].clientY),!0}function he(E,G){if(!c)return;let V=E-g/2-k,D=G-B/2-v;t(0,a.style.left=`${V}px`,a),t(0,a.style.top=`${D}px`,a);let j=pe(E,G);j?x[0]=j:x=[],ce()}function pe(E,G){_=document.elementsFromPoint(E,G);let V=_.find(D=>D.classList.contains("droppable"));if(V){let D=parseInt(V.getAttribute("data-q")),j=parseInt(V.getAttribute("data-r"));return new oe(D,j)}}function ce(){Ve.set(new Qe(N,x,b,W,J))}function we(E){bt[E?"unshift":"push"](()=>{a=E,t(0,a)})}return s.$$set=E=>{"currentPiece"in E&&t(6,i=E.currentPiece),"$$scope"in E&&t(7,r=E.$$scope)},[a,l,S,q,z,re,i,r,n,we]}class jt extends be{constructor(e){super(),xe(this,e,Vt,Ut,me,{currentPiece:6})}}function Qt(s){let e,t;return{c(){e=te("img"),this.h()},l(n){e=ne(n,"IMG",{style:!0,class:!0,draggable:!0,src:!0}),this.h()},h(){R(e,"z-index","100"),R(e,"width",s[1]*1.3+"px"),R(e,"height",s[1]*1.3+"px"),L(e,"class","piece"),L(e,"draggable","false"),Je(e.src,t=s[0].pieceImage)||L(e,"src",t)},m(n,r){F(n,e,r)},p(n,r){r&1&&!Je(e.src,t=n[0].pieceImage)&&L(e,"src",t)},d(n){n&&O(e)}}}function Xt(s){let e,t;return e=new jt({props:{currentPiece:s[0],$$slots:{default:[Qt]},$$scope:{ctx:s}}}),{c(){C(e.$$.fragment)},l(n){A(e.$$.fragment,n)},m(n,r){I(e,n,r),t=!0},p(n,[r]){const i={};r&1&&(i.currentPiece=n[0]),r&9&&(i.$$scope={dirty:r,ctx:n}),e.$set(i)},i(n){t||(p(e.$$.fragment,n),t=!0)},o(n){w(e.$$.fragment,n),t=!1},d(n){M(e,n)}}}function Jt(s,e,t){let{piece:n}=e,r=Ce;_e.subscribe(o=>{r=o});const i=r.layout.size.x;return s.$$set=o=>{"piece"in o&&t(0,n=o.piece)},[n,i]}class Zt extends be{constructor(e){super(),xe(this,e,Jt,Xt,me,{piece:0})}}function tt(s){let e;return{c(){e=$e("circle"),this.h()},l(t){e=de(t,"circle",{r:!0,style:!0}),Z(e).forEach(O),this.h()},h(){L(e,"r",s[0]),R(e,"fill",s[1]),R(e,"z-index","50"),R(e,"stroke",s[1]),R(e,"stroke-width",s[0]/10)},m(t,n){F(t,e,n)},p(t,n){n&1&&L(e,"r",t[0]),n&2&&R(e,"fill",t[1]),n&2&&R(e,"stroke",t[1]),n&1&&R(e,"stroke-width",t[0]/10)},d(t){t&&O(e)}}}function nt(s){let e;return{c(){e=$e("circle"),this.h()},l(t){e=de(t,"circle",{r:!0,style:!0}),Z(e).forEach(O),this.h()},h(){L(e,"r",s[0]),R(e,"fill","none"),R(e,"z-index","50"),R(e,"stroke",s[1]),R(e,"stroke-width",s[0]/10+"px")},m(t,n){F(t,e,n)},p(t,n){n&1&&L(e,"r",t[0]),n&2&&R(e,"stroke",t[1]),n&1&&R(e,"stroke-width",t[0]/10+"px")},d(t){t&&O(e)}}}function Dt(s){let e,t,n=s[2]&&tt(s),r=!s[2]&&nt(s);return{c(){e=$e("g"),n&&n.c(),t=Q(),r&&r.c(),this.h()},l(i){e=de(i,"g",{transform:!0});var o=Z(e);n&&n.l(o),t=Q(),r&&r.l(o),o.forEach(O),this.h()},h(){L(e,"transform","translate("+s[3].x+", "+s[3].y+")")},m(i,o){F(i,e,o),n&&n.m(e,null),X(e,t),r&&r.m(e,null)},p(i,[o]){i[2]?n?n.p(i,o):(n=tt(i),n.c(),n.m(e,t)):n&&(n.d(1),n=null),i[2]?r&&(r.d(1),r=null):r?r.p(i,o):(r=nt(i),r.c(),r.m(e,null))},i:fe,o:fe,d(i){i&&O(e),n&&n.d(),r&&r.d()}}}function en(s,e,t){let{q:n}=e,{r}=e,{size:i}=e,{color:o}=e,{fill:h}=e,$=Ce;_e.subscribe(g=>{$=g}),new oe(0,0);const k=new oe(n,r),v=$.layout.hexToPixel(k);return s.$$set=g=>{"q"in g&&t(4,n=g.q),"r"in g&&t(5,r=g.r),"size"in g&&t(0,i=g.size),"color"in g&&t(1,o=g.color),"fill"in g&&t(2,h=g.fill)},[i,o,h,v,n,r]}class Xe extends be{constructor(e){super(),xe(this,e,en,Dt,me,{q:4,r:5,size:0,color:1,fill:2})}}function tn(s){let e,t,n;return{c(){e=$e("g"),t=$e("text"),n=xt(s[0]),this.h()},l(r){e=de(r,"g",{style:!0,transform:!0});var i=Z(e);t=de(i,"text",{x:!0,y:!0,"stroke-width":!0,class:!0});var o=Z(t);n=qt(o,s[0]),o.forEach(O),i.forEach(O),this.h()},h(){L(t,"x",-s[4]/3.3*s[2]-s[4]/4),L(t,"y",-(s[4]/3.3)*s[3]),L(t,"stroke-width",s[4]/50),L(t,"class","coordinate"),R(e,"font",s[4]/2+"px monospace"),L(e,"transform","translate("+s[1].x+", "+s[1].y+")")},m(r,i){F(r,e,i),X(e,t),X(t,n)},p(r,[i]){i&1&&kt(n,r[0])},i:fe,o:fe,d(r){r&&O(e)}}}function nn(s,e,t){let{q:n}=e,{r}=e,{text:i}=e,o=Ce;_e.subscribe(a=>{o=a});const h=new oe(n,r),$=o.layout.hexToPixel(h),k=Math.sqrt($.x*$.x+$.y*$.y),v=$.x/k,g=$.y/k,B=o.layout.size.x;return s.$$set=a=>{"q"in a&&t(5,n=a.q),"r"in a&&t(6,r=a.r),"text"in a&&t(0,i=a.text)},[i,$,v,g,B,n,r]}class K extends be{constructor(e){super(),xe(this,e,nn,tn,me,{q:5,r:6,text:0})}}function rn(s){let e,t,n,r,i;return{c(){e=$e("g"),t=$e("polygon"),this.h()},l(o){e=de(o,"g",{transform:!0});var h=Z(e);t=de(h,"polygon",{id:!0,"data-q":!0,"data-r":!0,class:!0,points:!0,style:!0}),Z(t).forEach(O),h.forEach(O),this.h()},h(){L(t,"id",n=s[0]+","+s[1]),L(t,"data-q",r=s[0]+","),L(t,"data-r",i=s[1]+","),L(t,"class","hexagon droppable"),L(t,"points",s[5]),R(t,"fill",s[2]),R(t,"stroke","black"),R(t,"stroke-width",s[4]/25+"px"),L(e,"transform","translate("+s[3].x+", "+s[3].y+")")},m(o,h){F(o,e,h),X(e,t)},p(o,[h]){h&3&&n!==(n=o[0]+","+o[1])&&L(t,"id",n),h&1&&r!==(r=o[0]+",")&&L(t,"data-q",r),h&2&&i!==(i=o[1]+",")&&L(t,"data-r",i),h&4&&R(t,"fill",o[2])},i:fe,o:fe,d(o){o&&O(e)}}}function sn(s){var e="";return s.forEach(t=>{e=e.concat(`${t.x},${t.y} `)}),e}function on(s,e,t){let{q:n}=e,{r}=e,{color:i}=e,o=Ce;_e.subscribe(a=>{o=a});const h=new oe(0,0),$=o.layout.polygonCorners(h),k=new oe(n,r),v=o.layout.hexToPixel(k),g=o.layout.size.x,B=sn($);return s.$$set=a=>{"q"in a&&t(0,n=a.q),"r"in a&&t(1,r=a.r),"color"in a&&t(2,i=a.color)},[n,r,i,v,g,B]}class ln extends be{constructor(e){super(),xe(this,e,on,rn,me,{q:0,r:1,color:2})}}function rt(s,e,t){const n=s.slice();return n[10]=e[t],n}function st(s,e,t){const n=s.slice();return n[13]=e[t],n}function it(s,e,t){const n=s.slice();return n[13]=e[t],n}function ot(s,e,t){const n=s.slice();return n[13]=e[t],n}function lt(s,e,t){const n=s.slice();return n[13]=e[t],n}function at(s,e,t){const n=s.slice();return n[22]=e[t].q,n[23]=e[t].r,n[24]=e[t].color,n}function ft(s){let e,t;return e=new ln({props:{q:s[22],r:s[23],color:s[24]}}),{c(){C(e.$$.fragment)},l(n){A(e.$$.fragment,n)},m(n,r){I(e,n,r),t=!0},p(n,r){const i={};r&2&&(i.q=n[22]),r&2&&(i.r=n[23]),r&2&&(i.color=n[24]),e.$set(i)},i(n){t||(p(e.$$.fragment,n),t=!0)},o(n){w(e.$$.fragment,n),t=!1},d(n){M(e,n)}}}function ht(s){let e,t;return e=new It({props:{q:s[13].q,r:s[13].r,color:Be.PREVIOUS}}),{c(){C(e.$$.fragment)},l(n){A(e.$$.fragment,n)},m(n,r){I(e,n,r),t=!0},p(n,r){const i={};r&4&&(i.q=n[13].q),r&4&&(i.r=n[13].r),e.$set(i)},i(n){t||(p(e.$$.fragment,n),t=!0)},o(n){w(e.$$.fragment,n),t=!1},d(n){M(e,n)}}}function ct(s){let e,t;return e=new Xe({props:{q:s[13].q,r:s[13].r,size:s[0].hexSize/5,color:Be.LEGAL,fill:!0}}),{c(){C(e.$$.fragment)},l(n){A(e.$$.fragment,n)},m(n,r){I(e,n,r),t=!0},p(n,r){const i={};r&4&&(i.q=n[13].q),r&4&&(i.r=n[13].r),r&1&&(i.size=n[0].hexSize/5),e.$set(i)},i(n){t||(p(e.$$.fragment,n),t=!0)},o(n){w(e.$$.fragment,n),t=!1},d(n){M(e,n)}}}function ut(s){let e,t;return e=new Xe({props:{q:s[13].q,r:s[13].r,size:s[0].hexSize/1.5,color:Be.ATTACK,fill:!1}}),{c(){C(e.$$.fragment)},l(n){A(e.$$.fragment,n)},m(n,r){I(e,n,r),t=!0},p(n,r){const i={};r&4&&(i.q=n[13].q),r&4&&(i.r=n[13].r),r&1&&(i.size=n[0].hexSize/1.5),e.$set(i)},i(n){t||(p(e.$$.fragment,n),t=!0)},o(n){w(e.$$.fragment,n),t=!1},d(n){M(e,n)}}}function gt(s){let e,t;return e=new It({props:{q:s[2].current.q,r:s[2].current.r,color:Be.CURRENT}}),{c(){C(e.$$.fragment)},l(n){A(e.$$.fragment,n)},m(n,r){I(e,n,r),t=!0},p(n,r){const i={};r&4&&(i.q=n[2].current.q),r&4&&(i.r=n[2].current.r),e.$set(i)},i(n){t||(p(e.$$.fragment,n),t=!0)},o(n){w(e.$$.fragment,n),t=!1},d(n){M(e,n)}}}function mt(s){let e,t;return e=new Xe({props:{q:s[13].q,r:s[13].r,size:s[0].hexSize/1.5,color:Be.SELECTED,fill:!1}}),{c(){C(e.$$.fragment)},l(n){A(e.$$.fragment,n)},m(n,r){I(e,n,r),t=!0},p(n,r){const i={};r&4&&(i.q=n[13].q),r&4&&(i.r=n[13].r),r&1&&(i.size=n[0].hexSize/1.5),e.$set(i)},i(n){t||(p(e.$$.fragment,n),t=!0)},o(n){w(e.$$.fragment,n),t=!1},d(n){M(e,n)}}}function pt(s){let e,t,n,r,i,o,h=ae(s[2].previous),$=[];for(let c=0;c<h.length;c+=1)$[c]=ht(lt(s,h,c));const k=c=>w($[c],1,1,()=>{$[c]=null});let v=ae(s[2].legal),g=[];for(let c=0;c<v.length;c+=1)g[c]=ct(ot(s,v,c));const B=c=>w(g[c],1,1,()=>{g[c]=null});let a=ae(s[2].attacks),_=[];for(let c=0;c<a.length;c+=1)_[c]=ut(it(s,a,c));const N=c=>w(_[c],1,1,()=>{_[c]=null});let b=s[2].current&&gt(s),W=ae(s[2].selections),x=[];for(let c=0;c<W.length;c+=1)x[c]=mt(st(s,W,c));const J=c=>w(x[c],1,1,()=>{x[c]=null});return{c(){for(let c=0;c<$.length;c+=1)$[c].c();e=Q();for(let c=0;c<g.length;c+=1)g[c].c();t=Q();for(let c=0;c<_.length;c+=1)_[c].c();n=Q(),b&&b.c(),r=Q();for(let c=0;c<x.length;c+=1)x[c].c();i=Q()},l(c){for(let u=0;u<$.length;u+=1)$[u].l(c);e=Q();for(let u=0;u<g.length;u+=1)g[u].l(c);t=Q();for(let u=0;u<_.length;u+=1)_[u].l(c);n=Q(),b&&b.l(c),r=Q();for(let u=0;u<x.length;u+=1)x[u].l(c);i=Q()},m(c,u){for(let l=0;l<$.length;l+=1)$[l]&&$[l].m(c,u);F(c,e,u);for(let l=0;l<g.length;l+=1)g[l]&&g[l].m(c,u);F(c,t,u);for(let l=0;l<_.length;l+=1)_[l]&&_[l].m(c,u);F(c,n,u),b&&b.m(c,u),F(c,r,u);for(let l=0;l<x.length;l+=1)x[l]&&x[l].m(c,u);F(c,i,u),o=!0},p(c,u){if(u&4){h=ae(c[2].previous);let l;for(l=0;l<h.length;l+=1){const S=lt(c,h,l);$[l]?($[l].p(S,u),p($[l],1)):($[l]=ht(S),$[l].c(),p($[l],1),$[l].m(e.parentNode,e))}for(ue(),l=h.length;l<$.length;l+=1)k(l);ge()}if(u&5){v=ae(c[2].legal);let l;for(l=0;l<v.length;l+=1){const S=ot(c,v,l);g[l]?(g[l].p(S,u),p(g[l],1)):(g[l]=ct(S),g[l].c(),p(g[l],1),g[l].m(t.parentNode,t))}for(ue(),l=v.length;l<g.length;l+=1)B(l);ge()}if(u&5){a=ae(c[2].attacks);let l;for(l=0;l<a.length;l+=1){const S=it(c,a,l);_[l]?(_[l].p(S,u),p(_[l],1)):(_[l]=ut(S),_[l].c(),p(_[l],1),_[l].m(n.parentNode,n))}for(ue(),l=a.length;l<_.length;l+=1)N(l);ge()}if(c[2].current?b?(b.p(c,u),u&4&&p(b,1)):(b=gt(c),b.c(),p(b,1),b.m(r.parentNode,r)):b&&(ue(),w(b,1,1,()=>{b=null}),ge()),u&5){W=ae(c[2].selections);let l;for(l=0;l<W.length;l+=1){const S=st(c,W,l);x[l]?(x[l].p(S,u),p(x[l],1)):(x[l]=mt(S),x[l].c(),p(x[l],1),x[l].m(i.parentNode,i))}for(ue(),l=W.length;l<x.length;l+=1)J(l);ge()}},i(c){if(!o){for(let u=0;u<h.length;u+=1)p($[u]);for(let u=0;u<v.length;u+=1)p(g[u]);for(let u=0;u<a.length;u+=1)p(_[u]);p(b);for(let u=0;u<W.length;u+=1)p(x[u]);o=!0}},o(c){$=$.filter(Boolean);for(let u=0;u<$.length;u+=1)w($[u]);g=g.filter(Boolean);for(let u=0;u<g.length;u+=1)w(g[u]);_=_.filter(Boolean);for(let u=0;u<_.length;u+=1)w(_[u]);w(b),x=x.filter(Boolean);for(let u=0;u<x.length;u+=1)w(x[u]);o=!1},d(c){c&&(O(e),O(t),O(n),O(r),O(i)),Le($,c),Le(g,c),Le(_,c),b&&b.d(c),Le(x,c)}}}function $t(s){let e,t;return e=new Zt({props:{piece:s[10]}}),{c(){C(e.$$.fragment)},l(n){A(e.$$.fragment,n)},m(n,r){I(e,n,r),t=!0},p(n,r){const i={};r&8&&(i.piece=n[10]),e.$set(i)},i(n){t||(p(e.$$.fragment,n),t=!0)},o(n){w(e.$$.fragment,n),t=!1},d(n){M(e,n)}}}function dt(s){let e,t,n,r=s[2],i,o,h,$,k,v,g,B,a,_,N,b,W,x,J,c,u,l,S,q,z,re,he,pe,ce,we,E,G,V,D,j,Ae,Ie,Me,Ge,ze,Ee=ae(s[1]),U=[];for(let f=0;f<Ee.length;f+=1)U[f]=ft(at(s,Ee,f));const Et=f=>w(U[f],1,1,()=>{U[f]=null});let le=pt(s);o=new K({props:{q:-5,r:6,text:"a"}}),h=new K({props:{q:-4,r:6,text:"b"}}),$=new K({props:{q:-3,r:6,text:"c"}}),k=new K({props:{q:-2,r:6,text:"d"}}),v=new K({props:{q:-1,r:6,text:"e"}}),g=new K({props:{q:0,r:6,text:"f"}}),B=new K({props:{q:1,r:5,text:"g"}}),a=new K({props:{q:2,r:4,text:"h"}}),_=new K({props:{q:3,r:3,text:"i"}}),N=new K({props:{q:4,r:2,text:"k"}}),b=new K({props:{q:5,r:1,text:"l"}}),W=new K({props:{q:-6,r:5,text:"1"}}),x=new K({props:{q:-6,r:4,text:"2"}}),J=new K({props:{q:-6,r:3,text:"3"}}),c=new K({props:{q:-6,r:2,text:"4"}}),u=new K({props:{q:-6,r:1,text:"5"}}),l=new K({props:{q:-6,r:0,text:"6"}}),S=new K({props:{q:-5,r:-1,text:"7"}}),q=new K({props:{q:-4,r:-2,text:"8"}}),z=new K({props:{q:-3,r:-3,text:"9"}}),re=new K({props:{q:-2,r:-4,text:"10"}}),he=new K({props:{q:-1,r:-5,text:"11"}}),pe=new K({props:{q:6,r:-1,text:"1"}}),ce=new K({props:{q:6,r:-2,text:"2"}}),we=new K({props:{q:6,r:-3,text:"3"}}),E=new K({props:{q:6,r:-4,text:"4"}}),G=new K({props:{q:6,r:-5,text:"5"}}),V=new K({props:{q:6,r:-6,text:"6"}}),D=new K({props:{q:5,r:-6,text:"7"}}),j=new K({props:{q:4,r:-6,text:"8"}}),Ae=new K({props:{q:3,r:-6,text:"9"}}),Ie=new K({props:{q:2,r:-6,text:"10"}}),Me=new K({props:{q:1,r:-6,text:"11"}});let Te=ae(s[3]),Y=[];for(let f=0;f<Te.length;f+=1)Y[f]=$t(rt(s,Te,f));const Tt=f=>w(Y[f],1,1,()=>{Y[f]=null});return{c(){e=te("div"),t=$e("svg");for(let f=0;f<U.length;f+=1)U[f].c();n=Q(),le.c(),i=Q(),C(o.$$.fragment),C(h.$$.fragment),C($.$$.fragment),C(k.$$.fragment),C(v.$$.fragment),C(g.$$.fragment),C(B.$$.fragment),C(a.$$.fragment),C(_.$$.fragment),C(N.$$.fragment),C(b.$$.fragment),C(W.$$.fragment),C(x.$$.fragment),C(J.$$.fragment),C(c.$$.fragment),C(u.$$.fragment),C(l.$$.fragment),C(S.$$.fragment),C(q.$$.fragment),C(z.$$.fragment),C(re.$$.fragment),C(he.$$.fragment),C(pe.$$.fragment),C(ce.$$.fragment),C(we.$$.fragment),C(E.$$.fragment),C(G.$$.fragment),C(V.$$.fragment),C(D.$$.fragment),C(j.$$.fragment),C(Ae.$$.fragment),C(Ie.$$.fragment),C(Me.$$.fragment),Ge=qe();for(let f=0;f<Y.length;f+=1)Y[f].c();this.h()},l(f){e=ne(f,"DIV",{class:!0});var P=Z(e);t=de(P,"svg",{overflow:!0,viewBox:!0,width:!0,height:!0});var m=Z(t);for(let se=0;se<U.length;se+=1)U[se].l(m);n=Q(),le.l(m),i=Q(),A(o.$$.fragment,m),A(h.$$.fragment,m),A($.$$.fragment,m),A(k.$$.fragment,m),A(v.$$.fragment,m),A(g.$$.fragment,m),A(B.$$.fragment,m),A(a.$$.fragment,m),A(_.$$.fragment,m),A(N.$$.fragment,m),A(b.$$.fragment,m),A(W.$$.fragment,m),A(x.$$.fragment,m),A(J.$$.fragment,m),A(c.$$.fragment,m),A(u.$$.fragment,m),A(l.$$.fragment,m),A(S.$$.fragment,m),A(q.$$.fragment,m),A(z.$$.fragment,m),A(re.$$.fragment,m),A(he.$$.fragment,m),A(pe.$$.fragment,m),A(ce.$$.fragment,m),A(we.$$.fragment,m),A(E.$$.fragment,m),A(G.$$.fragment,m),A(V.$$.fragment,m),A(D.$$.fragment,m),A(j.$$.fragment,m),A(Ae.$$.fragment,m),A(Ie.$$.fragment,m),A(Me.$$.fragment,m),m.forEach(O),Ge=ke(P);for(let se=0;se<Y.length;se+=1)Y[se].l(P);P.forEach(O),this.h()},h(){L(t,"overflow","visible"),L(t,"viewBox",s[6]),L(t,"width",s[5].x),L(t,"height",s[5].y),L(e,"class","board svelte-1qr0g3m")},m(f,P){F(f,e,P),X(e,t);for(let m=0;m<U.length;m+=1)U[m]&&U[m].m(t,null);X(t,n),le.m(t,null),X(t,i),I(o,t,null),I(h,t,null),I($,t,null),I(k,t,null),I(v,t,null),I(g,t,null),I(B,t,null),I(a,t,null),I(_,t,null),I(N,t,null),I(b,t,null),I(W,t,null),I(x,t,null),I(J,t,null),I(c,t,null),I(u,t,null),I(l,t,null),I(S,t,null),I(q,t,null),I(z,t,null),I(re,t,null),I(he,t,null),I(pe,t,null),I(ce,t,null),I(we,t,null),I(E,t,null),I(G,t,null),I(V,t,null),I(D,t,null),I(j,t,null),I(Ae,t,null),I(Ie,t,null),I(Me,t,null),X(e,Ge);for(let m=0;m<Y.length;m+=1)Y[m]&&Y[m].m(e,null);s[7](e),ze=!0},p(f,P){if(P&2){Ee=ae(f[1]);let m;for(m=0;m<Ee.length;m+=1){const se=at(f,Ee,m);U[m]?(U[m].p(se,P),p(U[m],1)):(U[m]=ft(se),U[m].c(),p(U[m],1),U[m].m(t,n))}for(ue(),m=Ee.length;m<U.length;m+=1)Et(m);ge()}if(P&4&&me(r,r=f[2])?(ue(),w(le,1,1,fe),ge(),le=pt(f),le.c(),p(le,1),le.m(t,i)):le.p(f,P),P&8){Te=ae(f[3]);let m;for(m=0;m<Te.length;m+=1){const se=rt(f,Te,m);Y[m]?(Y[m].p(se,P),p(Y[m],1)):(Y[m]=$t(se),Y[m].c(),p(Y[m],1),Y[m].m(e,null))}for(ue(),m=Te.length;m<Y.length;m+=1)Tt(m);ge()}},i(f){if(!ze){for(let P=0;P<Ee.length;P+=1)p(U[P]);p(le),p(o.$$.fragment,f),p(h.$$.fragment,f),p($.$$.fragment,f),p(k.$$.fragment,f),p(v.$$.fragment,f),p(g.$$.fragment,f),p(B.$$.fragment,f),p(a.$$.fragment,f),p(_.$$.fragment,f),p(N.$$.fragment,f),p(b.$$.fragment,f),p(W.$$.fragment,f),p(x.$$.fragment,f),p(J.$$.fragment,f),p(c.$$.fragment,f),p(u.$$.fragment,f),p(l.$$.fragment,f),p(S.$$.fragment,f),p(q.$$.fragment,f),p(z.$$.fragment,f),p(re.$$.fragment,f),p(he.$$.fragment,f),p(pe.$$.fragment,f),p(ce.$$.fragment,f),p(we.$$.fragment,f),p(E.$$.fragment,f),p(G.$$.fragment,f),p(V.$$.fragment,f),p(D.$$.fragment,f),p(j.$$.fragment,f),p(Ae.$$.fragment,f),p(Ie.$$.fragment,f),p(Me.$$.fragment,f);for(let P=0;P<Te.length;P+=1)p(Y[P]);ze=!0}},o(f){U=U.filter(Boolean);for(let P=0;P<U.length;P+=1)w(U[P]);w(le),w(o.$$.fragment,f),w(h.$$.fragment,f),w($.$$.fragment,f),w(k.$$.fragment,f),w(v.$$.fragment,f),w(g.$$.fragment,f),w(B.$$.fragment,f),w(a.$$.fragment,f),w(_.$$.fragment,f),w(N.$$.fragment,f),w(b.$$.fragment,f),w(W.$$.fragment,f),w(x.$$.fragment,f),w(J.$$.fragment,f),w(c.$$.fragment,f),w(u.$$.fragment,f),w(l.$$.fragment,f),w(S.$$.fragment,f),w(q.$$.fragment,f),w(z.$$.fragment,f),w(re.$$.fragment,f),w(he.$$.fragment,f),w(pe.$$.fragment,f),w(ce.$$.fragment,f),w(we.$$.fragment,f),w(E.$$.fragment,f),w(G.$$.fragment,f),w(V.$$.fragment,f),w(D.$$.fragment,f),w(j.$$.fragment,f),w(Ae.$$.fragment,f),w(Ie.$$.fragment,f),w(Me.$$.fragment,f),Y=Y.filter(Boolean);for(let P=0;P<Y.length;P+=1)w(Y[P]);ze=!1},d(f){f&&O(e),Le(U,f),le.d(f),M(o),M(h),M($),M(k),M(v),M(g),M(B),M(a),M(_),M(N),M(b),M(W),M(x),M(J),M(c),M(u),M(l),M(S),M(q),M(z),M(re),M(he),M(pe),M(ce),M(we),M(E),M(G),M(V),M(D),M(j),M(Ae),M(Ie),M(Me),Le(Y,f),s[7](null)}}}function an(s){let e=[s[0].theme,s[3]],t,n,r=dt(s);return{c(){r.c(),t=Q()},l(i){r.l(i),t=Q()},m(i,o){r.m(i,o),F(i,t,o),n=!0},p(i,[o]){o&9&&me(e,e=[i[0].theme,i[3]])?(ue(),w(r,1,1,fe),ge(),r=dt(i),r.c(),p(r,1),r.m(t.parentNode,t)):r.p(i,o)},i(i){n||(p(r),n=!0)},o(i){w(r),n=!1},d(i){i&&O(t),r.d(i)}}}function fn(s,e,t){let n=Ce;_e.subscribe(a=>{t(0,n=a),$()});const r=n.radius*2+1;var i=[],o=new Qe(void 0,[],[],[],[]);Ve.subscribe(a=>t(2,o=a));var h=[];Oe.subscribe(a=>{t(3,h=a)});function $(){t(1,i=[]);let a=new et(0,n.theme);for(let _=n.radius;_>=n.radius*-1;_--){let N=new et(a.currentIndex,a.theme);for(let b=n.radius;b>=n.radius*-1;b--){let W;W=new oe(_,b),W.inRadius(n.radius)&&i.push(new Wt(W.q,W.r,n.hexSize,N.next()))}_>0?a.next():a.previous()}}$();const k=new ve(n.hexSize*(3/2)*(r+2),n.hexSize*Math.sqrt(3)*r),v=`${k.x/-2} ${k.y/-2} ${k.x} ${k.y}`;let g;function B(a){bt[a?"unshift":"push"](()=>{g=a,t(4,g)})}return[n,i,o,h,g,k,v,B]}class hn extends be{constructor(e){super(),xe(this,e,fn,an,me,{})}}function _t(s){let e,t,n,r="×",i,o,h="GAME OVER!",$,k,v,g,B;return{c(){e=te("div"),t=te("div"),n=te("span"),n.textContent=r,i=qe(),o=te("p"),o.textContent=h,$=qe(),k=te("p"),v=xt(s[0]),this.h()},l(a){e=ne(a,"DIV",{class:!0});var _=Z(e);t=ne(_,"DIV",{class:!0});var N=Z(t);n=ne(N,"SPAN",{class:!0,"data-svelte-h":!0}),Ne(n)!=="svelte-ty2x6x"&&(n.textContent=r),i=ke(N),o=ne(N,"P",{"data-svelte-h":!0}),Ne(o)!=="svelte-av41o5"&&(o.textContent=h),$=ke(N),k=ne(N,"P",{});var b=Z(k);v=qt(b,s[0]),b.forEach(O),N.forEach(O),_.forEach(O),this.h()},h(){L(n,"class","close-button svelte-p4vkuh"),L(t,"class","popup-content svelte-p4vkuh"),L(e,"class","popup svelte-p4vkuh")},m(a,_){F(a,e,_),X(e,t),X(t,n),X(t,i),X(t,o),X(t,$),X(t,k),X(k,v),g||(B=[ie(n,"click",s[2]),ie(e,"click",s[3])],g=!0)},p(a,_){_&1&&kt(v,a[0])},d(a){a&&O(e),g=!1,je(B)}}}function cn(s){let e,t=s[1]&&_t(s);return{c(){t&&t.c(),e=Q()},l(n){t&&t.l(n),e=Q()},m(n,r){t&&t.m(n,r),F(n,e,r)},p(n,[r]){n[1]?t?t.p(n,r):(t=_t(n),t.c(),t.m(e.parentNode,e)):t&&(t.d(1),t=null)},i:fe,o:fe,d(n){n&&O(e),t&&t.d(n)}}}function un(s,e,t){let{text:n=""}=e,r=!0;function i(){t(1,r=!1)}function o(h){h.target===h.currentTarget&&i()}return s.$$set=h=>{"text"in h&&t(0,n=h.text)},[n,r,i,o]}class Mt extends be{constructor(e){super(),xe(this,e,un,cn,me,{text:0})}}function wt(s){let e,t;return e=new Mt({props:{text:s[0].checkmate[0]+" checkmated "+s[0].checkmate[1]}}),{c(){C(e.$$.fragment)},l(n){A(e.$$.fragment,n)},m(n,r){I(e,n,r),t=!0},p(n,r){const i={};r&1&&(i.text=n[0].checkmate[0]+" checkmated "+n[0].checkmate[1]),e.$set(i)},i(n){t||(p(e.$$.fragment,n),t=!0)},o(n){w(e.$$.fragment,n),t=!1},d(n){M(e,n)}}}function vt(s){let e,t;return e=new Mt({props:{text:"Stalemate!"}}),{c(){C(e.$$.fragment)},l(n){A(e.$$.fragment,n)},m(n,r){I(e,n,r),t=!0},i(n){t||(p(e.$$.fragment,n),t=!0)},o(n){w(e.$$.fragment,n),t=!1},d(n){M(e,n)}}}function gn(s){let e,t="Hexagonal Chess",n,r,i,o="Grayscale",h,$="Wood",k,v,g,B="Default",a,_="Flipped",N,b,W,x,J,c,u,l=s[0].checkmate&&wt(s),S=s[0].stalemate&&vt();return x=new hn({}),{c(){e=te("h1"),e.textContent=t,n=qe(),r=te("select"),i=te("option"),i.textContent=o,h=te("option"),h.textContent=$,k=qe(),v=te("select"),g=te("option"),g.textContent=B,a=te("option"),a.textContent=_,N=qe(),l&&l.c(),b=qe(),S&&S.c(),W=qe(),C(x.$$.fragment),this.h()},l(q){e=ne(q,"H1",{class:!0,"data-svelte-h":!0}),Ne(e)!=="svelte-1bl0xm5"&&(e.textContent=t),n=ke(q),r=ne(q,"SELECT",{});var z=Z(r);i=ne(z,"OPTION",{"data-svelte-h":!0}),Ne(i)!=="svelte-c4ukt8"&&(i.textContent=o),h=ne(z,"OPTION",{"data-svelte-h":!0}),Ne(h)!=="svelte-1loqtfl"&&(h.textContent=$),z.forEach(O),k=ke(q),v=ne(q,"SELECT",{});var re=Z(v);g=ne(re,"OPTION",{"data-svelte-h":!0}),Ne(g)!=="svelte-1r2fxli"&&(g.textContent=B),a=ne(re,"OPTION",{"data-svelte-h":!0}),Ne(a)!=="svelte-4nai0v"&&(a.textContent=_),re.forEach(O),N=ke(q),l&&l.l(q),b=ke(q),S&&S.l(q),W=ke(q),A(x.$$.fragment,q),this.h()},h(){L(e,"class","header"),i.__value=We.GRAYSCALE,Pe(i,i.__value),i.selected=!0,h.__value=We.WOOD,Pe(h,h.__value),s[2]===void 0&&Ze(()=>s[4].call(r)),g.__value=0,Pe(g,g.__value),g.selected=!0,a.__value=1,Pe(a,a.__value),s[1]===void 0&&Ze(()=>s[6].call(v))},m(q,z){F(q,e,z),F(q,n,z),F(q,r,z),X(r,i),X(r,h),Re(r,s[2],!0),F(q,k,z),F(q,v,z),X(v,g),X(v,a),Re(v,s[1],!0),F(q,N,z),l&&l.m(q,z),F(q,b,z),S&&S.m(q,z),F(q,W,z),I(x,q,z),J=!0,c||(u=[ie(r,"change",s[4]),ie(r,"change",s[5]),ie(v,"change",s[6]),ie(v,"change",s[7])],c=!0)},p(q,[z]){z&4&&Re(r,q[2]),z&2&&Re(v,q[1]),q[0].checkmate?l?(l.p(q,z),z&1&&p(l,1)):(l=wt(q),l.c(),p(l,1),l.m(b.parentNode,b)):l&&(ue(),w(l,1,1,()=>{l=null}),ge()),q[0].stalemate?S?z&1&&p(S,1):(S=vt(),S.c(),p(S,1),S.m(W.parentNode,W)):S&&(ue(),w(S,1,1,()=>{S=null}),ge())},i(q){J||(p(l),p(S),p(x.$$.fragment,q),J=!0)},o(q){w(l),w(S),w(x.$$.fragment,q),J=!1},d(q){q&&(O(e),O(n),O(r),O(k),O(v),O(N),O(b),O(W)),l&&l.d(q),S&&S.d(q),M(x,q),c=!1,je(u)}}}function mn(s,e,t){let n,r,i;Ye.subscribe(g=>t(0,i=g));function o(g){let B=He.DEFAULT;switch(g){case 0:{B=He.DEFAULT;break}case 1:{B=He.FLIPPED;break}}_e.update(a=>{let _=a;return console.log(a),_.layout=a.getLayout(B),_})}function h(){n=De(this),t(2,n)}const $=g=>_e.update(B=>{let a=B;return a.theme=n,a});function k(){r=De(this),t(1,r)}const v=g=>{o(r)};return t(2,n=We.GRAYSCALE),t(1,r=0),[i,r,n,o,h,$,k,v]}class wn extends be{constructor(e){super(),xe(this,e,mn,gn,me,{})}}export{wn as component};
