const { v4: uudiv4 } = require('uuid');

class Task {
    id = '';
    description = '';
    completed = null;

    constructor(description){
        this.id = uudiv4();
        this.description = description;
        this.completed = null;
    }
}

module.exports = Task;
