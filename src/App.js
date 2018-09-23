import React, { Component } from 'react';
import Todo from './Todo.js'
import './App.scss';

class App extends Component {

  constructor() {
    super()
    this.state = {
      todos: [],
      filter:'all'
    }
    this.createNewTodo = this.createNewTodo.bind(this)
    this.toggleCompleted = this.toggleCompleted.bind(this)
    this.deleteTodo = this.deleteTodo.bind(this)
    this.beginEditing = this.beginEditing.bind(this)
    this.updateTitle = this.updateTitle.bind(this)
    this.clearCompleted = this.clearCompleted.bind(this)
    this.renderTodos = this.renderTodos.bind(this)
  }


  createNewTodo(e) {
    if (e.key === 'Enter') {
      let todos = this.state.todos
      let newTodo = {
        title: e.target.value,
	completed: false,
	isEditing: false
      }
      
      todos.push(newTodo)
      this.setState({todos:todos})
    }
  }

  toggleCompleted(key) {
    let todos = this.state.todos
    if (todos[key].completed) {
      todos[key].completed = false
    } else {
      todos[key].completed = true
    }
    this.setState({todos:todos})
  }

  deleteTodo(key) {
    let todos = this.state.todos
    todos.splice(key, 1)
    this.setState({todos:todos})
  }

  beginEditing(key) {
    let todos = this.state.todos
    for (let i = 0; i < todos.length; i++) {
      todos[i].isEditing = false
    }
    todos[key].isEditing = true
    this.setState({todos:todos})
  }

  updateTitle(key, e) {
    let todos = this.state.todos
    todos[key].title = e.target.textContent
    this.setState({todos:todos})

  }

  clearCompleted() {
    let todos = this.state.todos
    todos = todos.filter(todo =>
      todo.completed ? false : true
    )
    this.setState({todos:todos})
  }

  renderTodos() {
    if (this.state.todos.length == 0)
	  return

    let filteredTodos = []
    switch(this.state.filter) {
      case "all":
        filteredTodos = this.state.todos
        break;
      case "completed":
        filteredTodos = this.state.todos.filter( todo =>
          todo.completed ? true : false
        )
        break;
      case "active":
        filteredTodos = this.state.todos.filter( todo =>
          todo.completed ? false : true
        )
    }

    return (
      <div>
	<div className="todos">
	    {
		filteredTodos.map( (todoState, key) => 
			<Todo 
			  key={key}
			  todoState={todoState} 
			  deleteTodo={() => this.deleteTodo(key)} 
			  toggleCompleted={() => this.toggleCompleted(key)} 
			  beginEditing={() => this.beginEditing(key)} 
			  updateTitle={(e) => this.updateTitle(key, e)}
			/>
		)

	    }
        </div>
        <footer className={this.state.filter}>
	  <span onClick={() => this.setState({filter : "all"})}>All</span>
          <span onClick={() => this.setState({filter : "active"})}>Active</span>
          <span onClick={() => this.setState({filter :"completed"})}>Completed</span>
          <span onClick={this.clearCompleted}>Clear Completed</span>
        </footer>
      </div>
    )



  }

  render() {
    

    return (
      <div className="App">
        <header>
	    <h1>Todo MVC</h1>
	    <input 
	      type="text" 
	      className="todoInput"
	      placeholder="What needs to be done?"
	      onKeyPress={this.createNewTodo} 
	    />
	      
        </header>
	{this.renderTodos()}
      </div>
    );
  }
}

export default App;
