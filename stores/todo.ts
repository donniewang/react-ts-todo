import { makeAutoObservable } from 'mobx';

function ToDoStore() {
  return makeAutoObservable({
    todos: [],

    saveToDo() {
      const todoData = JSON.stringify(this.todos);
      localStorage.setItem('TODO', todoData);
      console.log('saveToDo', this.todos);
    },

    loadToDo() {
      const todoData = localStorage.getItem('TODO');
      if (!!todoData) {
        this.todos = JSON.parse(todoData);
      }
      console.log('loadToDo', this.todos);
    },

    addToDo(todo) {
      console.log('addToDo', todo, this.todos);
      this.todos.push(todo);
      console.log('after addToDo', todo, this.todos);
      this.saveToDo();
    },

    modifyToDo(todo) {
      console.log('modifyToDo', todo);
      const index = this.todos.findIndex((item) => item['id'] === todo['id']);
      if (index > -1) {
        this.todos[index] = todo;
        console.log('after modifyToDo', todo, this.todos);
      }
      this.saveToDo();
    },

    removeToDo(todo) {
      console.log('removeToDo', todo);
      const index = this.todos.findIndex((item) => item['id'] === todo['id']);
      if (index > -1) {
        this.todos.splice(index, 1);
      }
      this.saveToDo();
    },

    completeToDo(todo) {
      console.log('completeToDo', todo);
      const index = this.todos.findIndex((item) => item['id'] === todo['id']);
      if (index > -1 && this.todos[index]['status'] == 1) {
        this.todos[index]['status'] = 2;
      }
      this.saveToDo();
    },
  });
}

export default ToDoStore;
