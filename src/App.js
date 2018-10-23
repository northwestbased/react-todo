import React, { Component } from 'react';
import Todo from './Todo.js'
import './App.scss';

const LOCALSTORAGEKEY = "savedState"

class App extends Component {

  constructor() {
    super()
    this.state = {
      todos: [],
      filter:'all',
    }

    let newState = localStorage.getItem(LOCALSTORAGEKEY)
    if (newState !== null) {
        newState = JSON.parse(newState)
	this.state = newState
    }
    this.createNewTodo = this.createNewTodo.bind(this)
    this.toggleCompleted = this.toggleCompleted.bind(this)
    this.deleteTodo = this.deleteTodo.bind(this)
    this.beginEditing = this.beginEditing.bind(this)
    this.updateTitle = this.updateTitle.bind(this)
    this.clearCompleted = this.clearCompleted.bind(this)
    this.renderTodos = this.renderTodos.bind(this)
    this.componendDidUpdate = this.componentDidUpdate.bind(this)
  }


  createNewTodo(e) {
    if (e.key === 'Enter') {
      let value = e.target.value.trim()
      if (value.length === 0) return

      let todos = this.state.todos
      let newTodo = {
        title: value,
        completed: false,
	      isEditing: false
      }
      
      todos.push(newTodo)
      this.setState({todos:todos})
      e.target.value = ""
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
    if (this.state.todos.length === 0)
	  return

    let completedTodos = []
    let activeTodos = []
    let allTodos = []
    this.state.todos.forEach( (todo, index) => {
      if (todo.completed) {
        completedTodos.push(index)
      } else {
        activeTodos.push(index)
      }
      allTodos.push(index)
    }
    )
    
    if (this.state.filter === "completed") {
      var filteredTodos = completedTodos
    } else if (this.state.filter === "active") {
      filteredTodos = activeTodos
    } else {
      filteredTodos = allTodos
    }

    return (
      <div>
	<div className="todos">
	    {
		filteredTodos.map(key => 
			<Todo 
			  key={key}
			  todoState={this.state.todos[key]} 
			  deleteTodo={() => this.deleteTodo(key)} 
			  toggleCompleted={() => this.toggleCompleted(key)} 
			  beginEditing={() => this.beginEditing(key)} 
			  updateTitle={(e) => this.updateTitle(key, e)}
			/>
		)

	    }
        </div>
        <footer className={this.state.filter}>
	  <div onClick={() => this.setState({filter : "all"})}>All</div>
          <div onClick={() => this.setState({filter : "active"})}>Active</div>
          <div onClick={() => this.setState({filter :"completed"})}>Completed</div>
          <div onClick={this.clearCompleted}>Clear Completed</div>
          <div>{activeTodos.length} left</div>
        </footer>
      </div>
    )
  }
  componentDidUpdate() {
    localStorage.setItem(LOCALSTORAGEKEY, JSON.stringify(this.state))
  }

  render() {
    return (
      <div className="App">
        <header>
	    <h1>Todo List</h1>
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
