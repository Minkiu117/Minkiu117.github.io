var escena = new THREE.Scene(); //Se crea la escena									//Punto mas lejano

				var camara = new THREE.PerspectiveCamera(); //Definicionde la perspectiva de la camara 
				camara.position.x = -70;										//Posicion en Z de la camara 

				var renderer = new THREE.WebGLRenderer();						//Definicion del Render
				renderer.setSize(window.innerWidth*.95, window.innerHeight*.95);		//Definicion del tamaño del lienzo
				document.body.appendChild(renderer.domElement);

				///////////////////////////Generacion de las paredes/////////////////////////////////
				var forma=new THREE.Geometry();													//Creo una geometria vacia llamada forma
				var figura = new THREE.Shape();													//Genero un lienzo en 2D
				
				</script>
				<script src="http://minkiu117.github.io/rv/puntos_pared1.js">//En este .js contengo los puntos de la mitad el laberinto</script>						
				
				<script>
				
				var pared1= new THREE.ExtrudeGeometry(figura,{amount:1,bevelEnabled:false}); //Genero la extrucion de el croquis realizado
				var figura2 = new THREE.Shape();											//Genero un nuevo lienzo
				
				</script>
				<script src="http://minkiu117.github.io/rv/puntos_pared2.js">//En este .js contengo los puntos de la mitad el laberinto</script>
				<script>
				
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