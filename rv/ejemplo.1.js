function Pelota(r, x=0, y=0){
  Agent.call(this,x,y);
  this.add(new THREE.MESH(new THREE.SphereGeometry(r),
                          new THREE.MeshNormalMaterial()));
  this.step=0.1,
  this.colision=0,
  this.radius=r,
  this.sensor=new THREE Raycaster(this.position, new THREE.Vector2(1,0,0));
  
  
  
Pelota.prototype=new Agent();
Pelota.prototype.sense=function(enviroment){
  this.sensor.set(this.position, new THREE.Vector3(1,0,0));
  var obstaculo1=this.sensor.intersectObjects(enviroment.children,true);
  this.sensor.set(this.position, new THREE.Vector3(-1,0,0));
  var obstaculo2=this.sensor.intersectObjects(enviroment.children,true);
  
  if((obstaculo1.length>0&&
      (obstaculo1[0].distance<=thisradius))||
      (obstaculo2.length>0&&
      (obstaculo2[0].distance<=this.radius)))
      this.colision=1;
  else
      this.colision=0;
      );
Pelota.prototype.act=function(enviroment){
  if(this.colision===1)
    this.step=-this.step;
  this.position.x +=this.step;
};
function Pared(size, x=0, y=0){
  THREE.Object3D.call(this,x,y);
  
  this.add(new THREE.Mesh(new THREE.BoxGeometry(size,size,size), new THREE.MeshNormalMaterial()));
    
    this.size=size;
    this.position.x=x;
    this.position.y=y;
}
Pared.prototype=new THREE.Object3D();
function setup(){
  entorno=new Enviroment();
  camara=new THREE.PerspectiveCamera();
  camara.position.z=30;
  
  enterno.add( new Pared(1,7,0));
  enterno.add( new Pared(1,-7,0));
  enterno.add( new Pared(1,7,1));
  enterno.add( new Pared(1,-7,1));
  enterno.add( new Pared(1,7,-1));
  enterno.add( new Pared(1,-7,-1));
  enterno.add( new Pelota(0.5));
  enterno.add( camara);
  
  renderer=new THREE.WebGLRenderer();
  renderer.setSize(window.innerHeight*.95, window.innerHeight*.95);
  document.body.appendChild(render.domElement);
}

function loop(){
  requestAnimationFrame(loop);
  entorno.sense();
  entorno.plan();
  entorno.act();
  renderer.render(entorno, camara);
}
var entorno, camara, renderer;

setup();
loop();
  
