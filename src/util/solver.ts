type SudokuGrid = (number | null)[][];

function solveSudoku(sudoku: SudokuGrid): SudokuGrid | null {
  const emptyCells: [number, number][] = [];

  // Identify empty cells
  for (let i = 0; i < 9; i++) {
    for (let j = 0; j < 9; j++) {
      if (sudoku[i][j] === null) {
        emptyCells.push([i, j]);
      }
    }
  }

  // Rank cells based on the number of possible digits
  emptyCells.sort((a, b) => getPossibleDigits(sudoku, a[0], a[1]).length - getPossibleDigits(sudoku, b[0], b[1]).length);

  return fillCells(sudoku, emptyCells, 0) ? sudoku : null;
}

function getPossibleDigits(sudoku: SudokuGrid, row: number, col: number): number[] {
  const possibleDigits: Set<number> = new Set(Array.from({ length: 9 }, (_, i) => i + 1));

  // Check row and column
  for (let i = 0; i < 9; i++) {
    if (sudoku[row][i] !== null) possibleDigits.delete(sudoku[row][i] as number);
    if (sudoku[i][col] !== null) possibleDigits.delete(sudoku[i][col] as number);
  }

  // Check 3x3 box
  const startRow = Math.floor(row / 3) * 3;
  const startCol = Math.floor(col / 3) * 3;
  for (let i = 0; i < 3; i++) {
    for (let j = 0; j < 3; j++) {
      if (sudoku[startRow + i][startCol + j] !== null) {
        possibleDigits.delete(sudoku[startRow + i][startCol + j] as number);
      }
    }
  }

  return Array.from(possibleDigits);
}

function fillCells(sudoku: SudokuGrid, emptyCells: [number, number][], index: number): boolean {
  if (index === emptyCells.length) {
    return true; // All cells are filled
  }

  const [row, col] = emptyCells[index];
  const possibleDigits = getPossibleDigits(sudoku, row, col);

  for (const digit of possibleDigits) {
    sudoku[row][col] = digit;
    if (fillCells(sudoku, emptyCells, index + 1)) {
      return true;
    }
    sudoku[row][col] = null; // Backtrack
  }

  return false; // No solution found
}

export default solveSudoku;