let typedText = ""; 

let phrases = [
  "Coding is fun", "Never give up", "Type fast now", "Focus on speed", "Code every day",
  "Make it happen", "Break the loop", "Time is ticking", "Find a way", "Level up now",
  "Keep moving forward", "Practice makes perfect.", "Errors happen often.", "Just keep typing.", "Success takes time.",
  "Stay focused now.", "Think outside boxes.", "Trust the process.", "Start small today.", "Keep it simple.",
  "Learn something new today.", "Dream big and work hard.", "Push your limits every day.", "Count the points you win.", "Beat the ticking game clock.",
  "Watch your fingers fly now.", "Press keyboard key.", "Clear your mind and type.", "You really got this game.", "Game over is coming soon."
]; 

let targetPhrase = ""; 
let showAccurate = false;

  let j=0; 
let showFeedback = false; 
let feedbackSize = 20; 
let home;



function setup() {
  createCanvas(windowWidth, windowHeight);

  nextPhrase(); 
  let button = createButton('NEXT'); 
  button.position((width / 2) +125, (height / 2) +35); 
  button.mousePressed(nextPhrase); 


  home = createButton("Homescreen");
  home.position(windowWidth - 120, 20);
  home.style('background-color', '#e6f4e1');
  home.mousePressed(function () {
    window.location.href = "../index.html";
})
}
                    
function gotolink() {
	window.open('');
}

function draw() {
  background(220);

  fill("white"); 
  rect((width / 2) - 175, (height / 2) - 25, 350, 50);

  textSize(25); 
  textStyle(BOLD); 

  displayTarget(); 
  compare(); 

 

  if(showAccurate === true){
    accurate(); 
  }

  if(showFeedback === true){
    feedback(); 
  }

  
}


function keyPressed(){
  if(key === ENTER){

    if(showAccurate === true){
      nextPhrase();
    }else{
      submit();
    }

  }else if(key === BACKSPACE){

    typedText = typedText.substring(0,typedText.length-1);

  }else if(key.length === 1){

    typedText += key;
  }
  
}


function nextPhrase(){
  targetPhrase = random(phrases); 
  typedText = ""; 
  showAccurate = false;
  showFeedback = false; 
}


function compare(){
  let x = (width / 2) - 170; 
  
  for(let i = 0; i < typedText.length; i++){

    if(typedText[i] === targetPhrase[i]){
      fill("black");
    }else{
      fill("red"); 
    }

    text(typedText[i], x, (height / 2) +10); 

    if(typedText[i] === " "){
      x = x + 7;
    }else{
      x = x + textWidth(targetPhrase[i]);
    }
  }
}


function submit(){
  let c = 0;

  if(typedText.length !== targetPhrase.length){
    c = 3;
  }

  for(let j = 0; j < typedText.length; j++){

    if(typedText[j] !== targetPhrase[j]){
      c = 3;
      
    }
  }

  if(c === 0){
    showAccurate = true;
    j=j+1; 
  }


  if(j===3){
    showFeedback = true; 
    j=0;
  }
}


function displayTarget(){
  let x = (width / 2) - 170; 

  for(let k = 0; k < targetPhrase.length; k++){

    fill("#B8B8FF"); 
    text(targetPhrase[k], x, (height / 2) +10); 

    if(targetPhrase[k] === " "){ 
      x = x + 7; 
    }else{ 
      x = x + textWidth(targetPhrase[k]); 
    }
  }
}


function accurate(){
  fill("#dcf2e8"); 
  rect( (width / 2) -100,  (height / 2) +80, 200, 60, (height / 2) +10); 

  fill("green"); 
  textSize(20); 
  text("100% Accurate", (width / 2) -70, (height / 2) +115);
}

function windowReseized(){
  resizeCanvas(windowWidth, windowHeight); 
}

function feedback(){
push();
  fill("gold"); 
  textStyle(BOLD); 
  textSize(feedbackSize); 
  stroke("black"); 
  strokeWeight(2)

  text("3 PHRASES ACCOMPLISHED!", (width / 2)-220 , (height / 2)-100 );

   
  pop(); 
 if(feedbackSize <30){
    feedbackSize = feedbackSize +0.2; 
  
  
}
}

