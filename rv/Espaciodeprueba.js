function Sensor(position,direction){
 THREE.Raycaster.call(this,position,direction);
 this.colision=0;
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
  this.cuerpoi.position.y=-25;
  this.cabinaovni = new Cabina();
  this.add(this.cuerpos)
  this.add(this.cuerpoi)
  this.add(this.cabinaovni);
  

 this.luzrf=new THREE.SpotLight(0x12ac24,4,5,2);
 this.luzrf.target.updateMatrixWorld();
 this.luzrf.shadow;
 this.luzrf.target.position.set(10,0,0);
 this.add(this.luzrf);
 this.add(this.luzrf.target);
 
 this.luzri=new THREE.SpotLight(0x12ac24,4,5,2);
 this.luzri.target.updateMatrixWorld();
 this.luzri.shadow;
 this.luzri.target.position.set(0,10,0);
 this.add(this.luzri);
 this.add(this.luzri.target);
 
 this.luzrd=new THREE.SpotLight(0x12ac24,4,5,2);
 this.luzrd.target.updateMatrixWorld();
 this.luzrd.shadow;
 this.luzrd.target.position.set(0,-10,0);
 this.add(this.luzrd);
 this.add(this.luzrd.target);

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
 var texturaw = new THREE.TextureLoader().load('http://minkiu117.github.io/rv/pared2.jpg');
 THREE.Mesh.call(this,new THREE.BoxGeometry(size,size,size), new  THREE.MeshLambertMaterial({map:texturaw})); 
 this.size=size;
 this.position.x=x;
 this.position.y=y;
}
Wall.prototype=new THREE.Mesh();

function Curtain(size,x=0,y=0){
 THREE.ImageUtils.crossOrigin = '';
 var texturaw = new THREE.TextureLoader().load('http://minkiu117.github.io/rv/cortina.jpg');
 THREE.Mesh.call(this,new THREE.BoxGeometry(size,size,size), new  THREE.MeshLambertMaterial({map:texturaw})); 
 this.size=size;
 this.position.x=x;
 this.position.y=y;
}
Curtain.prototype=new THREE.Mesh();

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
//   else if(map[i][j]==="r")
//    this.add(new Ovni(j-offset,-(i-offset)));
   else if(map[i][j]==="o")
    this.add(new Curtain(j-offset,-(i-offset)));
  }
 }
}	

Ovni.prototype.sense=function(environment){
 theta = this.rotation.z;
 this.sensor.set(this.position,new THREE.Vector3(Math.cos(theta),Math.sin(theta),0));
 var obstaculo1= this.sensor.intersectObjects(environment.children);
 this.sensor.set(this.position, new THREE.Vector3(Math.cos(theta),-Math.sin(theta),0));
 var obstaculo2= this.sensor.intersectObjects(environment.children);
 this.sensor.set(this.position,new THREE.Vector3(-Math.cos(theta),Math.sin(theta),0));
 var obstaculo3= this.sensor.intersectObjects(environment.children);
 this.sensor.set(this.position,new THREE.Vector3(-Math.cos(theta),-Math.sin(theta),0));
 var obstaculo4= this.sensor.intersectObjects(environment.children);
 var limite=2.2;
  if (obstaculo1.length>0&&(obstaculo1[0].distance<=limite)){
           if((obstaculo2.length >0 && (obstaculo2[0].distance <= limite))){
             if(((obstaculo2.length >0 && (obstaculo2[0].distance <= limite))&&(obstaculo3.length >0 && (obstaculo3[0].distance <= limite)))||((obstaculo2.length >0 && (obstaculo2[0].distance <= limite))&&(obstaculo1.length >0 && (obstaculo1[0].distance <= limite))))
             this.sensor.colision= 1;
             else{
             this.sensor.colision= 3;
             }
           }
          else{
           if((obstaculo3.length >0 && (obstaculo3[0].distance <= limite))){
            if((obstaculo3.length >0 && (obstaculo3[0].distance <= limite))&&((obstaculo1.length >0 && (obstaculo1[0].distance <= limite))))
              this.sensor.colision= 2;
            else{
              this.sensor.colision= 3;
            }
           }
          }
        }
        else
          this.sensor.colision = 0;
}


