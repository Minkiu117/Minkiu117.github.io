Robot.prototype.act(enviroment){
  var comand=this.actuator.commands.pop();
  if(command===undefined)
  console.log('Undefined command');
  else if(command in this.operations)
  this.operations[command](this);
  else
  console.log('Unknown command');
};

Robot.prototype.operations={};

Robot.prototype.operations.goStraight=function(robot, distance){
  if (distance===undefined)
  distance=.05;
  robot.position.x += distance*Math.cos(robot.rotation.z);
  robot.position.y += distance*Math.sin(robot.rotation.z);
  
