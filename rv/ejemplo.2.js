function Pierna(){
  THREE.Object3D.call(this);
  this.pierna=new THREE.Mesh(new THREE.BoxGeometry(1,5,1));
  this.pie=new THREE.Mesh(new THREE.BoxGeometry(2,1,1));
  this.pierna.position.y=-2.5;
  this.pie.position.y=-4.5;
  this.pie.position.x=1;
  this.add(this.pierna);
  this.add(this.pie);
}

Pierna.prototype = new THREE.Object3D();

function Cuerpo(){
  THREE.Object3D.call(this);
  this.cuerpo = new THREE.Mesh(new THREE.CylinderGeometry(1,2,5,10));
  this.piernaD = new Pierna();
  this.piernaI = new Pierna();
  this.cuerpo.position.y=2;
  this.piernaD.position.z=-1;
  this.piernaI.position.z=1;
  this.add(this.cuerpo);
  this.add(this.piernaD);
  this.add(this.piernaI);
}

Cuerpo.prototype = new THREE.Object3D;

function setup(){
  cuerpoc = new Cuerpo;
  step=0.01;
  escena = new THREE.Scene();
  escena.add(cuerpoc);
  camara = new THREE.PerspectiveCamera();
  camara.position.z = 20;
  renderer = new THREE.WebGLRenderer();
  renderer.setSize (window.innerHeight*0.95, window.innerHeight*0.95);
  document.body.appendChild( renderer.domElement );
}

function loop(){
  requestAnimationFrame( loop );
  renderer.render( escena, camara);
  cuerpoc.rotation.x+=0.01;
  cuerpoc.rotation.y+=0.01;
  if (Math.abs(cuerpoc.piernaD.rotation.z) > 0.5)
    step = -step;
  cuerpoc.piernaD.rotation.z+=step;
  cuerpoc.piernaI.rotation.z-=step;
}

var escena,camara,renderer;
var step,cuerpoc;

setup();
loop();
