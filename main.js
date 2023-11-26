const prompt = require("prompt-sync")({ sigint: true });

const hat = "^";
const hole = "O";
const fieldCharacter = "░";
const pathCharacter = "*";

let gameOn = true;

class Field {
  constructor(field) {
    this._field = field;
    this._heightPosition = 0;
    this._widthtPosition = 0;
  }
  print() {
    let output = "";
    for (let i = 0; i < this._field.length; i++) {
      for (let j = 0; j < this._field[i].length; j++) {
        output += this._field[i][j];
      }
      output += "\n";
    }
    console.log(output);
  }
  checkOutput() {
    if (
      this._heightPosition < 0 ||
      this._heightPosition > this._field.length - 1 ||
      this._widthtPosition < 0 ||
      this._widthtPosition > this._field[this._heightPosition].length
    ) {
      console.log("You went out of the map GAME OVER");
      return "GAME_OVER";
    }
    if (this._field[this._heightPosition][this._widthtPosition] === hole) {
      console.log("You fell down a hole");
      return "GAME_OVER";
    } else if (
      this._field[this._heightPosition][this._widthtPosition] === hat
    ) {
      console.log("You find the hat! you WON!");
      return "WIN";
    } else {
      this._field[this._heightPosition][this._widthtPosition] = pathCharacter;
      this.print();
      return "CONTINUE";
    }
  }
  generateField() {}
  move(movement) {
    let result = "";
    switch (movement) {
      case "u":
        this._heightPosition = this._heightPosition - 1;
        break;
      case "d":
        this._heightPosition = this._heightPosition + 1;
        break;
      case "l":
        this._widthtPosition = this._widthtPosition - 1;
        break;
      case "r":
        this._widthtPosition = this._widthtPosition + 1;
        break;
      default:
        console.log(
          "Bad input you should use u|d|l|r u:up d:down l: left or r: right"
        );
        return "CONTINUE";
    }
    this.checkOutput() === "CONTINUE" ? (gameOn = true) : (gameOn = false);
  }

  static generateField(fieldHeight, fieldWidth, percentage) {
    let fieldGenerated = [];
    let numberOfHoles = Math.floor(
      (fieldHeight * fieldWidth * percentage) / 100
    );
    let holePositions = [];
    let includedHolePosition = false;
    let randomHole = 0;
    let contPosicion = 0;

    //Throw an  exception for 0 height or widht of the field.
    if (fieldHeight === 0 || fieldWidth === 0) {
      throw new Error("Field Height And fieldWidth cant be zero");
    }

    //Generate the hole Array with no Duplicate numbers
    for (let i = 0; i < numberOfHoles; i++) {
      randomHole =
        Math.floor(Math.random() * (fieldHeight * fieldWidth - 2)) + 1;      
      if (holePositions.includes(randomHole)) {
        while (holePositions.includes(randomHole)) {
          randomHole =
            Math.floor(Math.random() * (fieldHeight * fieldWidth - 2)) + 1;
        }
      } else {
        holePositions.push(randomHole);
      }
    }

    //Arrange the field
    for (let i = 0; i < fieldHeight; i++) {
      fieldGenerated.push([]);
      for (let j = 0; j < fieldWidth; j++) {
        if (i === 0 && j === 0) {
          fieldGenerated[i].push(pathCharacter);
        } else if (i === fieldHeight - 1 && j === fieldWidth - 1) {
          fieldGenerated[i].push(hat);
        } else {
          if (holePositions.includes(contPosicion)) {            
            fieldGenerated[i].push(hole);
          } else {
            fieldGenerated[i].push(fieldCharacter);
          }
        }        
        contPosicion++;
      }
    }    
    return fieldGenerated;
  }
}

/*const myField = new Field([
  ["*", "░", "O"],
  ["░", "O", "░"],
  ["░", "^", "░"],
]);*/

function game() {  
  let myField = new Field(Field.generateField(5,3,20))
  while (gameOn) {
    myField.move(
      prompt(
        "Please select direction which you want to move: up|down|left|right: "
      )
    );
  }
}

game();

