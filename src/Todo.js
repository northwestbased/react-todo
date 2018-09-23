import React, { Component } from 'react';


class Todo extends Component {

  render() {
    return (
      <div className="todo"> 
	<input 
	  onChange={this.props.toggleCompleted} 
	  type="checkbox" 
	  checked={this.props.todoState.completed}
        />
  <span 
	  className={"title " + (this.props.todoState.completed ? "completed" : "")}
	  onDoubleClick={this.props.beginEditing}
	  contentEditable={(this.props.todoState.isEditing ? 'true' : '')}
	  onBlur={this.props.updateTitle}
	>
	  {this.props.todoState.title}
	</span>
        <button class="x" onClick={this.props.deleteTodo}>X</button>
      </div>
    )
  }
}


export default Todo;
