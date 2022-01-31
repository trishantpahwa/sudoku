var matrix = [];

for (var i = 1; i <= 9; i++) {
    for (var j = 1; j <= 9; j++) {
        // document.getElementById((i-1)*9+j).value = j; //Columns
        // document.getElementById(i+(j-1)*9).value = j; //Rows
        // document.getElementById((i-1)*9+j).value = (i-1)*9+j; 
    }
}

function getSudoku(type) {
    fetch('https://sugoku.herokuapp.com/board?difficulty=easy').then((response) => {
        return response.json();
    }).then((data) => {
        matrix = [].concat(...data.board);
        for (var i = 0; i < 81; i++) {
            if (matrix[i] != 0 || matrix[i] != "0") {
                document.getElementById(i + 1).value = matrix[i];
            }
        }
    }).catch(function (err) {
        console.warn('Something went wrong.', err);
    });
    // Matrix format:
    // matrix = [3, 0, 6, 5, 0, 8, 4, 0, 0,
    //     5, 2, 0, 0, 0, 0, 0, 0, 0,
    //     0, 8, 7, 0, 0, 0, 0, 3, 1,
    //     0, 0, 3, 0, 1, 0, 0, 8, 0,
    //     9, 0, 0, 8, 6, 3, 0, 0, 5,
    //     0, 5, 0, 0, 9, 0, 6, 0, 0,
    //     1, 3, 0, 0, 0, 0, 2, 5, 0,
    //     0, 0, 0, 0, 0, 0, 0, 7, 4,
    //     0, 0, 5, 2, 0, 6, 3, 0, 0
    // ]
    // matrix = getNewPuzzle();

}

function getRows(matrix) {
    var rows = [];
    for (var i = 0; i < 9; i++) {
        var row = [];
        for (var j = 0; j < 9; j++) {
            row.push(matrix[i * 9 + j]);
        }
        rows.push(row);
    }
    return rows;
}
function getColumns(matrix) {
    var columns = [];
    for (var i = 0; i < 9; i++) {
        var column = [];
        for (var j = 0; j < 9; j++) {
            column.push(matrix[i + j * 9]);
        }
        columns.push(column);
    }
    return columns;
}
function getBoxes(matrix) {
    var boxes = [];
    for (var i = 0; i < 81; i += 27) {  // Rows - 3 at a time
        for (var j = i; j < i + 9; j += 3) {  // Columns - 3 at a time
            var box = [];
            for (var k = j; k < j + 27; k += 9) {
                var smallRow = [];
                for (var l = k; l < k + 3; l++) {
                    smallRow.push(matrix[l]);
                }
                box.push(...smallRow);
            }
            boxes.push(box);
        }
    }
    return boxes;
}

function check() {
    let i = 0, fail = false;
    const rows = getRows(matrix).map((row) => {
        return new Set(row);
    });
    const columns = getColumns(matrix).map((column) => {
        return new Set(column);
    });
    const boxes = getBoxes(matrix).map((box) => {
        return new Set(box);
    })
    for (i = 0; i < 9; i++) {
        if (rows[i].length != 9) {
            fail = true;
            break;
        }
        if (columns[i].length != 9) {
            fail = true;
            break;
        }
        if (boxes[i].length != 9) {
            fail = true;
            break;
        }
    }
    if (fail) alert('Failed');
    else console.log('Passed');
    // const columns = new Set(getColumns(matrix));
    // const boxes = new Set(getBoxes(matrix));
    // if(rows.length == 9 && columns.length == 9 && boxes.length)
}

