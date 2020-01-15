class PipePiece {
  constructor(piece = 'start', direction = 'r') {
    this.piece = piece
    this.direction = direction
    this.click = 0
    this.emptyGrid = [
      [0, 0, 0],
      [0, 0, 0],
      [0, 0, 0]
    ]
    this.grid = []

    this.setUp()
  }

  setUp() {
    this.grid = this.grabPiece()
    this.rotatePiece()

  }

  rotatePiece() {
    switch(this.direction) {
      case 'r':
        this.rotateArr()
        this.rotateArr()
        this.rotateArr()
        break
      case 'd':
        this.rotateArr()
        this.rotateArr()
        break
      case 'l':
        this.rotateArr()
        break
      default:
        break
    }
  }

  grabPiece() {
    switch(this.piece) {
      case "start":
        return [
          [0, 0, 0],
          [0, 1, 1],
          [0, 0, 0]
        ]
        break
      case "cross":
        return [
          [0, 1, 0],
          [1, 1, 1],
          [0, 1, 0]
        ]
        break
      case "straight":
        return [
          [0, 1, 0],
          [0, 1, 0],
          [0, 1, 0]
        ]
        break
      case "elbow":
        return [
          [0, 1, 0],
          [0, 1, 1],
          [0, 0, 0]
        ]
        break
    }
  }

  rotateArr() {
    let lenx = this.grid.length
    let leny = this.grid[0].length
    let newArr = []
    for(let i = 0; i < lenx; i++) {
      let row = []
      for(let j = 0; j < leny; j++) {
        row.push(0)
      }
      newArr.push(row)
    }

    for(let i = 0; i < lenx; i++) {
      for(let j = 0; j < leny; j++) {
        newArr[i][j] = this.grid[j][lenx - 1 - i]
      }
    }

    this.grid = newArr
  }
}
