import React, { Component } from 'react';


class Todo extends Component {

  render() {
    return (
      <div className="todo"> 
	<span onClick={this.props.toggleCompleted}>C</span> - 
        <span 
	  className={"title " + (this.props.todoState.completed ? "completed" : "")}
	  onDoubleClick={this.props.beginEditing}
	  contentEditable={(this.props.todoState.isEditing ? 'true' : '')}
	  onBlur={this.props.updateTitle}
	>
	  {this.props.todoState.title}
	</span>
        - <span onClick={this.props.deleteTodo}>D</span>
      </div>
    )
  }
}


export default Todo;
