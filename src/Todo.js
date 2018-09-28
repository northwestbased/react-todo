import React, { Component } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTimesCircle } from '@fortawesome/free-regular-svg-icons'



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
        <button className="x" onClick={this.props.deleteTodo}><FontAwesomeIcon icon={faTimesCircle} /></button>
      </div>
    )
  }
}


export default Todo;
