function Agent(x=0, y=0){
  THREE.Object3D.call(this);
  this.position.x=x;
  this.position.y=y;
}
Agent.prototype=new THREE.Object3D();
Agent.prototype.sense=function(enviroment){};
Agent.prototype.plan=function(enviroment){};
Agent.prototype.act=function(enviroment){};
function Enviroment(){
  THREE.Scene.call(this);
}
Enviroment.prototype=new THREE.Scene();
Enviroment.prototype.sense=function(){
  for(var i=0;i<this.children.length; i++){
    if(this.children[i].sense !==undefined)
      this.children[i].sense(this)
  }
}
Enviroment.prototype.plan=function(){
  for(var i=0;i<this.children.length; i++){
    if(this.children[i].plan !==undefined)
      this.children[i].plan(this)
  }
}
Enviroment.prototype.act=function(){
  for(var i=0;i<this.children.length; i++){
    if(this.children[i].act !==undefined)
      this.children[i].act(this)
  }
}