Ovni.prototype.plan = function(environment){
 this.actuator.commands=[];
 if(this.sensor.colision===0)
  this.actuator.commands.push('Enfrente');
 else if(this.sensor.colision===1)
  this.actuator.commands.push('Derecha');
 else if(this.sensor.colision===2)
  this.actuator.commands.push('Izquierda');
 else if(this.sensor.colision===3)
  this.actuator.commands.push('Atras');
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

Ovni.prototype.operations.Enfrente = function(robot,step){
 if(step==undefined)
  step=0.01;
 Metay=18.5
 Metax=12.5
 stepx=(Metax-robot.position.x);
 stepy=(Metay-robot.position.y);
 robot.position.x+=step*stepx;
 robot.position.y+=step*stepy;
 robot.cuerpoi.rotation.y-=0.5;
 robot.cuerpos.rotation.y-=0.5;
}

Ovni.prototype.operations.Derecha = function(robot,angulo){
 if(angulo==undefined)
 Metay=18.5
 Metax=12.5
 stepx=(Metax-robot.position.x);
 stepy=(Metay-robot.position.y);
 if(stepy>0.5){
 if(stepx<=0.1){
 step=.4;
 Metax=0
 stepx=(Metax-robot.position.x);
 robot.position.x+=step*stepx;}
 else{
 step=0.01;
 Metax=12.5
 stepx=(Metax-robot.position.x);
 robot.position.x+=step*stepx;
 robot.cuerpoi.rotation.y-=0.5;
 robot.cuerpos.rotation.y-=0.5;}
}
}

Ovni.prototype.operations.Izquierda = function(robot,angulo){
 if(angulo==undefined)
 Metay=18.5
 Metax=12.5
 stepx=(Metax-robot.position.x);
 stepy=(Metay-robot.position.y);
 if(stepy>0.5){
 if(stepx<=0.1){
 step=.4;
 Metax=0
 stepx=(Metax-robot.position.x);
 robot.position.x+=step*stepx;}
 else{
 step=0.01;
 Metax=12.5
 stepx=(Metax-robot.position.x);
 robot.position.x+=step*stepx;
 robot.cuerpoi.rotation.y-=0.5;
 robot.cuerpos.rotation.y-=0.5;}
}
}

Ovni.prototype.operations.Atras = function(robot,angulo){
 if(angulo==undefined)
  step=0.1;
 Metay=0
 Metax=0
 stepx=(Metax-robot.position.x);
 stepy=(Metay-robot.position.y);
 robot.position.x+=step*stepx;
 robot.position.y+=step*stepy;
 robot.cuerpoi.rotation.y-=0.5;
 robot.cuerpos.rotation.y-=0.5;
}



function setup(){
 var mapa = new Array();
   mapa[0] = "xxxxxxxxxxxxxxxxxxxxxxxxxxxxx";
   mapa[1] = "x                           x";
   mapa[2] = "x                           x";
   mapa[3] = "x                           x";
   mapa[4] = "x                           x";
   mapa[5] = "x    xxxxx    xxxxxxxxxx    x";
   mapa[6] = "x    xxxxx    xxxxxxxxxx    x";
   mapa[7] = "x    xxxxx    xxxxxxxxxx    x";
   mapa[8] = "x    xxxxx    xxxxxxxxxx    x";
   mapa[9] = "x                           x";
  mapa[10] = "x                           x";
  mapa[11] = "x                           x";
  mapa[12] = "x                           x";
  mapa[13] = "x                           x";
  mapa[14] = "x    xxxxx    xxxxxxxxxx    x";
  mapa[15] = "x    xxxxx    xxxxxxxxxx    x";
  mapa[16] = "x                           x";
  mapa[17] = "x                           x";
  mapa[18] = "x                           x";
  mapa[19] = "x                           x";
  mapa[20] = "x                           x";
  mapa[21] = "x                           x";
  mapa[22] = "x    xxxxx    xxxxxxxxxx    x";
  mapa[23] = "x    xxxxx    xxxxxxxxxx    x";
  mapa[24] = "x    xxxxx    xxxxxxxxxx    x";
  mapa[25] = "x    xxxxx    xxxxxxxxxx    x";
  mapa[26] = "x    xxxxx    xxxxxxxxxx    x";
  mapa[27] = "x    xxxxx    xxxxxxxxxx    x";
  mapa[28] = "x    xxxxx    xxxxxxxxxx    x";
  mapa[29] = "x                           x";
  mapa[30] = "x                           x";
  mapa[31] = "x                           x";
  mapa[32] = "x                           x";
  mapa[33] = "x                           x";
  mapa[34] = "x                           x";
  mapa[35] = "xxxxxxxxxxxxxxxxxxxxxxxxxxxxx";

 entorno=new Environment();
 entorno.setMap(mapa);
 THREE.ImageUtils.crossOrigin = '';
 var texturap = new THREE.TextureLoader().load('http://minkiu117.github.io/rv/pisob.jpg');   //Cargo la textura del piso
 texturap.wrapS = texturap.wrapT = THREE.RepeatWrapping; 	//Defino que la imagen se repita a lo largo de la malla
 texturap.repeat.set( 1, 1 );
 texturap.anisotropy=256;										//resalta el detalle de la textura
 var floor=new THREE.Mesh(new THREE.BoxGeometry(29,36,0.1), new THREE.MeshLambertMaterial({map:texturap}));//Creo el material de la pared tipo Lambert con la textura dada
 floor.position.z=-0.5;
 floor.position.x=-4;
 floor.position.y=0.5;
 iluminacion = new THREE.PointLight(0xffffff);
 iluminacion.position.z=30;
 iluminacion.position.y=0;
 iluminacion.position.x=0;
 
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
