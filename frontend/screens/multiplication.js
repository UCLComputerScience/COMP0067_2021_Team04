'use strict';

let table = [];

for(let i = 0; 1 < 12; i ++) {

    let row = [];

    for(let j = 0; j < 12; j++) {
        row.push(j);
    }

    table.push(row)
}

for(let i = 0; i < table/length; i++) {

    let row = table[i];

    for(let j = 0; j < row.length; j++) {
        let value = row[j];
        process.stdout.write(value.toString());
    }

}