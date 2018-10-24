var puzzleArea;
var puzzlePieces;
var blankX = 300;
var blankY = 300;
var winStatement;

window.onload = function() {
	
  imgName = Math.floor(Math.random() * 4).toString();  
  
  puzzleArea = $("puzzlearea");
  puzzlePieces = puzzleArea.childElements();
  $("shufflebutton").onclick = shuffle;
  $("togglebutton").onclick = toggleNumbers;
  $("refreshbutton").onclick = refreshPage;

  var x = 0;
  var y = 0;
  for(var i = 0; i < puzzlePieces.length; i++){
    puzzlePieces[i].addClassName("puzzlepiece");
	puzzlePieces[i].style.backgroundImage = "url('images/" + imgName + ".png')";
    puzzlePieces[i].style.left = x + "px";
    puzzlePieces[i].style.top = y + "px";
    puzzlePieces[i].style.backgroundPosition = (-x +"px " + -y + "px");
    puzzlePieces[i].observe("click", clickPiece);
    puzzlePieces[i].observe("mouseover", mouseOverPiece);
    puzzlePieces[i].observe("mouseout", mouseOutPiece);
    
    
    if(x == 300){
      x = 0;
      y += 100;
    }
    else{
      x += 100;
    }
  }
  winStatement = document.createElement("div");
  winStatement.className = "win";
  winStatement.innerHTML = "YOU WIN!!";
  winStatement.style.visibility = "hidden";
  $("info").insertBefore(winStatement,$("info").firstChild);
};

//Moves the piece to blank when clicked
function clickPiece(event){
  thisX = this.offsetLeft;
  thisY = this.offsetTop;
  if(isMoveable(thisX, thisY)){
    this.style.left = blankX + "px";
    this.style.top = blankY + "px";
    
    blankX = thisX;
    blankY = thisY;
    checkWin();
  }
}

//Determines whether the piece is movable
function isMoveable(thisX, thisY){
  if(((thisX + 100 == blankX || thisX - 100 == blankX) && thisY == blankY) ||
  ((thisY + 100 == blankY || thisY - 100 == blankY) && thisX == blankX)){
    return true;
  }
  return false;
}

//Chnages appearance when hovering
function mouseOverPiece(event){
  thisX = this.offsetLeft;
  thisY = this.offsetTop;
  if(isMoveable(thisX, thisY)){
    this.addClassName("movablepiece");
  }
}

//Changes apperence of piece when not hovering
function mouseOutPiece(event){
  this.removeClassName("movablepiece");  
}

//Returns a piece based on the specified x and y positions in the parameter
function getPiece(pieceX, pieceY){
  for(var i = 0; i < puzzlePieces.length; i++){
    if(puzzlePieces[i].offsetTop == pieceY && puzzlePieces[i].offsetLeft == pieceX)
      return puzzlePieces[i];
  }
  return null;
}

//Get the neighboring Tiles of the blank space
//Returns an array of the neighbors
function getNeighborsOfBlank(){
  var neighbors = [getPiece(blankX-100, blankY),getPiece(blankX+100, blankY), getPiece(blankX, blankY-100),getPiece(blankX, blankY+100)];
  for(var i = 0; i < neighbors.length; i++){
    if(neighbors[i] == null){
      neighbors.splice(i, 1);
      i--;
    }
  }
  return neighbors;
}

//Shuffles the pieces.Makes 200 moves
function shuffle(){
  for(var i = 0; i < 200; i++){
    var neighbors = getNeighborsOfBlank();
    var piece = getNeighborsOfBlank()[Math.floor(Math.random() * neighbors.length)];
    var tempX = piece.offsetLeft;
    var tempY = piece.offsetTop;
    
    piece.style.left = blankX + "px";
    piece.style.top = blankY + "px";
    
    blankX = tempX;
    blankY = tempY;
  }
  winStatement.style.visibility = "hidden";
}

function toggleNumbers(){
  puzzleArea = $("puzzlearea");
  puzzlePieces = puzzleArea.childElements();

  for(var i = 0; i < puzzlePieces.length; i++){
    puzzlePieces[i].classList.toggle("hideNum");
  }
}

function refreshPage(){
    window.location.reload();
}

//Checks if the win statement should be hidden or visible
function checkWin(){
  var x = 0;
  var y = 0;
  var num = 1;
  var stillChecking = true;
  var won = false;
  while(stillChecking && num != 16){
    if(getPiece(x, y) == null || getPiece(x, y).innerHTML != ("" + num))
      stillChecking = false;
    if(x == 300){
      x = 0;
      y += 100;
    }
    else
      x += 100;
    num ++;
    if(stillChecking && num == 16)
      won = true;
  }
  if(won)
    winStatement.style.visibility = "visible";
  else
    winStatement.style.visibility = "hidden";
}
