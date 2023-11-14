import { TCell, TGrid } from './types/TCell';

export class GameOfLife {
  private grid: TGrid;
  private rows: number;
  private cols: number;

  private interval: number;

  constructor(rows: number, cols: number, initialGrid?: TGrid) {
    this.rows = rows;
    this.cols = cols;
    this.grid = this.createGrid(rows, cols);

    if (initialGrid) {
      this.setInitialGrid(initialGrid);
    } else {
      this.initRandomGrid();
    }
  }

  public run(): void {
    this.interval = setInterval(() => {
      console.clear();
      this.print();
      this.next();

      if (this.isGameOver()) {
        clearInterval(this.interval);
        console.log('Game Over');
      }
    }, 1000);
  }

  private next(): void {
    const newGrid = this.createGrid(this.rows, this.cols);
    for (let row = 0; row < this.rows; row++) {
      for (let col = 0; col < this.cols; col++) {
        const liveNeighbors = this.countLiveNeighbors(row, col);
        const cell = this.grid[row][col];
        const isAlive = cell === 1;
        // Rule 1: Any live cell with fewer than two live neighbours dies, as if by underpopulation.
        // Rule 3: Any live cell with more than three live neighbours dies, as if by overpopulation.
        if (isAlive && (liveNeighbors < 2 || liveNeighbors > 3)) {
          newGrid[row][col] = 0;
          // Rule 2: Any live cell with two or three live neighbours lives on to the next generation.
        } else if (isAlive) {
          newGrid[row][col] = cell;
        }
        // Rule 4: Any dead cell with exactly three live neighbours becomes a live cell, as if by reproduction
        else if (!isAlive && liveNeighbors === 3) {
          newGrid[row][col] = 1;
        }
      }
    }
    this.grid = newGrid;
  }

  private print(): void {
    for (let row = 0; row < this.rows; row++) {
      let rowStr = '';
      for (let col = 0; col < this.cols; col++) {
        rowStr += this.grid[row][col] === 1 ? '*' : ' ';
      }
      console.log(rowStr);
    }
    console.log('\n');
  }

  private createGrid(rows: number, cols: number): TGrid {
    let grid: TGrid = [];
    for (let i = 0; i < rows; i++) {
      let row: TCell[] = [];
      for (let j = 0; j < cols; j++) {
        row.push(0 as TCell);
      }
      grid.push(row);
    }
    return grid;
  }

  private initRandomGrid(): void {
    for (let row = 0; row < this.rows; row++) {
      for (let col = 0; col < this.cols; col++) {
        this.grid[row][col] = Math.round(Math.random()) as TCell;
      }
    }
  }

  private setInitialGrid(initialGrid: TGrid): void {
    if (initialGrid.length !== this.rows || initialGrid[0].length !== this.cols) {
      throw new Error('Initial grid size does not match the specified rows and columns.');
    }

    for (let row = 0; row < this.rows; row++) {
      for (let col = 0; col < this.cols; col++) {
        this.grid[row][col] = initialGrid[row][col];
      }
    }
  }

  private countLiveNeighbors(row: number, col: number): number {
    let count = 0;
    for (let i = -1; i <= 1; i++) {
      for (let j = -1; j <= 1; j++) {
        // Skip the current cell
        if (i === 0 && j === 0) {
          continue;
        }
        const newRow = row + i;
        const newCol = col + j;
        const isRowOutOfBounds = newRow < 0 || newRow >= this.rows;
        const isColOutOfBounds = newCol < 0 || newCol >= this.cols;
        const isCellAlive = this.grid[newRow]?.[newCol] === 1;
        if (isRowOutOfBounds || isColOutOfBounds || !isCellAlive) {
          continue;
        }
        count++;
      }
    }

    return count;
  }

  private isGameOver(): boolean {
    for (let row = 0; row < this.rows; row++) {
      for (let col = 0; col < this.cols; col++) {
        if (this.grid[row][col] === 1) {
          return false;
        }
      }
    }
    return true;
  }
}