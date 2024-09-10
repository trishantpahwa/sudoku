import { useEffect, useState } from "react";

export default function Home() {

  const [value, setValue] = useState<any[][] | never[]>([]);
  const [sudoku, setSudoku] = useState<any[][] | never[]>([]);
  const [solution, setSolution] = useState([]);

  useEffect(() => {
    fetchSudoku();
  }, []);

  async function updateCell(event: React.ChangeEvent<HTMLInputElement>, i: number, j: number) {
    var newSudoku = [...sudoku] as any[][];
    const number = parseInt(event.target.value);
    if (number < 1 || number > 9) {
      event.target.value = "";
      return;
    } else {
      newSudoku[i][j] = parseInt(event.target.value);
      setSudoku(newSudoku);
    }
  };

  async function fetchSudoku(difficulty: string = "easy") {
    const puzzleResponse = await fetch(`/api/sudoku?difficulty=${difficulty}`);
    const puzzleData = await puzzleResponse.json();
    setValue(puzzleData.board);
    setSudoku(puzzleData.board.map((row: any) => row.map((cell: any) => (cell === 0 ? null : cell))));
    const solvedBoard: any = solveSudoku(puzzleData.board.map((row: any) => row.map((cell: any) => (cell === 0 ? null : cell))));
    setSolution(solvedBoard);
    console.log(solvedBoard);
  }

  function submit() {
    const isSolutionCorrect = sudoku.every((row, i) =>
      row.every((cell, j) => cell === solution[i][j])
    );

    if (isSolutionCorrect) {
      alert("Congratulations! You solved the Sudoku.");
    } else {
      alert("Oops! The solution is incorrect. Please try again.");
    }
  }

  function clear() {
    setSudoku(value.map((row: any) => row.map((cell: any) => (cell === 0 ? null : cell))));
  }

  function help() {
    let row = 0;
    let col = 0;
    for (let i = 0; i < sudoku.length; i++) {
      for (let j = 0; j < sudoku[i].length; j++) {
        if (sudoku[i][j] === null) {
          row = i;
          col = j;
          break;
        }
      }
    }
    alert(`Row starts from 0 to 9\n\nRow: ${row} Column: ${col} Value: ${solution[row][col]}`);
  }

  return (
    <div className="w-full flex flex-col justify-center">
      <h1 className="text-center text-3xl font-bold">Sudoku</h1>
      <table className="flex border-collapse border border-black p-5 justify-center">
        <tbody>
          {sudoku.map((row: any, i: number) => (
            <tr key={i}>
              {row.map((cell: any, j: number) => (
                <td
                  key={j}
                  className={`border border-black w-8 h-8 text-center ${i % 3 === 2 ? 'border-b-2' : ''} ${j % 3 === 2 ? 'border-r-2' : ''} ${i === 0 ? 'border-t-2' : ''} ${j === 0 ? 'border-l-2' : ''}`}
                >
                  <input type="text" value={cell || ""} readOnly={cell ? true : false} onChange={(e) => updateCell(e, i, j)} className="w-8 h-8 sm:w-12 sm:h-12 p-2 text-center" />
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
      <div className="w-full flex justify-center gap-10 p-5">
        <button className="w-20 md:w-32 border-2 p-2 border-black rounded-md font-semibold" onClick={submit}>Submit</button>
        <button className="w-20 md:w-32 border-2 p-2 border-black rounded-md font-semibold" onClick={clear}>Clear</button>
        <button className="w-20 md:w-32 border-2 p-2 border-black rounded-md font-semibold" onClick={help}>Help</button>
      </div>
      <div className="h-20 w-full bg-white ad">

      </div>
    </div>
  );
}
