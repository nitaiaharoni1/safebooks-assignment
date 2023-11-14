# Game of Life

## Overview

The `GameOfLife` class creates a grid-based game where cells live or die based on a set of rules. The game progresses in turns, and in each turn, cells change their state (alive or dead) based on the number of living neighbors.

## Features

- Customizable grid size
- Automatic game progression with a set interval
- Console-based visualization
- Implementation of Conway's Game of Life rules

## Usage

To use this Game of Life implementation:

1. Import the `GameOfLife` class.
2. Create a new instance with desired rows and columns.
3. Call the `run()` method to start the game.

Example:

```typescript
import { GameOfLife } from './path/to/GameOfLife';

const rows = 10;
const cols = 10;
const game = new GameOfLife(rows, cols);
game.run();
