require('colors');
const { Menu, 
        pause, 
        readInput, 
        deleteListTask, 
        confirm, 
        showChecklist} = require('./helpers/menu');
const { Tasks } = require('./models/tasks');
const { saveData, readData } = require('./helpers/savefile');

const main = async() => {

    let option = '';
    const tasks = new Tasks();
    const taskFile = readData();

    if(taskFile){
        tasks.chargeTaskFromArray(taskFile);
    }
    do {
        option = await Menu();
        switch (option) {
            case '1':
                const description = await readInput('Description: ');
                tasks.createTask(description);
            break;
            case '2':
                tasks.existingTaks();
            break;
            case '3':
                tasks.completedTask(true);
            break;
            case '4':
                tasks.completedTask(false);
            break;
            case '5':
                const ids = await showChecklist(tasks.listarray);
                tasks.toggleTask(ids);
            break;
            case '6':
                const id = await deleteListTask( tasks.listarray);
                if ( id !== '0'){
                    const ok = await confirm('¿Estas seguro?');
                    if ( ok ) {
                    tasks.deleteTask(id);
                    console.log(`Tarea borrada correctamente`.green);
                    }
                }
            break;
        }
        saveData(tasks.listarray);
        await pause();
    }while(option !== '0');
}

main();