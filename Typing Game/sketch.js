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
let score= 100; 
let showDeduct= false; 
let deductTimer= 0;
let letterSpacing =18; 


function setup() {
  createCanvas(windowWidth, windowHeight);

  nextPhrase(); 
  let button = createButton('NEXT'); 
  button.position((width / 2) +125, (height / 2) +35); 
  button.mousePressed(nextPhrase); 


  home = createButton("Homescreen");
  home.position(windowWidth - 720, 20);
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
  rect((width / 2)-250 , (height / 2) - 25, 500, 50);

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


  if(showDeduct===true){
      fill("red");
  textSize(20);
  text("-2%", (width / 2) + 280, (height / 2)+10);

    deductTimer= deductTimer -1; 

    if(deductTimer<=0){
      showDeduct=false; 
    }
  }

 fill("white"); 
  rect(5,  60,300, 90,(height /2) ); 

  fill("black"); 
  textSize(15); 
  text("Type the phrase with keyboard", 20, 100);
   text("Press enter when finished one phrase", 20, 120);

  
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

    if(typedText.length< targetPhrase.length){

       if(key !== targetPhrase[typedText.length]){
      deduct();
    }

    typedText += key;}
  }
  
}


function nextPhrase(){
  targetPhrase = random(phrases); 
  typedText = ""; 
  showAccurate = false;
  showFeedback = false;
  score =100; 
}


function compare(){
  textSize(30);
  let  x = (width / 2)-220 ;
  
  for(let i = 0; i < typedText.length; i++){

    if(typedText[i] === targetPhrase[i]){
      fill("black");
    }else{
      fill("red"); 
    
    }

    text(typedText[i], x, (height / 2) +10); 

    if(targetPhrase[i] === " "){
      
      x = x + 10;
    }else{
      x = x + textWidth(targetPhrase[i])+2;
    }
  }
}

function deduct(){
  score= score-2; 
  showDeduct = true; 
  deductTimer = 50; 
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
  let x = (width / 2) - 220; 

  for(let k = 0; k < targetPhrase.length; k++){

    fill("#B8B8FF"); 
    textSize(30);
    text(targetPhrase[k], x, (height / 2) +10); 

    if(targetPhrase[k] === " "){ 
      x = x + 10; 
    }else{ 
      x = x + textWidth(targetPhrase[k])+2; 
    }
  }
}


function accurate(){
  fill("#dcf2e8"); 
  rect( (width / 2) -100,  (height / 2) +80, 200, 60, (height / 2) +10); 

  fill("green"); 
  textSize(20); 
  text(score+ "% Accurate", (width / 2) -70, (height / 2) +115);
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


