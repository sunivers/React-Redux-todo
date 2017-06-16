import React from 'react';
import axios from 'axios';
import update from 'immutability-helper';

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
  };

  addTodo = text => {
    ax.post('/', { text })
    .then(res => {
      this.setState({
        todos: update(this.state.todos, {
          $push: [res.data]
        })
      });
    });
  };

  deleteTodo = id => {
    // 낙관적 업데이트
    const prevTodos = [...this.state.todos];
    const deleteIndex = prevTodos.findIndex(v => v.id === id);
    const newTodos = update(prevTodos, {
      $splice: [[deleteIndex, 1], /*[deleteIndex+1, 1]*/]
    });

    this.setState({
      todos: newTodos
    });

    ax.delete(`/${id}`)
    .catch(() => {
      this.setState({
        todos: prevTodos
      });
    });
  };

  editTodo = id => {
    this.setState({
      editingId: id
    });
  };

  saveTodo = (id, newText) => {
    const prevTodos = [...this.state.todos];
    const editIndex = prevTodos.findIndex(v => v.id === id);
    const newTodos = update(prevTodos, {
      [editIndex] : {
        text: {
          $set: newText
        }
      }
    });
    this.setState({
      todos: newTodos,
      editingId: null
    })

    ax.put(`/${id}`, { text: newText })
    .catch(() => {
      this.setState({ todos: prevTodos });
    });
  };

  cancelEdit = () => {
    this.setState({
      editingId: null
    });
  };

  toggleTodo = id => {
    const prevTodos = [...this.state.todos];
    const editIndex = prevTodos.findIndex(v => v.id === id);
    const newDone = !prevTodos[editIndex].isDone;
    const newTodos = update(prevTodos, {
      [editIndex]: {
        isDone: {
          $set: newDone
        }
      }
    });
    this.setState({ todos: newTodos });

    ax.put(`/${id}`, { isDone: newTodos[editIndex].isDone })
    .catch(() => {
      this.setState({ todos: prevTodos });
    });
  };

  toggleAll = () => {
    //두가지 방법 모두 가능하지만 동작은 some이 빠름
    // const newDone = !this.state.todos.every(v => v.isDone);
    const prevTodos = [...this.state.todos];
    const newDone = prevTodos.some(v => !v.isDone);
    const newTodos = update(prevTodos.map(v => update(v, {
        isDone: {
          $set: newDone
        }
    })));
    this.setState({ todos: newTodos });

    const axArray = this.state.todos.map(v => (
      ax.put(`/${v.id}`, { isDone: newDone })
    ));

    // axios.all([axios.delete(), axios.put(), promise, ...])
    // .then() //모두 성공하고 나서야 then을 실행함

    axios.all(axArray)
    .catch(() => {
      this.setState({ todos: prevTodos});
    });
  };

  clearCompleted = () => {
    const prevTodos = [...this.state.todos];
    const newTodos = update(prevTodos, {
      $apply: todos => todos.filter(v => !v.isDone)
    });
    this.setState({
      todos: newTodos
    });

    const axArray = this.state.todos.filter(v => v.isDone)
          .map(v => (
            ax.delete(`/${v.id}`)
          ));

    axios.all(axArray)
    .catch(() => {
      this.setState({ todos: prevTodos });
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
          filterName={filterName}
        />
      </div>
    );
  }
}

export default App;
