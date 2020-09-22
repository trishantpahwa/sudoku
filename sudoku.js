var matrix = [ ];

// for(var i=1;i<=9;i++) {
//     for(var j=1;j<=9;j++) {
//         // document.getElementById((i-1)*9+j).value = j; //Columns
//         // document.getElementById(i+(j-1)*9).value = j; //Rows
//         // document.getElementById((i-1)*9+j).value = (i-1)*9+j; 
//     }
// }

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
    var errorBoxes = { };
    var boxes = [ ];
    for(var i=0;i<81;i+=27) {
        for(var j=i;j<i+27;j+=3) {
            var box = [ ];
            for(var k=j;k<i+27;k+=27) {
                box.push(matrix[k]);
                box.push(matrix[k+1]);
                box.push(matrix[k+2]);
            }
            boxes.push(box);
        }
    }
    var finalBoxes = [ ];
    for(var i=0;i<9;i++) {
        box = [ ];
        for(var j=i;j<i+9;j+=3) {
            box.push(boxes[j])
        }
        finalBoxes.push(box);
    }
    boxes = [ ];
    for(var i=0;i<9;i++) {
        box = [ ...finalBoxes[i][0], ...finalBoxes[i][1], ...finalBoxes[i][2] ]
        boxes.push(box);
    }
    for(var i=0;i<9;i++) {
        var boxTest = new Set(boxes[i]);
        if(boxTest.size < 9) {
            errorBoxes[i] = boxes[i];
        }
    }
    console.log(errorBoxes);
    if(errorBoxes.length > 0) {
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
        console.log(rows);
    }
    if(columns != true) {
        flag = false;
        console.log(columns);
    }
    if(miniBoxes != true) {
        flag = false;
        console.log(miniBoxes);
    }
    if(flag) {
        alert('Success');
    } else {
        alert('Failure');
    }
}
