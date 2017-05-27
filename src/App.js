import React from 'react';

import Header from './Header';
import TodoList from './TodoList';
import Footer from './Footer';

class App extends React.Component {
  state = {
    todos: [{
      id: 1000,
      text: '치킨에 맥주',
      isDone: false
    }, {
      id: 1001,
      text: '삼겹살에 소주',
      isDone: false
    }, {
      id: 1002,
      text: '떡순튀',
      isDone: false
    }],
    editingId: null
  };

  addTodo = text => {
    this.setState({
      todos: [... this.state.todos, {
        id: Date.now(),
        text,
        isDone: false
      }]
    });
  };
  deleteTodo = id => {
    // state를 직접 자르지 않기 위해 clone을 만들어서 자른뒤 setState 한다.
    const newTodos = [...this.state.todos];
    const deleteIndex = newTodos.findIndex(v => v.id === id);
    console.log(deleteIndex);
    newTodos.splice(deleteIndex, 1);
    this.setState({
      todos: newTodos
    });
  };
  editTodo = id => {
    this.setState({
      editingId: id
    });
  };
  saveTodo = (id, newText) => {
    const newTodos = [...this.state.todos];
    const editIndex = newTodos.findIndex(v => v.id === id);
    newTodos[editIndex] = Object.assign({}, newTodos[editIndex], {
      text: newText
    });
    this.setState({
      todos: newTodos,
      editingId: null
    });
  };
  cancelEdit = () => {
    this.setState({
      editingId: null
    });
  };
  toggleTodo = id => {
    const newTodos = [...this.state.todos];
    const editIndex = newTodos.findIndex(v => v.id === id);
    newTodos[editIndex] = Object.assign({}, newTodos[editIndex], {
      isDone: !newTodos[editIndex].isDone
    });
    this.setState({
      todos: newTodos
    });
  };
  toggleAll = () => {
    //두가지 방법 모두 가능하지만 동작은 some이 빠름
    // const newDone = !this.state.todos.every(v => v.isDone);
    const newDone = this.state.todos.some(v => !v.isDone);
    const newTodos = this.state.todos.map(v =>
      Object.assign({}, v, {
        isDone: newDone
      })
    );
    this.setState({
      todos: newTodos
    });
  };
  clearCompleted = () => {
    const newTodos = this.state.todos.filter(v => !v.isDone);
    this.setState({
      todos: newTodos
    });
  };
  render(){
    const {
      todos,
      editingId,
    } = this.state;

    const activeLength = todos.filter(v => !v.isDone).length;
    const hasCompleted = todos.findIndex(v => v.isDone);

    return (
      <div className="todo-app">
        <Header
          isAllDone={todos.every(v => v.isDone)}
          addTodo={this.addTodo}
          toggleAll={this.toggleAll}
        />
        <TodoList
          todos={todos}
          editingId={editingId}
          deleteTodo={this.deleteTodo}
          editTodo={this.editTodo}
          saveTodo={this.saveTodo}
          cancelEdit={this.cancelEdit}
          toggleTodo={this.toggleTodo}
        />
        <Footer
          activeLength={activeLength}
          hasCompleted={hasCompleted}
          clearCompleted={this.clearCompleted}
        />
      </div>
    );
  }
}

export default App;
