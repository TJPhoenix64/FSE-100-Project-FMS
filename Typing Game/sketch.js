let myInput; 

function setup() {
  createCanvas(400, 400);

   myInput= createInput(); 
  myInput.position(100,300);

}

function draw() {
  background(220);
   fill("white"); 
  rect(25,150,350,50);

 
  
  
  fill("#B8B8FF"); 
  text(String,35,183); 
  String= "Typing practices"; 
  textSize(25); 

  textStyle(BOLD); 

  let msg = myInput.value();
  fill("black");
  text(msg,35,183); 
  
}