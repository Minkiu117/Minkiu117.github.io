function Sensor(position,direction){
 THREE.Raycaster.call(this,position,direction);
 this.colision=false;
}
Sensor.prototype=new THREE.Raycaster();

function OvniCabeza(){
 THREE.Object3D.call(this);
 THREE.ImageUtils.crossOrigin = '';
 var texturahead = THREE.ImageUtils.loadTexture('http://Minkiu117.github.io/rv/ovnihead2.jpg');
 this.cabeza=new THREE.Mesh(new THREE.SphereGeometry    (1.15,100,50,0,Math.PI*2,3*Math.PI/2,Math.PI),new THREE.MeshPhongMaterial({map:texturahead}));
 this.cuello=new THREE.Mesh(new THREE.CylinderGeometry(1.15,1,0.2,100),new     THREE.MeshPhongMaterial({color:0xffffff}));
 this.antena1=new THREE.Mesh(new THREE.CylinderGeometry(0.02,0.02,0.8,100),new     THREE.MeshPhongMaterial({color:0xffffff}));
 this.antena2=new THREE.Mesh(new THREE.CylinderGeometry(0.02,0.02,0.5,100),new     THREE.MeshPhongMaterial({color:0xffffff}));
 this.cabeza.position.y=1.95;
 this.antena1.position.y=3.35;
 this.antena1.position.x=0.13;
 this.antena2.position.y=3.1;
 this.antena2.position.x=-0.15;
 this.cuello.position.y=1.85;
 this.add(this.cabeza);
 this.add(this.antena1);
 this.add(this.antena2);
 this.add(this.cuello);
}

OvniCabeza.prototype=new THREE.Object3D();

function Ovni(x=0, y=0){
 Agent.call(this,x,y);
 THREE.ImageUtils.crossOrigin = '';
 var textura = THREE.ImageUtils.loadTexture('http://Minkiu117.github.io/rv/ovnibody.jpg');
 this.cuerpo=new THREE.Mesh(new THREE.SphereGeometry(2,100,100), new THREE.MeshPhongMaterial ({map:textura}));
 this.cabezaovni = new OvniCabeza();
 this.cuerpo.rotation.z=-0.25;  
 this.add(this.cuerpo);
 this.add(this.cabezaovni);

 this.sensor=new Sensor();
 //this.sensor2=new Sensor();
 this.actuator=new Array();
 
 this.cuerpo.rotation.x=Math.PI/2;
 this.cabezaovni.rotation.x=Math.PI/2;
 this.cabezaovni.rotation.y=Math.PI+0.5;
 this.cuerpo.scale.x=0.5;
 this.cuerpo.scale.y=0.5;
 this.cuerpo.scale.z=0.5;
 this.cabezaovni.scale.x=0.5;
 this.cabezaovni.scale.y=0.5;
 this.cabezaovni.scale.z=0.5;
}
Ovni.prototype=new Agent();

function Wall(size,x=0,y=0){
 THREE.Mesh.call(this,new THREE.BoxGeometry(size,size,size), new THREE.MeshNormalMaterial()); 
 this.size=size;
 this.position.x=x;
 this.position.y=y;
}
Wall.prototype=new THREE.Mesh();

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
 //this.sensor2.set(this.position, new THREE.Vector3(Math.sin(this.rotation.z),Math.cos(this.rotation.z),0));
 var obstaculo = this.sensor.intersectObjects(environment.children,true);
 //var obstaculo2 = this.sensor2.intersectObjects(environment.children,true);
 if ((obstaculo.length>0&&(obstaculo[0].distance<=1)))
  this.sensor.colision=true;
 else
  this.sensor.colision=false;
 /*if((obstaculo2.length>0&&(obstaculo2[0].distance<=1)))
  this.sensor2.colision=true;
 else
  this.sensor2.colision=false;*/
}

Ovni.prototype.plan = function(environment){
 this.actuator.commands=[];
 /*if(this.sensor.colision==false && this.sensor2.colision==true)
  this.actuator.commands.push('Derecho');
 else if(this.sensor.colision==true && this.sensor2.colision==true)
   this.actuator.commands.push('RotarDerecha');
 else
   this.actuator.commands.push('RotarIzquierda');*/
  if(this.sensor.colision==true)
   this.actuator.commands.push('RotarIzquierda');
  else
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
 robot.cuerpo.rotation.z-=0.5;
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
 entorno=new Environment();
 entorno.setMap(mapa);
 luzPuntual = new THREE.PointLight(0xffffff);
 luzPuntual.position.x=0;  
 luzPuntual.position.y=10;
 luzPuntual.position.z=30;
 camara=new THREE.PerspectiveCamera();
 camara.position.z=50;
 renderer = new THREE.WebGLRenderer();
 renderer.setSize(window.innerHeight*0.95, window.innerHeight*0.95);
 document.body.appendChild(renderer.domElement);
 entorno.add(camara);
 entorno.add(luzPuntual);
}

function loop(){
 requestAnimationFrame(loop);
 entorno.sense();
 entorno.plan();
 entorno.act();
 renderer.render(entorno,camara);
}

function evento(e){
if p==1
    p=0;
else
    p=1;
}

var entorno,luzPuntual,robot,step,angulo,camara,renderer;

setup();
loop();
