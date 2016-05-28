function setup() {
  
  var esferaForma = new THREE.SphereGeometry(1.5, 100, 100, 0, Math.PI*2, 1*Math.PI/4, Math.PI/2);
  var mediaesferaForma = new THREE.SphereGeometry( 1.5, 100, 100, 0, Math.PI*2, 3*Math.PI/4, Math.PI/2);
  var cilindroForma = new THREE.CylinderGeometry(0.02,0.02,0.8,100);
  var cilindroForma2 = new THREE.CylinderGeometry(0.02,0.02,0.5,100);
  var cilindroForma3 = new THREE.CylinderGeometry(1.15,1,0.2,100);
  
  var esfera1 = new THREE.Mesh(esferaForma);
  var mediaesfera1 = new THREE.Mesh(mediaesferaForma);
  var cilindromalla = new THREE.Mesh( cilindroForma);
  var cilindromalla2 = new THREE.Mesh( cilindroForma2);
  var cilindromalla3 = new THREE.Mesh (cilindroForma3);
  
  cilindromalla.position.y=3.85;
  cilindromalla.position.x=0.13;
  cilindromalla2.position.y=3.6;
  cilindromalla2.position.x=-0.15;
  cilindromalla3.position.y=2.2;
  mediaesfera1.position.y=2.35;
  

  var forma = new THREE.Geometry();
  
  THREE.GeometryUtils.merge(forma, esfera1);
  THREE.GeometryUtils.merge(forma, mediaesfera1);
  THREE.GeometryUtils.merge(forma, cilindromalla);
  THREE.GeometryUtils.merge(forma, cilindromalla2);
  THREE.GeometryUtils.merge(forma, cilindromalla3);
  
  malla = new THREE.Mesh( forma );
  
  escena = new THREE.Scene();
  escena.add( malla );
  
  camara = new THREE.PerspectiveCamera();
  camara.position.z = 10;
  
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
