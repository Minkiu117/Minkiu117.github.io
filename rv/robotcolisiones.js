function Cabina(){
  THREE.Object3D.call(this);
  THREE.ImageUtils.crossOrigin = '';
  var texturacab = new THREE.TextureLoader().load('http://minkiu117.github.io/rv/cab.jpg');
  this.cabina=new THREE.Mesh(new THREE.SphereGeometry( 1.1, 100, 100, 0, Math.PI*2, 3*Math.PI/2, Math.PI),new THREE.MeshPhongMaterial({map:texturacab}));
  this.antena=new THREE.Mesh(new THREE.CylinderGeometry(0.02,0.02,0.8,100),new THREE.MeshPhongMaterial({color:0xffffff}));
  this.cabina.position.y=2.35;
  this.antena.position.y=3.85;
  this.add(this.cabina);
  this.add(this.antena);
}

Cabina.prototype=new THREE.Object3D();

function Ovni(){
  THREE.Object3D.call(this);
  THREE.ImageUtils.crossOrigin = '';
  var texturasup = new THREE.TextureLoader().load('http://minkiu117.github.io/rv/sup.jpg');
  var texturainf = new THREE.TextureLoader().load('http://minkiu117.github.io/rv/inf.jpg');
  this.cuerpoi=new THREE.Mesh(new THREE.SphereGeometry(7, 200, 200, 0, Math.PI*2, Math.PI, .56), new THREE.MeshPhongMaterial({map:texturainf}));
  this.cuerpos=new THREE.Mesh(new THREE.SphereGeometry(8, 200, 200, 0, Math.PI*2, 0, .68), new THREE.MeshPhongMaterial({map:texturasup}));
  this.cuerpoi.position.y=8;
  this.cuerpos.position.y=-5.5;
  this.cabinaovni = new Cabina();
  this.cuerpoi.rotation.y=-0.25;
  this.cuerpos.rotation.y=-0.25;
  this.add(this.cuerpos)
  this.add(this.cuerpoi)
  this.add(this.cabinaovni);
}

Ovni.prototype=new THREE.Object3D();

function setup(){

 Ovnibot = new Ovni();
 Ovnibot.rotation.x=Math.PI/2; 	
 luzPuntual = new THREE.PointLight(0xffffff);
 luzPuntual.position.x=0;  
 luzPuntual.position.y=10;
 luzPuntual.position.z=50;

 cubo = new THREE.Mesh(new THREE.BoxGeometry(1,40,4), new THREE.MeshNormalMaterial());
 cubo2 = new THREE.Mesh(new THREE.BoxGeometry(1,40,4), new THREE.MeshNormalMaterial());
 cubo3 = new THREE.Mesh(new THREE.BoxGeometry(41,1,4), new THREE.MeshNormalMaterial());
 cubo4 = new THREE.Mesh(new THREE.BoxGeometry(41,1,4), new THREE.MeshNormalMaterial());
 
 cubo.position.x=20;
 cubo2.position.x=-20;
 cubo3.position.y=20;
 cubo4.position.y=-20;
 
 escena = new THREE.Scene();
 camara = new THREE.PerspectiveCamera();
 camara.position.z=80;
 
 raycaster1 = new THREE.Raycaster(Ovnibot.position,new THREE.Vector3(1,0,0));
 raycaster2 = new THREE.Raycaster(Ovnibot.position,new THREE.Vector3(-1,0,0));
 raycaster3 = new THREE.Raycaster(Ovnibot.position,new THREE.Vector3(0,1,0));
 raycaster4 = new THREE.Raycaster(Ovnibot.position,new THREE.Vector3(0,-1,0));

 escena.add(cubo);
 escena.add(cubo2);
 escena.add(cubo3);
 escena.add(cubo4);
 escena.add(camara);
 escena.add(Ovnibot);
 escena.add(luzPuntual);
 step=0.3;
 step2=step*2;
 cabinarota=Math.PI+0.1;	
 renderer = new THREE.WebGLRenderer();
 renderer.setSize(window.innerHeight*0.95,window.innerHeight*0.95);
 document.body.appendChild(renderer.domElement);

}

function loop(){

 obstaculo1 = raycaster1.intersectObject(cubo,true);
 obstaculo2 = raycaster2.intersectObject(cubo2,true);
 obstaculo3 = raycaster3.intersectObject(cubo3,true);
 obstaculo4 = raycaster4.intersectObject(cubo4,true);
 
 if ((obstaculo1.length > 0 && (obstaculo1[0].distance<=5.5)) || 
     (obstaculo2.length > 0 && (obstaculo2[0].distance<=5.5)) ||
     (obstaculo3.length > 0 && (obstaculo3[0].distance<=5.5)) ||
     (obstaculo4.length > 0 && (obstaculo4[0].distance<=5.5)))
 {
  angulo+=Math.PI/2;
  cabinarota=Math.PI/4+0.8;
 }

 Ovnibot.position.x+=Math.cos(angulo)*step;
 Ovnibot.position.y+=Math.sin(angulo)*step;
 if(cabinarota<Math.PI)
 {
  cabinarota+=0.05;
 }
 if(cabinarota==Math.PI)
 {
  inc=cabinarota+angulo+0.4;
  cabinarota=0;
 }
 Ovnibot.cabinaovni.rotation.y=angulo+0.4+cabinarota;
 if(angulo%Math.PI/2!=0){
 Ovnibot.cuerpos.rotation.y+=step2;
 Ovnibot.cuerpoi.rotation.y+=step2;
 }
 else{
 Ovnibot.cuerpos.rotation.y+=step2;
 Ovnibot.cuerpoi.rotation.y+=step2;
 }
 
 raycaster1.set(Ovnibot.position, new THREE.Vector3(Math.cos(angulo),Math.sin(angulo),0));
 raycaster2.set(Ovnibot.position, new THREE.Vector3(Math.cos(angulo),Math.sin(angulo),0));
 raycaster3.set(Ovnibot.position, new THREE.Vector3(Math.cos(angulo),Math.sin(angulo),0));
 raycaster4.set(Ovnibot.position, new THREE.Vector3(Math.cos(angulo),Math.sin(angulo),0));	

 renderer.render(escena,camara);
 requestAnimationFrame(loop);

}
var cubo,cubo2,cubo3,cubo4,escena,camara,renderer;
var raycaster1,raycaster2,raycaster3,raycaster4,step,step2,angulo=0,cabezarota,inc;
var obstaculo1,obstaculo2,obstaculo3,obstaculo4;
setup();
loop();
