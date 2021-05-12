const inquirer = require('inquirer');
require('colors');

const Menu = async() =>{

    console.clear();
    console.log(`=======================================================`.green);
    console.log(`           Selecciona una opcion del menu`.green);
    console.log(`=======================================================\n`.green);
    const questionsMenuOptions = [
        {
            type: 'list',
            name: 'option',
            message: '¿Que accion vas a realizar?',
            choices: [
                {
                    value: '1',
                    name: `${`1.`.green} Crear una tarea nueva`,
                },
                {
                    value: '2',
                    name: `${`2.`.green} Listar tareas existentes`,
                },
                {
                    value: '3',
                    name: `${`3.`.green} Tareas completadas`,
                },
                {
                    value: '4',
                    name: `${`4.`.green} Tareas pendientes`,
                },
                {
                    value: '5',
                    name: `${`5.`.green} Completar tareas`,
                },
                {
                    value: '6',
                    name: `${`6.`.green} Borrar tareas`,
                },
                {
                    value: '0',
                    name: `${`0.`.green} Salir`,
                },
            ]
        }
    ];
    const { option } = await inquirer.prompt(questionsMenuOptions);
    console.log(`=======================================================`.green);
    return option
}

const pause = async() =>{
    
    const questionPause = [
        {
            type: 'input',
            name: 'enter',
            message: `Presione ${'ENTER'.green} para continuar ~$`
        }
    ];
    await inquirer.prompt(questionPause);
}

const readInput = async(message) =>{

    const questionInput = [
        {
            type: 'input',
            name: 'description',
            message, 
            validate(value){
                if(value.length === 0){
                    return 'No puedes dejar el campo vacio';
                }
                return true;
            }
        }
    ];
    const { description } = await inquirer.prompt(questionInput);
    return description;
}

const deleteListTask = async(tasks = [] )  => {
    
    const choices = tasks.map( (task, i) => {
        const idx = `${i + 1}`.green;
        return {
            value : task.id,
            name : `${idx} ${task.description}`
        }
    });
    choices.unshift({
        value : '0',
        name : '0'.green +  ' Cancelar'
    })

    const questionDelete = [
        {
            type: 'list',
            name: 'id',
            message: 'Borrar item',
            choices
        }
    ]
    const {  id  } = await inquirer.prompt(questionDelete); 
    return id;
}

const confirm = async(message) => {
    
    const questionConfirm = [
        {
            type: 'confirm',
            name: 'ok',
            message
        }
    ];
    const { ok } = await inquirer.prompt(questionConfirm);
    return ok;
}

const showChecklist = async(tasks = [] )  => {
    
    const choices = tasks.map( (task, i) => {
        const idx = `${i + 1}`.green;
        return {
            value : task.id,
            name : `${idx} ${task.description}`,
            checked: (task.completed)? true : false
        }
    });

    const questionsChecklist = [
        {
            type: 'checkbox',
            name: 'ids',
            message: 'Seleccionar una opcion',
            choices
        }
    ]
    const {  ids  } = await inquirer.prompt(questionsChecklist); 
    return ids;
}

module.exports = {
    Menu, 
    pause, 
    readInput, 
    deleteListTask, 
    confirm,
    showChecklist
}