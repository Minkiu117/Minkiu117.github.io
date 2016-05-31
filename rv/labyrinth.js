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
  this.cabinaovni = new Cabina();
  this.add(this.cuerpos)
  this.add(this.cuerpoi)
  this.add(this.cabinaovni);
  
  this.sensor=new Sensor();
 //this.sensor2=new Sensor();
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

}

Ovni.prototype=new Agent();

var escena = new THREE.Scene(); //Se crea la escena									//Punto mas lejano

				var camara = new THREE.PerspectiveCamera(); //Definicionde la perspectiva de la camara 
				camara.position.x = -70;										//Posicion en Z de la camara 

				var renderer = new THREE.WebGLRenderer();						//Definicion del Render
				renderer.setSize(window.innerWidth*.95, window.innerHeight*.95);		//Definicion del tamaño del lienzo
				document.body.appendChild(renderer.domElement);

				///////////////////////////Generacion de las paredes/////////////////////////////////
				var forma=new THREE.Geometry();													//Creo una geometria vacia llamada forma
				var figura = new THREE.Shape();													//Genero un lienzo en 2D

figura.moveTo(-25, 25);
figura.moveTo(-24 ,25);
figura.moveTo(-24 ,14);
figura.moveTo(-21 ,14);
figura.moveTo(-21, 16);
figura.moveTo(-22 ,16);
figura.moveTo(-22 ,17);
figura.moveTo(-20 ,17);
figura.moveTo(-20 ,9);
figura.moveTo(-15 ,9);
figura.moveTo(-15 ,17);
figura.moveTo(-11 ,17);
figura.moveTo(-11 ,16);
figura.moveTo(-14 ,16);
figura.moveTo(-14 ,12);
figura.moveTo(-12 ,12);
figura.moveTo(-12 ,14);
figura.moveTo(-3  ,14);
figura.moveTo(-3 ,16);
figura.moveTo(-9 ,16);
figura.moveTo(-9 ,17);
figura.moveTo(-2 ,17);
figura.moveTo(-2 ,13);
figura.moveTo(-11, 13);
figura.moveTo(-11 ,10);
figura.moveTo(-12 ,10);
figura.moveTo(-12 ,11);
figura.moveTo(-14 ,11);
figura.moveTo(-14 ,8);
figura.moveTo(-11 ,8);
figura.moveTo(-11 ,5);
figura.moveTo(-5 ,5);
figura.moveTo(-5 ,1);
figura.moveTo(-12 ,1);
figura.moveTo(-12 ,2);
figura.moveTo(-6 ,2);
figura.moveTo(-6 ,4);
figura.moveTo(-15 ,4);
figura.moveTo(-15 ,5);
figura.moveTo(-12 ,5);
figura.moveTo(-12 ,7);
figura.moveTo(-15 ,7);
figura.moveTo(-15 ,8);
figura.moveTo(-20 ,8);
figura.moveTo(-20 ,5);
figura.moveTo(-17 ,5);
figura.moveTo(-17 ,4);
figura.moveTo(-22 ,4);
figura.moveTo(-22 ,5);
figura.moveTo(-21 ,5);
figura.moveTo(-21 ,13);
figura.moveTo(-24 ,13);
figura.moveTo(-24 ,2);
figura.moveTo(-14 ,2);
figura.moveTo(-14 ,1);
figura.moveTo(-24 ,1);
figura.moveTo(-24 ,-7);
figura.moveTo(-21 ,-7);
figura.moveTo(-21 ,-9);
figura.moveTo(-22 ,-9);
figura.moveTo(-22 ,-8);
figura.moveTo(-24 ,-8);
figura.moveTo(-24 ,-11);
figura.moveTo(-21 ,-11);
figura.moveTo(-21 ,-13);
figura.moveTo(-22 ,-13);
figura.moveTo(-22 ,-12);
figura.moveTo(-24 ,-12);
figura.moveTo(-24 ,-18);
figura.moveTo(-22 ,-18);
figura.moveTo(-22 ,-15);
figura.moveTo(-21 ,-15);
figura.moveTo(-21 ,-21);
figura.moveTo(-19 ,-21);
figura.moveTo(-19 ,-22);
figura.moveTo(-22 ,-22);
figura.moveTo(-22 ,-19);
figura.moveTo(-24 ,-19);
figura.moveTo(-24 ,-24);
figura.moveTo(-13 ,-24);
figura.moveTo(-13 ,-22);
figura.moveTo(-17 ,-22);
figura.moveTo(-17 ,-21);
figura.moveTo(-7 ,-21);
figura.moveTo(-7 ,-22);
figura.moveTo(-12 ,-22);
figura.moveTo(-12 ,-24);
figura.moveTo(-1 ,-24);
figura.moveTo(-1 ,-22);
figura.moveTo(-5 ,-22);
figura.moveTo(-5 ,-21);
figura.moveTo(6 ,-21);
figura.moveTo(6 ,-13);
figura.moveTo(0 ,-13);
figura.moveTo(0 ,-12);
figura.moveTo(6 ,-12);
figura.moveTo(6 ,-5);
figura.moveTo(4 ,-5);
figura.moveTo(4 ,-7);
figura.moveTo(3 ,-7);
figura.moveTo(3 ,-5);
figura.moveTo(1 ,-5);
figura.moveTo(1 ,-9);
figura.moveTo(4 ,-9);
figura.moveTo(4 ,-10);
figura.moveTo(-2, -10);
figura.moveTo(-2 ,-13);
figura.moveTo(-7 ,-13);
figura.moveTo(-7 ,-15);
figura.moveTo(-3 ,-15);
figura.moveTo(-3 ,-16);
figura.moveTo(-8 ,-16);
figura.moveTo(-8 ,-12);
figura.moveTo(-3 ,-12);
figura.moveTo(-3 ,-10);
figura.moveTo(-10, -10);
figura.moveTo(-10, -16);
figura.moveTo(-11, -16);
figura.moveTo(-11, -9);
figura.moveTo(-3 ,-9);
figura.moveTo(-3 ,-4);
figura.moveTo(-2 ,-4);
figura.moveTo(-2 ,-9);
figura.moveTo(0 ,-9);
figura.moveTo(0 ,-4);
figura.moveTo(10 ,-4);
figura.moveTo(10 ,1);
figura.moveTo(7 ,1);
figura.moveTo(7 ,8);
figura.moveTo(8 ,8);
figura.moveTo(8 ,5 );
figura.moveTo(10, 5);
figura.moveTo(10 ,10);
figura.moveTo(3 ,10);
figura.moveTo(3 ,16);
figura.moveTo(5 ,16);
figura.moveTo(5 ,15);
figura.moveTo(4 ,15);
figura.moveTo(4 ,11);
figura.moveTo(10, 11);
figura.moveTo(10, 13);
figura.moveTo(7, 13);
figura.moveTo(7, 14);
figura.moveTo(10, 14);
figura.moveTo(10, 16);
figura.moveTo(7, 16);
figura.moveTo(7, 18);
figura.moveTo(3, 18);
figura.moveTo(3, 22);
figura.moveTo(6, 22);
figura.moveTo(6, 21);
figura.moveTo(4, 21);
figura.moveTo(4, 19);
figura.moveTo(8, 19);
figura.moveTo(8, 17);
figura.moveTo(10, 17);
figura.moveTo(10, 19);
figura.moveTo(12, 19);
figura.moveTo(12, 21);
figura.moveTo(8, 21);
figura.moveTo(8, 22);
figura.moveTo(19, 22);
figura.moveTo(19, 21);
figura.moveTo(13, 21);
figura.moveTo(13, 19);
figura.moveTo(19, 19);
figura.moveTo(19, 18);
figura.moveTo(11, 18);
figura.moveTo(11, 5);
figura.moveTo(12, 5);
figura.moveTo(12, 4);
figura.moveTo(8, 4);
figura.moveTo(8, 2);
figura.moveTo(15, 2);
figura.moveTo(15, 4);
figura.moveTo(14, 4);
figura.moveTo(14, 5);
figura.moveTo(22, 5);
figura.moveTo(22, 4);
figura.moveTo(19 ,4);
figura.moveTo(19 ,2);
figura.moveTo(18, 2);
figura.moveTo(18, 4);
figura.moveTo(16, 4);
figura.moveTo(16, 1);
figura.moveTo(11, 1);
figura.moveTo(11, -4);
figura.moveTo(13, -4);
figura.moveTo(13, -1);
figura.moveTo(18, -1);
figura.moveTo(18, 0);
figura.moveTo(19, 0);
figura.moveTo(19, -5);
figura.moveTo(16, -5);
figura.moveTo(16, -4);
figura.moveTo(18, -4);
figura.moveTo(18, -2);
figura.moveTo(14, -2);
figura.moveTo(14, -5);
figura.moveTo(7, -5);
figura.moveTo(7, -7);
figura.moveTo(10, -7);
figura.moveTo(10, -14);
figura.moveTo(9, -14);
figura.moveTo(9, -8);
figura.moveTo(7, -8);
figura.moveTo(7, -16);
figura.moveTo(22, -16);
figura.moveTo(22, -19);
figura.moveTo(21, -19);
figura.moveTo(21, -17);
figura.moveTo(16, -17);
figura.moveTo(16, -19);
figura.moveTo(15, -19);
figura.moveTo(15, -17);
figura.moveTo(13, -17);
figura.moveTo(13, -19);
figura.moveTo(12, -19);
figura.moveTo(12, -17);
figura.moveTo(7, -17);
figura.moveTo(7, -19);
figura.moveTo(10, -19);
figura.moveTo(10, -20);
figura.moveTo(7, -20);
figura.moveTo(7, -22);
figura.moveTo(0, -22);
figura.moveTo(0, -24);
figura.moveTo(9, -24);
figura.moveTo(9, -22);
figura.moveTo(10, -22);
figura.moveTo(10, -24);
figura.moveTo(12, -24);
figura.moveTo(12, -21);
figura.moveTo(13, -21);
figura.moveTo(13, -24);
figura.moveTo(21, -24);
figura.moveTo(21, -22);
figura.moveTo(15, -22);
figura.moveTo(15, -21);
figura.moveTo(18, -21);
figura.moveTo(18, -19);
figura.moveTo(19, -19);
figura.moveTo(19, -21);
figura.moveTo(22, -21);
figura.moveTo(22, -25);
figura.moveTo(-25, -25);
figura.moveTo(-25, 25);
			
				var pared1= new THREE.ExtrudeGeometry(figura,{amount:1,bevelEnabled:false}); //Genero la extrucion de el croquis realizado
				var figura2 = new THREE.Shape();											//Genero un nuevo lienzo
			

