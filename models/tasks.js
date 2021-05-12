const Task = require('./task');

class Tasks {
    _list = {};
    // uso de get para retornar un nuevo arreglo y se llena medienata la funcion Object
    get listarray(){
        const list = [];
        Object.keys(this._list).forEach(key => {
            const task = this._list[key];
            list.push(task);
        });
        return list;
    }
    
    constructor() {
        this._list = {};
    }

    chargeTaskFromArray(tasks = []){
        tasks.forEach(task => {
            this._list[task.id] = task;
        });
    }

    createTask(description = ''){
        
        const task = new Task(description);
        this._list[task.id] = task;
    }
    // Tasks => Completed = green | In Progress = orange
    // 1. Task :: =>  completed | In progress
    existingTaks(){
        this.listarray.forEach( (task, i) => {
            const id = `${i + 1}`.green;
            const { description, completed} = task;
            const status = (completed)
                ? `Completed`.green
                : `In Progress`.yellow;
            console.log(`${id} :: ${description} -> ${status}`);
        });
    }

    completedTask( completedIn = true ){
        let  counter = 0;
        this.listarray.forEach( ( task ) => {
            
            const { description, completed} = task;
            const status = (completed)
                ? `Completed`.green
                : `In Progress`.yellow;
            if (completedIn) {
                if (completed){
                    counter += 1;
                    console.log(`${counter.toString().green}. ${description} -> ${completed.green}`);
                }
            }else{
                if ( !completed ){
                    counter += 1;
                    console.log(`${counter.toString().green}. ${description} -> ${status}`);
                }
            }
        });
    }

    deleteTask( id = ' ') {
        if (this._list[id]){
            delete this._list[id];
        }
    }

    toggleTask(ids = []){
        ids.forEach(id =>{
            const task = this._list[id];
            if ( !task.completed) {
                task.completed = new Date().toISOString()
            }
        });
        this.listarray.forEach(task =>{
            if ( !ids.includes(task.id)){
                this._list[task.id].completed = null;
            }
        });
    }

}

module.exports = {
    Tasks: Tasks
};