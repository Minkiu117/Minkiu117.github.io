function setup() {
  
  var esferaFormai = new THREE.SphereGeometry(7, 200, 200, 0, Math.PI*2, Math.PI, .56);
  var esferaFormas = new THREE.SphereGeometry(8, 200, 200, 0, Math.PI*2, 0, .68);
  var mediaesferaForma = new THREE.SphereGeometry( 1.1, 100, 100, 0, Math.PI*2, 3*Math.PI/2, Math.PI/2);
  var cilindroForma = new THREE.CylinderGeometry(0.02,0.02,0.8,100);
  
  var esfera1 = new THREE.Mesh(esferaFormas);
  var esfera2 = new THREE.Mesh(esferaFormai);
  var mediaesfera1 = new THREE.Mesh(mediaesferaForma);
  var cilindromalla = new THREE.Mesh( cilindroForma);
  
  cilindromalla.position.y=3.85;
  cilindromalla.position.x=0;
  mediaesfera1.position.y=2.35;
  esfera2.position.y=8;
  esfera1.position.y=-5.5;

  var forma = new THREE.Geometry();
  
  THREE.GeometryUtils.merge(forma, esfera1);
  THREE.GeometryUtils.merge(forma, esfera2);
  THREE.GeometryUtils.merge(forma, mediaesfera1);
  THREE.GeometryUtils.merge(forma, cilindromalla);
  
  malla = new THREE.Mesh( forma );
  
  escena = new THREE.Scene();
  escena.add( malla );
  
  camara = new THREE.PerspectiveCamera();
  camara.position.z = 12;
  
  renderer = new THREE.WebGLRenderer();
  renderer.setSize( window.innerHeight*.95, window.innerHeight*.95);
  document.body.appendChild( renderer.domElement );
}

function loop() {
  requestAnimationFrame( loop );
  
  //malla.rotation.x += 0.01;
  malla.rotation.y += 0.01;
  
  renderer.render( escena, camara);
}

var escena, camara, render,malla;

setup();
loop();