function solve(type) {
    console.log('Solving');
    const rows = getRows(matrix);
    const columns = getColumns(matrix);
    const boxes = getBoxes(matrix);
    if (type == "bruteforce") {
        const map = [1, 2, 3, 4, 5, 6, 7, 8, 9];
        function check9Elements(arr) {
            
        }
        var i, row, rowData;
        for(row=0;row<9;row++) {
            rowData = [];
            for(i=0;i<9;i++) {
                rowData.push(rows[row][i])
            }
            check9Elements(rowData);
        }
    }
    //     var rowsSets = [ ];
    //     var columnsSets = [ ];
    //     var boxesSets = [ ];
    //     var scores = {
    //         rows: { },
    //         columns: { },
    //         boxes: { }
    //     };
    //     rows.forEach(function(row) {
    //         const _row = row.filter(i => i !=0 || i != (0).toString());
    //         const rowSet = new Set(_row);
    //         scores.rows[rows.indexOf(row)] = rowSet.size;
    //         rowsSets.push(rowSet);
    //     });
    //     columns.forEach(function(column) {
    //         const _column = column.filter(i => i != 0 || i != (0).toString());
    //         const columnSet = new Set(_column);
    //         scores.columns[columns.indexOf(column)] = columnSet.size;
    //         columnsSets.push(columnSet);
    //     });
    //     boxes.forEach(function(box) {
    //         const _box = box.filter(i => i !=0 || i != (0).toString());
    //         const boxSet = new Set(_box);
    //         scores.boxes[boxes.indexOf(box)] = boxSet.size;
    //         boxesSets.push(boxSet);
    //     });
    //     scorecard = { };
    //     for(var i=0;i<81;i++) {
    //         if(matrix[i] == 0) {
    //             scorecard[i] = { };
    //             const row = parseInt(i/9);
    //             const column = parseInt(i%9);
    //             const box = parseInt(row/3) + parseInt(column/3);
    //             const total = scores.rows[row] + scores.columns[column] + scores.boxes[box];
    //             scorecard[i].row = scores.rows[row];
    //             scorecard[i].column = scores.columns[column];
    //             scorecard[i].boxes = scores.boxes[box];
    //             scorecard[i].total = total;
    //         }
    //     }
    //     var maxScore = null;
    //     function returnMaxScore(scorecard) {
    //         for(var score in scorecard) {
    //             if(scorecard[score].total > maxScore || maxScore == null) maxScore = scorecard[score].total;
    //         }
    //     }
    //     returnMaxScore(scorecard);
    //     const priorityQueue = Object.keys(scorecard).filter(key => scorecard[key].total === maxScore).map(key => parseInt(key));
    //     const complete_constraint = [1, 2, 3, 4, 5, 6, 7, 8, 9];
    //     for(var i=0;i<priorityQueue.length;i++) {
    //         const row = parseInt(priorityQueue[i] / 9);
    //         const column = priorityQueue[i] % 9;
    //         const box = parseInt(row/3) + parseInt(column/3);
    //         const rowValues = rows[row];
    //         const columnValues = columns[column];
    //         const boxValues = boxes[box];
    //         var rowPossibilities = new Set(rowValues);
    //         rowPossibilities.delete(0);
    //         rowPossibilities = complete_constraint.filter(x => !Array.from(rowPossibilities).includes(x));
    //         var columnPossibilities = new Set(columnValues);
    //         columnPossibilities.delete(0);
    //         columnPossibilities = complete_constraint.filter(x => !Array.from(columnPossibilities).includes(x));
    //         var boxPossibilities = new Set(boxValues);
    //         boxPossibilities.delete(0);
    //         boxPossibilities = complete_constraint.filter(x => !Array.from(boxPossibilities).includes(x));
    //         const row_col_intersection = rowPossibilities.filter(x => columnPossibilities.includes(x));
    //         const possibilities = row_col_intersection.filter(x => boxPossibilities.includes(x));
    //         console.log(possibilities);
    //         // Update the matrix
    //         // Update scorecard
    //         // Move to next block
    //         // Recursive backtrack
    //     }
    // }

    // function getAllValues() {
    //     for(var i=1;i<=81;i++) {
    //         var val = document.getElementById(i).value;
    //         matrix.push(val);
    //     }
    // }

    // function checkRows() {
    //     var errorRows = [];
    //     for(var i=0;i<9;i++) {
    //         var row = [ ];
    //         for(var j=0;j<9;j++) {
    //             row.push(matrix[i*9+j]);
    //         }
    //         const rowData = new Set(row);
    //         if(rowData.size < 9) {
    //             errorRows[i] = row;
    //         }
    //     }
    //     if(Object.keys(errorRows).length > 0) {
    //         return errorRows;
    //     } else {
    //         return true;
    //     }
    // }

    // function checkColumns() {
    //     var errorColumns = {};
    //     for(var i=0;i<9;i++) {
    //         var col = [ ];
    //         for(var j=0;j<9;j++) {
    //             col.push(matrix[i+j*9]);
    //         }
    //         const columnData = new Set(col);
    //         if(columnData.size < 9) {
    //             errorColumns[i] = col;
    //         }
    //     }
    //     if(Object.keys(errorColumns).length > 0) {
    //         return errorColumns;
    //     } else {
    //         return true;
    //     }
    // }

    // function checkMiniBox() {
    //     var errorBoxes = { };
    //     var boxes = [ ];
    //     for(var i=0;i<81;i+=27) {  // Rows - 3 at a time
    //         for(var j=i;j<i+9;j+=3) {  // Columns - 3 at a time
    //             var box = [ ];
    //             for(var k=j;k<j+27;k+=9) {
    //                 var smallRow = [ ];
    //                 for(var l=k;l<k+3;l++) {
    //                     smallRow.push(matrix[l]);
    //                 }
    //                 box.push(...smallRow);
    //             }
    //             boxes.push(box);
    //         }
    //     }
    //     for(var i=0;i<9;i++) {
    //         const box = boxes[i];
    //         const boxSet = new Set(box);
    //         if(boxSet.size < 9) {
    //             errorBoxes[i] = box;
    //         }
    //     }

    //     if(Object.keys(errorBoxes).length > 0) {
    //         return errorBoxes;
    //     } else {
    //         return true;
    //     }
    // }


    // function submit() {
    //     var flag = true;
    //     getAllValues();
    //     const rows = checkRows();
    //     const columns = checkColumns();
    //     var miniBoxes = checkMiniBox();
    //     if(rows != true) {
    //         flag = false;
    //         console.log('Rows');
    //         console.log(rows);
    //     }
    //     if(columns != true) {
    //         flag = false;
    //         console.log('Columns');
    //         console.log(columns);
    //     }
    //     if(miniBoxes != true) {
    //         flag = false;
    //         console.log('MiniBoxes');
    //         console.log(miniBoxes);
    //     }
    //     if(flag) {
    //         alert('Success');
    //     } else {
    //         alert('Failure');
    //     }
}
