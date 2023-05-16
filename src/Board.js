export default class Board {
  //todo min board siza 10x15
  constructor(rows, cols) {
    this.board = this.createBoardOfSize(rows, cols);
  }

  setCell = (i, j, value) => {
    this.board[i][j] = value;
  };

  createBoardOfSize = (rows, cols) => {
    let newBoard = new Array(rows);

    for (let i = 0; i < rows; i++) {
      let row = new Array(cols);
      for (let j = 0; j < cols; j++) {
        row[j] = 0;
      }
      newBoard[i] = row;
    }

    return newBoard;
  };

  resetBoard = () => {
    this.board = this.createBoardOfSize(10, 15);
  };

  increaseBoardSizeIfNeeded = () => {
    let x_increased = 0;
    let y_increased = 0;

    x_increased = this.addRowToTopIfNeeded();
    this.addRowToBottomIfNeeded();

    y_increased = this.addColumnToLeftIfNeeded();
    this.addColumnToRightIfNeeded();

    return [x_increased, y_increased];
  };

  addRowToBottomIfNeeded = () => {
    for (let i = 0; i < this.board[0].length; i++) {
      if (this.board[this.board.length - 1][i]) {
        this.board.push(new Array(this.board[0].length).fill(0));
        break;
      }
    }
  };

  addColumnToLeftIfNeeded = () => {
    for (let i = 0; i < this.board.length; i++) {
      if (this.board[i][0]) {
        for (let j = 0; j < this.board.length; j++) {
          this.board[j].unshift(0);
        }
        return 1;
      }
    }
    return 0;
  };

  addColumnToRightIfNeeded = () => {
    for (let i = 0; i < this.board.length; i++) {
      if (this.board[i][this.board[0].length - 1]) {
        for (let j = 0; j < this.board.length; j++) {
          this.board[j].push(0);
        }
        break;
      }
    }
  };

  addRowToTopIfNeeded = () => {
    for (let i = 0; i < this.board.length; i++) {
      if (this.board[0][i]) {
        this.board.unshift(new Array(this.board[0].length).fill(0));
        return 1;
      }
    }
    return 0;
  };

  firstAndLastElemCoords = () => {
    let firstXIndex = this.board.length;
    let lastXIndex = 0;
    let firstYIndex = this.board[0].length;
    let lastYIndex = 0;

    let boardIsEmpty = true;

    this.board.forEach((row, x) => {
      row.forEach((col, y) => {
        if (this.board[x][y]) {
          x < firstXIndex ? (firstXIndex = x) : firstXIndex;
          x > lastXIndex ? (lastXIndex = x) : lastXIndex;

          y < firstYIndex ? (firstYIndex = y) : firstYIndex;
          y > lastYIndex ? (lastYIndex = y) : lastYIndex;

          boardIsEmpty = false;
        }
      });
    });

    return boardIsEmpty
      ? [
          [0, 10],
          [0, 15],
        ]
      : [
          [firstXIndex, lastXIndex],
          [firstYIndex, lastYIndex],
        ];
  };

  cleanupOuterRows = () => {
    let coords = this.firstAndLastElemCoords(this.board);

    this.cleanUpXAxis(coords[0][0], coords[0][1]);
    this.cleanUpYAxis(coords[1][0], coords[1][1]);
  };

  cleanUpXAxis = (firstXIndex, lastXIndex) => {
    this.board = this.board.slice(
      firstXIndex < 2 ? 0 : firstXIndex - 2,
      lastXIndex + 3
    );
  };

  cleanUpYAxis = (firstYIndex, lastYIndex) => {
    for (let i = 0; i < this.board.length; i++) {
      this.board[i] = this.board[i].slice(
        firstYIndex < 2 ? 0 : firstYIndex - 2,
        lastYIndex + 3
      );
    }
  };

  neighbourCoords = [
    [-1, -1],
    [-1, 0],
    [-1, 1],
    [0, -1],
    [0, 1],
    [1, -1],
    [1, 0],
    [1, 1],
  ];

  neighbourCount = (i, j) => {
    return this.neighbourCoords.filter((coords) => {
      let x = i + coords[0];
      let y = j + coords[1];
      return (
        x < this.board.length &&
        x > -1 &&
        y < this.board[0].length &&
        y > -1 &&
        this.board[x][y] === 1
      );
    }).length;
  };

  decideCellFate = (value, neighbourCount) => {
    if (value === 1 && !(neighbourCount === 2 || neighbourCount === 3)) {
      return 0;
    } else if (value === 0 && neighbourCount === 3) {
      return 1;
    }
    return value;
  };

  nextState = () => {
    let sizeIncreased = this.increaseBoardSizeIfNeeded();

    this.cleanupOuterRows();

    let xcoordIncrease = sizeIncreased[0];
    let ycoordIncrease = sizeIncreased[1];

    let newGameBoard = this.createBoardOfSize(
      this.board.length + xcoordIncrease,
      this.board[0].length + ycoordIncrease
    );

    for (let i = 0; i < this.board.length; i++) {
      for (let j = 0; j < this.board[0].length; j++) {
        newGameBoard[i + xcoordIncrease][j + ycoordIncrease] =
          this.decideCellFate(this.board[i][j], this.neighbourCount(i, j));
      }
    }

    this.board = newGameBoard;
  };

  addShape = (shape) => {
    switch (shape) {
      case "block": {
        this.drawShape(this.blockCoords);
        break;
      }
      case "beehive": {
        this.drawShape(this.beeHiveCoords);
        break;
      }
      case "loaf": {
        this.drawShape(this.loafCoords);
        break;
      }
      case "tub": {
        this.drawShape(this.tubCoords);
        break;
      }
      case "blinker": {
        this.drawShape(this.blinkerCoords);
        break;
      }
      case "beacon": {
        this.drawShape(this.beaconCoords);
        break;
      }
      case "glider": {
        this.drawShape(this.gliderCoords);
        break;
      }
      case "lwss": {
        this.drawShape(this.lwssCoords);
        break;
      }
      default: {
        console.log("i dont know that shape yet!");
      }
    }
  };

  drawShape = (shapeCoords) => {
    let x = Math.floor(this.board.length / 2);
    let y = Math.floor(this.board[0].length / 2);

    shapeCoords.forEach((coord) => {
      this.setCell(x + coord[0], y + coord[1], 1);
    });
  };

  blockCoords = [
    [0, 0],
    [0, 1],
    [1, 0],
    [1, 1],
  ];

  beeHiveCoords = [
    [0, 1],
    [0, 2],
    [1, 0],
    [1, 3],
    [2, 1],
    [2, 2],
  ];

  loafCoords = [
    [0, 1],
    [0, 2],
    [1, 0],
    [1, 3],
    [2, 1],
    [2, 3],
    [3, 2],
  ];

  tubCoords = [
    [0, 1],
    [1, 0],
    [1, 2],
    [2, 1],
  ];

  blinkerCoords = [
    [0, 0],
    [1, 0],
    [2, 0],
  ];

  beaconCoords = [
    [0, 0],
    [0, 1],
    [1, 0],
    [1, 1],
    [2, 2],
    [2, 3],
    [3, 2],
    [3, 3],
  ];

  gliderCoords = [
    [0, 1],
    [1, 2],
    [2, 0],
    [2, 1],
    [2, 2],
  ];

  lwssCoords = [
    [0, 1],
    [0, 4],
    [1, 0],
    [2, 0],
    [2, 4],
    [3, 0],
    [3, 1],
    [3, 2],
    [3, 3],
  ];
}
