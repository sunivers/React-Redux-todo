import React from 'react';
import ClassNames from 'classnames';

class Todo extends React.Component {
  //생명주기에 의한 함수 호출 (렌더 끝났을 때)
  componentDidUpdate(prevProps) {
    if(this.props.isEditing && !prevProps.isEditing) {
      this._inputDom.focus();
      this._inputDom.value = this.props.text;
    }
  }
  /*handleDoubleClick = e => {
    this.props.editTodo();
    //editTodo()실행과정이 복잡하기 때문에 동기식 함수호출로 하단의 함수가 먼저 실행될 수 있음.
    //그래서 focus()는 setTimeout 해야함.
    setTimeout(()=>this._inputDom.focus(), 50);
  }*/
  handleKeyDown = e => {
    const text = e.target.value;
    if(!text || e.keyCode !== 13) {
      return;
    }
    this.props.saveTodo(text);
    // e.target.value = '';
  }

  render(){
    const {
      text,
      isEditing,
      isDone,
      isTemporal,
      editTodo,
      deleteTodo,
      cancelEdit,
      toggleTodo
    } = this.props;
    return (
      <li className={ClassNames('todo-item', {
        editing: isEditing,
        completed: isDone,
        temporal: isTemporal
      })}>
        <button
          className="toggle"
          onClick={toggleTodo}
        />
        <div className="todo-item__view">
          <div
            className="todo-item__view__text"
            onDoubleClick={editTodo}
            >{text}</div>
          <button
            className="todo-item__destroy"
            onClick={deleteTodo}
          />
        </div>
        <input
          type="text"
          ref={ref => this._inputDom = ref}
          className="todo-item__edit"
          onKeyDown={e => this.handleKeyDown(e)}
          onBlur={cancelEdit}
        />
      </li>
    );
  }
}

export default Todo;
