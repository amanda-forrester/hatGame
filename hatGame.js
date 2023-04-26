const prompt = require('prompt-sync')({sigint: true});

const hat = '^';
const hole = 'O';
const fieldCharacter = '░';
const pathCharacter = '*';

class Field {
  constructor(fieldArray){
    this.fieldArray = fieldArray;
    this.i = 0;
    this.j = 0;
    this.currentLocation = this.fieldArray[this.i][this.j];
    this.gameGoing = true;
  }
  print() {
    for (let i = 0; i < this.fieldArray.length; i++) {
      console.log(this.fieldArray[i].join(' '));
    }
  }
  winOrLose() {
    if (this.currentLocation === hat) {
      console.log("You won the game!");
      this.gameGoing = false;
    }
    if (this.currentLocation === hole) {
      console.log("You fell in a hole! Waaaa!");
      this.gameGoing = false;
    }
    if (this.currentLocation === undefined) {
      console.log("You went out of bounds!");
      this.gameGoing = false;
    }
  }
userInput() {
  const way = prompt('Which way?');
  if (way === 'l') {
    this.j = this.j - 1;
    this.currentLocation = this.fieldArray[this.i][this.j];
  }
  if (way === 'r') {
    this.j = this.j + 1;
    this.currentLocation = this.fieldArray[this.i][this.j]
  }
  if (way === 'u') {
    this.i = this.i - 1;
    this.currentLocation = this.fieldArray[this.i][this.j];
  }
  if (way === 'd') {
    this.i = this.i + 1;
    this.currentLocation = this.fieldArray[this.i][this.j];
  }
  else if (way != 'r' && way != 'l'  && way != 'd'  && way != 'u') {
    console.log("Please enter a valid direction: r, l, u or d")
  }
}
gamePlay() {
  this.print();
  while (this.gameGoing === true) {
    this.userInput();
    this.winOrLose();
    if (this.gameGoing === true) {
    this.fieldArray[this.i][this.j] = pathCharacter;
    this.print();
    }
  }
}
static generateField(height, width) {
  let options = ['░', '░', 'O'];
  let newField = new Array(height); 
	for (let i = 0; i < height; i++) {
		newField[i] = new Array(width);  
	}    
  for (let i = 0; i < height; i ++){
    for (let j = 0; j < width; j++) {
      newField[i][j] = options[Math.floor(Math.random() * 3)]
    }
  }
  newField[0][0] = pathCharacter;
  let randH = Math.floor(Math.random() * height);
  let randW = Math.floor(Math.random() * width);
  newField[randH][randW] = hat;
  while (randH === 0 && randW === 0) {
    randH = Math.floor(Math.random() * height);
    randW = Math.floor(Math.random() * width);
    newField[randH][randW] = hat;
    newField[0][0] = pathCharacter;
  }
  return newField;
}
}

  

const myField = new Field([
  ['*', '░', 'O', '░', 'O'],
  ['░', 'O', '░', 'O', '░'],
  ['░', 'O', '░', '░', 'O'],
  ['░', '░', 'O', '░', '░'],
  ['O', '░', '^', 'O', '░']
]);

const myFieldTwo = new Field(Field.generateField(16, 18));

myFieldTwo.gamePlay();