figura2.moveTo(-22,25);
figura2.moveTo(-22,24);
figura2.moveTo(-18,24);
figura2.moveTo(-18,22);
figura2.moveTo(-17,22);
figura2.moveTo(-17,24);
figura2.moveTo(-12,24);
figura2.moveTo(-12,22);
figura2.moveTo(-11,22);
figura2.moveTo(-11,24);
figura2.moveTo(-9,24);
figura2.moveTo(-9,20);
figura2.moveTo(-14,20);
figura2.moveTo(-14,22);
figura2.moveTo(-15,22);
figura2.moveTo(-15,20);
figura2.moveTo(-21,20);
figura2.moveTo(-21,22);
figura2.moveTo(-22,22);
figura2.moveTo(-22,19);
figura2.moveTo(-18,19);
figura2.moveTo(-18,11);
figura2.moveTo(-17,11);
figura2.moveTo(-17,19);
figura2.moveTo(-2,19);
figura2.moveTo(-2,22);
figura2.moveTo(-3,22);
figura2.moveTo(-3,20);
figura2.moveTo(-8,20);
figura2.moveTo(-8,24);
figura2.moveTo(-6,24);
figura2.moveTo(-6,22);
figura2.moveTo(-5,22);
figura2.moveTo(-5,24);
figura2.moveTo(0,24);
figura2.moveTo(0,11);
figura2.moveTo(-9,11);
figura2.moveTo(-9,10);
figura2.moveTo(-6,10);
figura2.moveTo(-6,8);
figura2.moveTo(-9,8);
figura2.moveTo(-9,7);
figura2.moveTo(-2,7);
figura2.moveTo(-2,8);
figura2.moveTo(-5,8);
figura2.moveTo(-5,10);
figura2.moveTo(0,10);
figura2.moveTo(0,4);
figura2.moveTo(4,4);
figura2.moveTo(4,2);
figura2.moveTo(0,2);
figura2.moveTo(0,-1);
figura2.moveTo(-2,-1);
figura2.moveTo(-2,3);
figura2.moveTo(-3,3);
figura2.moveTo(-3,-1);
figura2.moveTo(-6,-1);
figura2.moveTo(-6,-6);
figura2.moveTo(-10,-6);
figura2.moveTo(-10,-4);
figura2.moveTo(-8,-4);
figura2.moveTo(-8,-3);
figura2.moveTo(-10,-3);
figura2.moveTo(-10,-1);
figura2.moveTo(-22,-1);
figura2.moveTo(-22,-2);
figura2.moveTo(-11,-2);
figura2.moveTo(-11,-6);
figura2.moveTo(-13,-6);
figura2.moveTo(-13,-4);
figura2.moveTo(-16,-4);
figura2.moveTo(-16,-5);
figura2.moveTo(-14,-5);
figura2.moveTo(-14,-7);
figura2.moveTo(-18,-7);
figura2.moveTo(-18,-4);
figura2.moveTo(-22,-4);
figura2.moveTo(-22,-5);
figura2.moveTo(-19,-5);
figura2.moveTo(-19,-11);
figura2.moveTo(-17,-11);
figura2.moveTo(-17,-13);
figura2.moveTo(-14,-13);
figura2.moveTo(-14,-18);
figura2.moveTo(-16,-18);
figura2.moveTo(-16,-15);
figura2.moveTo(-19,-15);
figura2.moveTo(-19,-16);
figura2.moveTo(-17,-16);
figura2.moveTo(-17,-18);
figura2.moveTo(-19,-18);
figura2.moveTo(-19,-19);
figura2.moveTo(4,-19);
figura2.moveTo(4,-15);
figura2.moveTo(-1,-15);
figura2.moveTo(-1,-16);
figura2.moveTo(3,-16);
figura2.moveTo(3,-18);
figura2.moveTo(-13,-18);
figura2.moveTo(-13,-12);
figura2.moveTo(-16,-12);
figura2.moveTo(-16,-10);
figura2.moveTo(-18,-10);
figura2.moveTo(-18,-8);
figura2.moveTo(-14,-8);
figura2.moveTo(-14,-10);
figura2.moveTo(-13,-10);
figura2.moveTo(-13,-7);
figura2.moveTo(-5,-7);
figura2.moveTo(-5,-2);
figura2.moveTo(2,-2);
figura2.moveTo(2,-1);
figura2.moveTo(1,-1);
figura2.moveTo(1,1);
figura2.moveTo(4,1);
figura2.moveTo(4,-2);
figura2.moveTo(8,-2);
figura2.moveTo(8,-1);
figura2.moveTo(5,-1);
figura2.moveTo(5,8);
figura2.moveTo(3,8);
figura2.moveTo(3,7);
figura2.moveTo(4,7);
figura2.moveTo(4,5);
figura2.moveTo(1,5);
figura2.moveTo(1,24);
figura2.moveTo(21,24);
figura2.moveTo(21,22);
figura2.moveTo(22,22);
figura2.moveTo(22,24);
figura2.moveTo(24,24);
figura2.moveTo(24,17);
figura2.moveTo(22,17);
figura2.moveTo(22,20);
figura2.moveTo(21,20);
figura2.moveTo(21,16);
figura2.moveTo(24,16);
figura2.moveTo(24,14);
figura2.moveTo(22,14);
figura2.moveTo(22,13);
figura2.moveTo(24,13);
figura2.moveTo(24,11);
figura2.moveTo(20,11);
figura2.moveTo(20,13);
figura2.moveTo(18,13);
figura2.moveTo(18,15);
figura2.moveTo(19,15);
figura2.moveTo(19,16);
figura2.moveTo(13,16);
figura2.moveTo(13,15);
figura2.moveTo(17,15);
figura2.moveTo(17,13);
figura2.moveTo(13,13);
figura2.moveTo(13,7);
figura2.moveTo(14,7);
figura2.moveTo(14,12);
figura2.moveTo(19,12);
figura2.moveTo(19,8);
figura2.moveTo(17,8);
figura2.moveTo(17,10);
figura2.moveTo(16,10);
figura2.moveTo(16,7);
figura2.moveTo(20,7);
figura2.moveTo(20,10);
figura2.moveTo(24,10);
figura2.moveTo(24,8);
figura2.moveTo(22,8);
figura2.moveTo(22,7);
figura2.moveTo(24,7);
figura2.moveTo(24,2);
figura2.moveTo(21,2);
figura2.moveTo(21,-1);
figura2.moveTo(22,-1);
figura2.moveTo(22,1);
figura2.moveTo(24,1);
figura2.moveTo(24,-6);
figura2.moveTo(22,-6);
figura2.moveTo(22,-3);
figura2.moveTo(21,-3);
figura2.moveTo(21,-10);
figura2.moveTo(18,-10);
figura2.moveTo(18,-8);
figura2.moveTo(19,-8);
figura2.moveTo(19,-7);
figura2.moveTo(12,-7);
figura2.moveTo(12,-14);
figura2.moveTo(13,-14);
figura2.moveTo(13,-8);
figura2.moveTo(17,-8);
figura2.moveTo(17,-10);
figura2.moveTo(15,-10);
figura2.moveTo(15,-11);
figura2.moveTo(22,-11);
figura2.moveTo(22,-7);
figura2.moveTo(24,-7);
figura2.moveTo(24,-13);
figura2.moveTo(15,-13);
figura2.moveTo(15,-14);
figura2.moveTo(24,-14);
figura2.moveTo(24,-25);
figura2.moveTo(25,-25);
figura2.moveTo(25,25);
figura2.moveTo(-22,25);
				var pared2= new THREE.ExtrudeGeometry(figura2,{amount:1,bevelEnabled:false});    //Genero la extrucion del segundo croquis
				
				THREE.GeometryUtils.merge(forma,pared1);           //Agrego a la geometria forma ambas extruciones para que se vuelva una sola  
				THREE.GeometryUtils.merge(forma,pared2);
				
				var paredTextura = THREE.ImageUtils.loadTexture('http://minkiu117.github.io/rv/ecopiedra.jpg');   //Cargo la textura de las paredes
				paredTextura.wrapS = paredTextura.wrapT = THREE.RepeatWrapping; 	//Defino que la imagen se repita a lo largo de la malla 
				paredTextura.anisotropy=256;										//resalta el detalle de la textura
				var material= new THREE.MeshLambertMaterial({map: paredTextura});//Creo el material de la pared tipo Lambert con la textura dada
				paredTextura.repeat.set( 0.5, 1);					//defines el numero de veces que se repide la textura en la malla
				var pared = new THREE.Mesh(forma,material);         //Crea la malla con la geometria de las paredes y el material de las mismas
				pared.scale.set(1,1,4);							//roto el laberinto a ubicarse en el posicion co respecto a la camara
	      		pared.rotation.y = 3*Math.PI/2;
	      		escena.add(pared);									//agrego la pared a la escena
				
				/////////////////////////////Generacion de el piso////////////////////////////////////
				var pisoTextura = new THREE.ImageUtils.loadTexture( 'http://minkiu117.github.io/rv/piso2.jpg' );		//Carga la textura del piso
		    		pisoTextura.wrapS = pisoTextura.wrapT = THREE.RepeatWrapping; 					//defino que la textura se repia en la malla
			    pisoTextura.repeat.set( 10, 10 );												//defino el nuero de veces que se repitira
			    var pisoMaterial = new THREE.MeshLambertMaterial( { map: pisoTextura, side: THREE.DoubleSide } ); //Crea el material del piso
			    var pisoGeometry = new THREE.PlaneGeometry(50, 50, 1, 1);						//Crea un plano que se ocupara de piso
			    var piso = new THREE.Mesh(pisoGeometry, pisoMaterial);													//Se alinea con las paredes
			    piso.rotation.y = 3*Math.PI/2;
			    escena.add(piso);																//Se agrega a la escena
					
				///////////////////////////////////Generacion de Luz/////////////////////////////////////////////////
				var luzPuntual = new THREE.PointLight(0xFFFFFF,3,150);								//Genera una luz puntual

				luzPuntual.position.x =-70;
				escena.add(luzPuntual);															//Se agrega a la escena
							
				var luzAmbiental = new THREE.AmbientLight(0x111111);							//Se crea una luz ambiental
		     	escena.add(luzAmbiental);														//Se agrega a la escena
		    ////////////////////////////////////////////////////////////////////////////////////////////////////////
		    	var tipo_evento = 'resize';
        		var listener=function(){
				camara.aspect=window.innerWidth/window.innerHeight;
				camara.updateProjectionMatrix();
				renderer.setSize(window.innerWidth,window.innerHeight);
			  }
			  var capturarp=false;
  			window.addEventListener(tipo_evento,listener,capturarp);
			
			Ovni.prototype.sense=function(escena){
			 this.sensor.set(this.position, new THREE.Vector3(Math.cos(this.rotation.z),Math.sin(this.rotation.z),0));
			 //this.sensor2.set(this.position, new THREE.Vector3(Math.sin(this.rotation.z),Math.cos(this.rotation.z),0));
			 var obstaculo = this.sensor.intersectObjects(escena.children,true);
			 //var obstaculo2 = this.sensor2.intersectObjects(environment.children,true);
			 if ((obstaculo.length>0&&(obstaculo[0].distance<=2.2)))
			  this.sensor.colision=true;
			 else
			  this.sensor.colision=false;
			 /*if((obstaculo2.length>0&&(obstaculo2[0].distance<=1)))
			  this.sensor2.colision=true;
			 else
			  this.sensor2.colision=false;*/
			}
			
			Ovni.prototype.plan = function(escena){
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
			   this.actuator.commands.push('Derecho');
			}
			
			Ovni.prototype.act=function(escena){
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
			  step=0.3;
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
			////////////////////////////////////Configuaracion de sensores///////////////////////////////////////
			var reloj = new THREE.Clock();
			var controles = new THREE.FirstPersonControls(camara);
			  controles.movementSpeed = 0;
			  controles.lookSpeed =0;
			  controles.lookVertical = false;
		  	

				////////////////////////////////////////funcion de renderizado////////////////////////////////////////
				function render(){
					controles.update(reloj.getDelta());
					requestAnimationFrame(render);														//Actualiza los controles
					renderer.render(escena,camara);										//Actualiza la escena y la camara
				}
				
				render();	
