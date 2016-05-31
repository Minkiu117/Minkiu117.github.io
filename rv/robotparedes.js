function Sensor(position,direction){
 THREE.Raycaster.call(this,position,direction);
 this.colision=false;
}
Sensor.prototype=new THREE.Raycaster();

function Cabina(){
  THREE.Object3D.call(this);
  THREE.ImageUtils.crossOrigin = '';
  var texturacab = new THREE.TextureLoader().load('http://minkiu117.github.io/rv/cab.jpg');
  this.cabina=new THREE.Mesh(new THREE.SphereGeometry( 1.1, 100, 100, 0, Math.PI*2, 3*Math.PI/2, Math.PI),new THREE.MeshPhongMaterial({map:texturacab}));
  this.antena=new THREE.Mesh(new THREE.CylinderGeometry(0.02,0.02,0.8,100),new THREE.MeshPhongMaterial({color:0xffffff}));
  this.cabina.position.y=7.35;
  this.antena.position.y=8.85;
  this.add(this.cabina);
  this.add(this.antena);
}

Cabina.prototype=new THREE.Object3D();

function Ovni(x=0, y=0){
 Agent.call(this,x,y);
  THREE.ImageUtils.crossOrigin = '';
  var texturasup = new THREE.TextureLoader().load('http://minkiu117.github.io/rv/sup.jpg');
  var texturainf = new THREE.TextureLoader().load('http://minkiu117.github.io/rv/inf.jpg');
  this.cuerpoi=new THREE.Mesh(new THREE.SphereGeometry(7, 200, 200, 0, Math.PI*2, Math.PI, .56), new THREE.MeshPhongMaterial({map:texturainf}));
  this.cuerpos=new THREE.Mesh(new THREE.SphereGeometry(8, 200, 200, 0, Math.PI*2, 0, .68), new THREE.MeshPhongMaterial({map:texturasup}));
  this.cuerpoi.position.y=0;
  this.cabinaovni = new Cabina();
  this.add(this.cuerpos)
  this.add(this.cuerpoi)
  this.add(this.cabinaovni);
 
 this.sensor=new Sensor();
 this.actuator=new Array();
 
 this.cuerpos.rotation.x=Math.PI/2;
 this.cuerpoi.rotation.x=Math.PI/2;
 this.cabinaovni.rotation.x=Math.PI/2;
 //this.cabinaovni.rotation.y=Math.PI+0.5;
 this.cuerpos.scale.x=0.3;
 this.cuerpos.scale.y=0.3;
 this.cuerpos.scale.z=0.3;
 this.cuerpoi.scale.x=0.3;
 this.cuerpoi.scale.y=0.3;
 this.cuerpoi.scale.z=0.3;
 this.cabinaovni.scale.x=0.35;
 this.cabinaovni.scale.y=0.35;
 this.cabinaovni.scale.z=0.35;
 this.cabinaovni.castShadow=true;
 this.cuerpos.castShadow=true;
 this.cuerpoi.castShadow=true;
}
Ovni.prototype=new Agent();

function Wall(size,x=0,y=0){
 THREE.ImageUtils.crossOrigin = '';
 var texturaw = THREE.ImageUtils.loadTexture('http://minkiu117.github.io/rv/ecopiedra.jpg');   //Cargo la textura de las paredes
 texturaw.wrapS = texturaw.wrapT = THREE.RepeatWrapping; 	//Defino que la imagen se repita a lo largo de la malla
 texturaw.repeat.set( 10, 10 );
 texturaw.anisotropy=256;	
 THREE.Mesh.call(this,new THREE.BoxGeometry(size,size,size), new  THREE.MeshLambertMaterial({texturaw})); 
 this.size=size;
 this.position.x=x;
 this.position.y=y;
}
Wall.prototype=new THREE.Mesh();

function WallBasic(size,x=0,y=0){
 THREE.Mesh.call(this,new THREE.BoxGeometry(size,size,size), new  THREE.MeshBasicMaterial({color:0x2194ce})); 
 this.size=size;
 this.position.x=x;
 this.position.y=y;
}
WallBasic.prototype=new THREE.Mesh();

Environment.prototype.setMap=function(map){
 var offset=Math.floor(map.length/2);
 for(var i=0;i<map.length;i++){
  for(var j=0;j<map.length;j++){
   if(map[i][j]==="x")
    this.add(new Wall(1, j-offset,-(i-offset)));
   else if(map[i][j]==="r")
    this.add(new Ovni(j-offset,-(i-offset)));	
  }
 }
}	

