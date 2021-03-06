function Casco(){
  THREE.Object3D.call(this);
  this.cuerpos=new THREE.Mesh(new THREE.SphereGeometry(7, 200, 200, 0, Math.PI*2, Math.PI, .56), new THREE.MeshLambertMaterial({color:0x000000}));
  this.cuerpoi=new THREE.Mesh(new THREE.SphereGeometry(8, 200, 200, 0, Math.PI*2, 0, .68), new THREE.MeshLambertMaterial({color:0xffffff}));
  this.cuerpos.position.y=8;
  this.cuerpoi.position.y=-5.5;
  this.cuerpos.position.x=0;
  this.cuerpoi.position.x=0;
  this.add(this.cuerpos)
  this.add(this.cuerpoi)
}


function Cabina(){
  THREE.Object3D.call(this);
  this.cabina=new THREE.Mesh(new THREE.SphereGeometry( 1.1, 100, 100, 0, Math.PI*2, 3*Math.PI/2, Math.PI),new THREE.MeshLambertMaterial({color:0xffffff}));
  this.antena=new THREE.Mesh(new THREE.CylinderGeometry(0.02,0.02,0.8,100),new THREE.MeshLambertMaterial({color:0xffffff}));
  this.cabina.position.y=2.35;
  this.antena.position.y=3.85;
  this.add(this.cabina);
  this.add(this.antena);
}

Casco.prototype=new THREE.Object3D();
Cabina.prototype=new THREE.Object3D();

function setup(){
  cascoOvni = new Casco();
  cabinaOvni = new Cabina();  
  luzPuntual = new THREE.PointLight(0xffffff);
  luzPuntual.position.x=10;
  luzPuntual.position.y=-7;
  luzPuntual.position.z=40;
  escena = new THREE.Scene();
  escena.add(cascoOvni);
  escena.add(cabinaOvni);
  escena.add(luzPuntual);
  camara = new THREE.PerspectiveCamera();
  camara.position.z=12;
  renderer = new THREE.WebGLRenderer();
  renderer.setSize (window.innerHeight*0.95, window.innerHeight*0.95);
  document.body.appendChild( renderer.domElement );
}

function loop(){
  requestAnimationFrame( loop );
  renderer.render( escena, camara);
  cascoOvni.rotation.y+=0.01;
}

var escena,camara,luzPuntual,renderer;
var cabinaOvni,cascoOvni;

setup();
loop();
