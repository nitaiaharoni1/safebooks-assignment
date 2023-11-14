import { GameOfLife } from './GameOfLife';
import { TGrid } from './types/TCell';
import { blinkerGrid, blockGrid } from './grids';

// const randomGame = new GameOfLife(5, 5);
// randomGame.run();

// const blinkerGame = new GameOfLife(4, 5, blinkerGrid);
// blinkerGame.run();


const blockGame = new GameOfLife(4, 5, blockGrid);
blockGame.run();
