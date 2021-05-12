const fs = require('fs');

const filedb = './database/data.json';

const saveData = ( data ) => {
    fs.writeFileSync(filedb, JSON.stringify(data));
}

const readData = ( )=>{
    if( !fs.existsSync(filedb)){
        return null;
    }else{
        const info = fs.readFileSync(filedb, {encoding: 'utf-8'});
        const data = JSON.parse(info);
        return data;
    }
}

module.exports = {
    saveData,
    readData
}