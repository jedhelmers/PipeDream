class PipeDream {
  constructor(N, M) {
    this.N = N
    this.M = M
    this.grid = this.createGrid()
    this.onDeck = []
    this.currentPiece = "0"
    this.path = []
    this.circum = [[-1, -1],[-1, 0],[-1, 1],[0, -1],[0, 1],[1, -1],[1, 0],[1, 1]]
    this.cnt = 0
    this.direction = 0
    this.startPoint = [Math.floor(Math.random() * Math.floor(this.M - 2)) + 3, Math.floor(Math.random() * Math.floor(this.N - 2)) + 3]
    this.setUp()
  }

  setUp() {
    this.createGrid()
    this.placeStart()
    this.getNextPiece()
  }

  start() {
    this.tracePath(this.startPoint[0], this.startPoint[1])
    console.log(this.startPoint)
  }

  dropPiece(x, y, p) {
    x = x - x % 3
    y = y - y % 3
    if(this.piece === 'start') {
      this.startPoint = [x, y]
    }
    if(this.grid[x][y] === null) {
      for(let i = 0; i < p.length; i++) {
        for(let j = 0; j < p.length; j++) {
          this.grid[x + i][y + j] = p[i][j]
        }
      }
    }
    this.printBoard()
  }

  tracePath(x, y) {
    setTimeout(() => {
      let isEnd = 0
      if(this.grid[x][y] === 1) {
        this.grid[x][y] = -1
        this.path.push([x, y])
        // console.log([x, y])
        if(x < this.M - 1) {
          this.tracePath(x + 1, y)
        }
        if(y < this.N - 1) {
          this.tracePath(x, y + 1)
        }
        if(x > 0) {
          this.tracePath(x - 1, y)
        }
        if(y > 0) {
          this.tracePath(x, y - 1)
        }
      }
    }, 1000)
    this.printBoard()
  }

  createGrid() {
    let grid = []
    for(let i = 0; i < this.M; i++) {
      let row = []
      for(let j = 0; j < this.N; j++) {
        row.push(null)
      }
      grid.push(row)
    }
    this.grid = grid
  }

  placeStart() {
    this.dropPiece(this.startPoint[0], this.startPoint[1], new PipePiece('start').grid)
  }

  getDirection(str) {
    let x = str.slice(-1)
    switch(x) {
      case "0":
        return "u"
      case "1":
        return "r"
      case "2":
        return "d"
      case "3":
        return "l"
    }
  }

  getPiece(str) {
    let x = str.slice(0, 1)
    switch(x) {
      case "0":
        return "start"
      case "1":
        return "cross"
      case "2":
        return "straight"
      case "3":
        return "elbow"
    }
  }

  getNextPiece() {
    this.currentPiece = this.onDeck.pop()
    this.loadAnotherPiece()
  }

  loadAnotherPiece() {
    this.onDeck.unshift(this.generatePiece())
  }

  generatePiece() {
    return `${Math.floor(Math.random() * Math.floor(3)) + 1}.${Math.floor(Math.random() * Math.floor(4))}`
  }


  printBoard() {
    console.clear()
    console.table(this.grid)
  }

}