Ovni.prototype.sense=function(environment){
 this.sensor.set(this.position, new THREE.Vector3(Math.cos(this.rotation.z),Math.sin(this.rotation.z),0));
 var obstaculo = this.sensor.intersectObjects(environment.children,true);
 if ((obstaculo.length>0&&(obstaculo[0].distance<=2.2))){
  this.sensor.colision=true;
  obstaculo[0].object.material=new THREE.MeshBasicMaterial({color:0xffff00});}
 else
  this.sensor.colision=false;
}

Ovni.prototype.plan = function(environment){
 this.actuator.commands=[];
 if(this.sensor.colision==true)
  this.actuator.commands.push('RotarIzquierda');
 else
  this.actuator.commands.push('Derecho');
}

Ovni.prototype.act=function(environment){
 var command=this.actuator.commands.pop();
 if(command==undefined)
  console.log('Undefined command');
 else if(command in this.operations)
  this.operations[command](this);
 else
  console.log('Unknown command'); 
}

Ovni.prototype.operations = {};

Ovni.prototype.operations.Derecho = function(robot,step){
 if(step==undefined)
  step=0.1;
 robot.position.x+=step*Math.cos(robot.rotation.z);
 robot.position.y+=step*Math.sin(robot.rotation.z);
 robot.cuerpoi.rotation.y-=0.5;
 robot.cuerpos.rotation.y-=0.5;
};

Ovni.prototype.operations.RotarDerecha = function(robot,angulo){
 if(angulo==undefined){
  angulo=-Math.PI/2;
 }
 robot.rotation.z+=angulo;
};

Ovni.prototype.operations.RotarIzquierda = function(robot,angulo){
 if(angulo==undefined){
  angulo=Math.PI/2;
 }
 robot.rotation.z+=angulo;
};
 
function setup(){
 var mapa = new Array();
   mapa[0] = "xxxxxxxxxxxxxxxxxxxxxxxxxxxx";
   mapa[1] = "x      x                   x";
   mapa[2] = "x      x                   x";
   mapa[3] = "x      x                   x";
   mapa[4] = "x                          x";
   mapa[5] = "x                          x";
   mapa[6] = "x                          x";
   mapa[7] = "x                          x";
   mapa[8] = "x                          x";
   mapa[9] = "x           xxxxx          x";
  mapa[10] = "x               x          x";
  mapa[11] = "x               x r        x";
  mapa[12] = "x               x          x";
  mapa[13] = "x       xxxxxxxxx          x";
  mapa[14] = "x                          x";
  mapa[15] = "x          xxxxxxxxx       x";
  mapa[16] = "x          x               x";
  mapa[17] = "x          x               x";
  mapa[18] = "x          x               x";
  mapa[19] = "x          xxxxx           x";
  mapa[20] = "x                          x";
  mapa[21] = "x                          x";
  mapa[22] = "x                          x";
  mapa[23] = "x                          x";
  mapa[24] = "x                          x";
  mapa[25] = "x                          x";
  mapa[26] = "x                   x      x";
  mapa[27] = "x                   x      x";
  mapa[28] = "x                   x      x";
  mapa[29] = "xxxxxxxxxxxxxxxxxxxxxxxxxxxx";

 entorno=new Environment();
 entorno.setMap(mapa);
 THREE.ImageUtils.crossOrigin = '';
 var texturap = THREE.ImageUtils.loadTexture('http://minkiu117.github.io/rv/piso2.jpg');   //Cargo la textura de las paredes
 texturap.wrapS = texturap.wrapT = THREE.RepeatWrapping; 	//Defino que la imagen se repita a lo largo de la malla
 texturap.repeat.set( 10, 10 );
 texturap.anisotropy=256;										//resalta el detalle de la textura
 var floor=new THREE.Mesh(new THREE.BoxGeometry(28,30,0.1), new THREE.MeshLambertMaterial({map:texturap}));//Creo el material de la pared tipo Lambert con la textura dada
 floor.position.z=-0.5;
 floor.position.x=-1.5;
 floor.position.y=0.5;
 iluminacion = new THREE.PointLight(0xffffff);
 iluminacion.position.z=20;
 iluminacion.position.y=10;
 
 camara=new THREE.PerspectiveCamera();
 camara.position.z=40;
 renderer = new THREE.WebGLRenderer();
 renderer.setSize(window.innerHeight*0.95, window.innerHeight*0.95);
 document.body.appendChild(renderer.domElement);
 entorno.add(camara);
 entorno.add(iluminacion);
 entorno.add(floor);

 renderer.shadowMap.enabled=true;
 floor.receiveShadow=true;
 iluminacion.castShadow=true;
}

function loop(){
 requestAnimationFrame(loop);
 entorno.sense();
 entorno.plan();
 entorno.act();
 renderer.render(entorno,camara);
}

var entorno,iluminacion,robot,step,angulo,camara,renderer,i,x,y;

setup();
loop();
