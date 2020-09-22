var matrix = [ ];

for(var i=1;i<=9;i++) {
    for(var j=1;j<=9;j++) {
        // document.getElementById((i-1)*9+j).value = j; //Columns
        // document.getElementById(i+(j-1)*9).value = j; //Rows
        document.getElementById((i-1)*9+j).value = (i-1)*9+j; 
    }
}

function getAllValues() {
    for(var i=1;i<=81;i++) {
        var val = document.getElementById(i).value;
        matrix.push(val);
    }
}

function checkRows() {
    var errorRows = [];
    for(var i=0;i<9;i++) {
        var row = [ ];
        for(var j=0;j<9;j++) {
            row.push(matrix[i*9+j]);
        }
        const rowData = new Set(row);
        if(rowData.size < 9) {
            errorRows[i] = row;
        }
    }
    if(Object.keys(errorRows).length > 0) {
        return errorRows;
    } else {
        return true;
    }
}

function checkColumns() {
    var errorColumns = {};
    for(var i=0;i<9;i++) {
        var col = [ ];
        for(var j=0;j<9;j++) {
            col.push(matrix[i+j*9]);
        }
        const columnData = new Set(col);
        if(columnData.size < 9) {
            errorColumns[i] = col;
        }
    }
    if(Object.keys(errorColumns).length > 0) {
        return errorColumns;
    } else {
        return true;
    }
}

function checkMiniBox() {
    var errorBoxes = { };
    var boxes = [ ];
    for(var i=0;i<81;i+=27) {  // Rows - 3 at a time
        for(var j=i;j<i+9;j+=3) {  // Columns - 3 at a time
            var box = [ ];
            var flag = false;
            for(var k=j;k<j+27;k+=9) {
                var smallRow = [ ];
                for(var l=k;l<k+3;l++) {
                    smallRow.push(matrix[l]);
                }
                box.push(...smallRow);
            }
            boxes.push(box);
        }
    }
    for(var i=0;i<9;i++) {
        const box = boxes[i];
        const boxSet = new Set(box);
        if(boxSet.size < 9) {
            errorBoxes[i] = box;
        }
    }
    
    if(Object.keys(errorBoxes).length > 0) {
        return errorBoxes;
    } else {
        return true;
    }
}


function submit() {
    var flag = true;
    getAllValues();
    const rows = checkRows();
    const columns = checkColumns();
    var miniBoxes = checkMiniBox();
    if(rows != true) {
        flag = false;
        console.log('Rows');
        console.log(rows);
    }
    if(columns != true) {
        flag = false;
        console.log('Columns');
        console.log(columns);
    }
    if(miniBoxes != true) {
        flag = false;
        console.log('MiniBoxes');
        console.log(miniBoxes);
    }
    if(flag) {
        alert('Success');
    } else {
        alert('Failure');
    }
}
