var matrix = [ ];



for(var i=1;i<=9;i++) {
    for(var j=1;j<=9;j++) {
        // document.getElementById((i-1)*9+j).value = j; //Columns
        document.getElementById(i+(j-1)*9).value = j; //Rows
    }
}

function getAllValues() {
    for(var i=1;i<=81;i++) {
        var val = document.getElementById(i).value;
        matrix.push(val);
    }
}

function checkColumns() {
    var errorColumns = [];
    for(var i=1;i<=9;i++) {
        var rowData = new Set();
        for(var j=1;j<=9;j++) {
            rowData.add(matrix[(i-1)*9+j]);
        }
        if(rowData.size < 9) {
            errorColumns.push(i);
        }
    }
    if(errorColumns.length > 0) {
        return errorColumns;
    } else {
        return true;
    }
}

function checkRows() {
    var errorRows = [];
    for(var i=1;i<=9;i++) {
        var rowData = new Set();
        for(var j=1;j<=9;j++) {
            rowData.add(matrix[i+(j-1)*9]);
        }
        if(rowData.size < 9) {
            errorRows.push(i);
        }
    }
    if(errorRows.length > 0) {
        return errorRows;
    } else {
        return true;
    }
}

function checkMiniBox() {
    var errorBox = { };
    
}

getAllValues();
// console.log(matrix);
console.log(checkRows());
console.log(checkColumns());