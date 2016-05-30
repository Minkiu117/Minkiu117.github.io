function Ovni(){
  THREE.Object3D.call(this);
  THREE.ImageUtils.crossOrigin = '';
  var textura = new THREE.TextureLoader().load('http://minkiu117.github.io/rv/sup.jpg');
  this.cuerpoi=new THREE.Mesh(new THREE.SphereGeometry(7, 200, 200, 0, Math.PI*2, Math.PI, .56), new THREE.MeshPhongMaterial({color:0xffffff}));
  this.cuerpos=new THREE.Mesh(new THREE.SphereGeometry(8, 200, 200, 0, Math.PI*2, 0, .68), new THREE.MeshPhongMaterial({map:textura}));
  this.cabina=new THREE.Mesh(new THREE.SphereGeometry( 1.1, 100, 100, 0, Math.PI*2, 3*Math.PI/2, Math.PI),new THREE.MeshPhongMaterial({color:0xffffff}));
  this.antena=new THREE.Mesh(new THREE.CylinderGeometry(0.02,0.02,0.8,100),new THREE.MeshPhongMaterial({color:0xffffff}));
  this.cuerpoi.position.y=8;
  this.cuerpos.position.y=-5.5;
  this.cabina.position.y=2.35;
  this.antena.position.y=3.85;
  this.add(this.cuerpos)
  this.add(this.cuerpoi)
  this.add(this.cabina);
  this.add(this.antena);
}

Ovni.prototype=new THREE.Object3D();

function setup(){
  Ovnibot = new Ovni();
  luzPuntual = new THREE.PointLight(0xffffff);
  luzPuntual.position.x=10;
  luzPuntual.position.y=-7;
  luzPuntual.position.z=40;
  escena = new THREE.Scene();
  escena.add(Ovnibot);
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
  Ovnibot.rotation.y+=0.01;
}

var escena,camara,luzPuntual,renderer;
var cabinaOvni,cascoOvni;

setup();
loop();
