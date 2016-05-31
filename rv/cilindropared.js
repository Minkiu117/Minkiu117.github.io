function setup(){
THREE.ImageUtils.crossOrigin = '';
var textura = new THREE.TextureLoader().load('http://minkiu117.github.io/rv/ying%20yang.jpg');
var forma=new THREE.CylinderGeometry(2.5,2.5,10,50);
var material=new THREE.MeshPhongMaterial({map:textura});
var pared1 = new THREE.Mesh(new THREE.BoxGeometry(1,20,10), new THREE.MeshPhongMaterial({color:'#ffff00'}));
var pared2 = new THREE.Mesh(new THREE.BoxGeometry(1,20,10), new THREE.MeshPhongMaterial({color:'#ffff00'}));
var pared3 = new THREE.Mesh(new THREE.BoxGeometry(21,1,10), new THREE.MeshPhongMaterial({color:'#ffff00'}));
var pared4 = new THREE.Mesh(new THREE.BoxGeometry(21,1,10), new THREE.MeshPhongMaterial({color:'#ffff00'}));
var floor=new THREE.Mesh(new THREE.BoxGeometry(20,20,0.1), new THREE.MeshLambertMaterial({color:0xffff00}));
floor.position.z=-5;
floor.position.x=0;
floor.position.y=0;

pared1.position.x=10;
pared2.position.x=-10;
pared3.position.y=10;
pared4.position.y=-10;
luz=new THREE.SpotLight(0xffffff);
luzPuntual=new THREE.PointLight(0xffffff);
luzPuntual.position.x=5;
luzPuntual.position.y=5;
luzPuntual.position.z=20;
luz.position.x=0;
luz.position.y=0;
luz.position.z=0;
luz.rotation.y=Math.PI/2;
malla=new THREE.Mesh(forma,material);
malla.material.transparent=true;
malla.material.opacity=0.5;
malla.rotation.x=Math.PI/2;
escena=new THREE.Scene();
escena.add(luzPuntual);
escena.add(luz);
escena.add(pared1);
escena.add(pared2);
escena.add(pared3);
escena.add(pared4);
escena.add(malla);
escena.add(floor);

var fov=75;
var aspect=window.innerWidth/window.innerHeight;
var near=0.1;
var far=1000;
camara=new THREE.PerspectiveCamera(fov,aspect,near,far);
camara.position.z=20;

renderer=new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth,window.innerHeight);
document.body.appendChild(renderer.domElement);
renderer.shadowMap.enabled=true;
malla.castShadow=true;
pared1.receiveShadow=true;
pared2receiveShadow=true;
pared3.receiveShadow=true;
pared4.receiveShadow=true;
floor.receiveShadow=true;
luz.castShadow=true;

}
function loop()
{
  requestAnimationFrame(loop);
  malla.rotation.y+=0.1;
  renderer.render(escena,camara);
}

var malla,escena,camara,renderer,luz,luzPuntual;
setup();
loop();
