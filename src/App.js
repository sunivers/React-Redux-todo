import React from 'react';
import axios from 'axios';

import Header from './Header';
import TodoList from './TodoList';
import Footer from './Footer';

const ax = axios.create({
  baseURL: 'http://localhost:2403/todos'
});

class App extends React.Component {
  state = {
    todos: [],
    editingId: null,
    filterName: 'All'
  };

  //로딩순서 willmount -> render -> didmount
  //비동기라서 어차피 렌더는 두번이다. 따라서 ajax 호출시기는 willmount에서 해야 조금이라도 빨리 받을수 있다.

  componentWillMount() {
    ax.get('/')
    .then(res => {
      this.setState({
        todos: res.data
      });
    });
  }


  selectFilter = filterName => {
    this.setState({
      filterName
    });
  }
  addTodo = text => {
    ax.post('/', { text })
    .then(res => {
      this.setState({
        todos: [ ... this.state.todos, res.data]
      });
    });
  };
  deleteTodo = id => {
    // state를 직접 자르지 않기 위해 clone을 만들어서 자른뒤 setState 한다.
    const newTodos = [...this.state.todos];
    const deleteIndex = newTodos.findIndex(v => v.id === id);

    ax.delete(`/${id}`)
    .then(() => {
      newTodos.splice(deleteIndex, 1);
      this.setState({
        todos: newTodos
      });
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

    ax.put(`/${id}`, { text: newText })
    .then(res => {
      newTodos[editIndex] = res.data;
      this.setState({
        todos: newTodos,
        editingId: null
      });
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
    ax.put(`/${id}`, { isDone: !newTodos[editIndex].isDone })
    .then(res => {
      newTodos[editIndex] = res.data;
      this.setState({
        todos: newTodos
      });
    });
  };
  toggleAll = () => {
    //두가지 방법 모두 가능하지만 동작은 some이 빠름
    // const newDone = !this.state.todos.every(v => v.isDone);
    const newDone = this.state.todos.some(v => !v.isDone);
    const axArray = this.state.todos.map(v => (
      ax.put(`/${v.id}`, { isDone: newDone })
    ));

    // axios.all([axios.delete(), axios.put(), promise, ...])
    // .then() //모두 성공하고 나서야 then을 실행함

    axios.all(axArray)
    .then(res => {
      this.setState({
        todos: res.map(v => v.data)
      });
    });
  };
  clearCompleted = () => {
    const newTodos = this.state.todos.filter(v => !v.isDone);
    const axArray = this.state.todos.filter(v => v.isDone)
          .map(v => (
            ax.delete(`/${v.id}`)
          ));

    axios.all(axArray). then(() => {
      this.setState({
        todos: newTodos
      });
    });
  };
  render(){
    const {
      todos,
      editingId,
      filterName
    } = this.state;

    const activeLength = todos.filter(v => !v.isDone).length;
    const hasCompleted = todos.findIndex(v => v.isDone);

    const filteredTodos = filterName === 'All'
      ? todos
      : todos.filter(v => (
        (filterName === 'Active' && !v.isDone)
        || (filterName === 'Completed' && v.isDone)
      ));

    return (
      <div className="todo-app">
        <Header
          isAllDone={todos.every(v => v.isDone)}
          addTodo={this.addTodo}
          toggleAll={this.toggleAll}
        />
        <TodoList
          todos={filteredTodos}
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
          selectFilter={this.selectFilter}
        />
      </div>
    );
  }
}

export default App;
