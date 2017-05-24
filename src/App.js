import React from 'react';

import Header from './Header';
import TodoList from './TodoList';
import Footer from './Footer';

class App extends React.Component {
  constructor() {
    super();
    this.state = {
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
        isDone: true
      }]
    };
  }
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
  render(){
    return (
      <div className="todo-app">
        <Header
          addTodo={this.addTodo}
        />
        <TodoList
          todos={this.state.todos}
          deleteTodo={this.deleteTodo}
        />
        <Footer />
      </div>
    );
  }
}

export default App;
