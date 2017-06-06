import React from 'react';
import ClassNames from 'classnames';

class Header extends React.Component {
  handleKeyDown(e) {
    const text = e.target.value;
    if(!text || e.keyCode !== 13) {
      return;
    }
    this.props.addTodo(text);
    e.target.value = '';
  }

  // editTodo
  // saveTodo
  // cancelTodo

  render(){
    const {
      isAllDone,
      toggleAll
    } = this.props;
    return (
      <header>
        <h1 className="todo-app__header">todos</h1>
        <input
          type="text"
          className="todo-app__new-todo"
          placeholder="What needs to be done?"
          onKeyDown={this.handleKeyDown.bind(this)}
        />
        <button className={ClassNames('toggle-all', {
          checked: isAllDone
        })}
        onClick={toggleAll}/>
      </header>
    );
  }
}

export default Header;


/*
1. 선언될 때마다 this 바인딩 //회사에서 급할때 많이 쓴다. 메모리성능상 썩 좋진 않다.
onKeyDown={this.handler.bind(this)}

2. 생성자메소드 내부에서 덮어씌우기 //협업하기에는 썩 좋지 않음
constructor() {
  this.handler = this.handler.bind(this);
}

3. 애로우펑션으로 호출 //불필요한 함수를 한번 더 호출한다는 비판 피할 수 없음
onKeyDown={e => this.handler(e)}

4. 애로우펑션으로 정의 (class property 선언방식(proposal2))
//요즘 가장 하태하태 그러나 아직 정식버전 아니다 ㅠㅠ
//애로우 펑션은 실행컨텍스트에서 this를 바인딩 하지 않는다.
//그래서 해당 함수가 실제 위치한 this를 반환함.
//프로퍼티에 할당되는 것이 아니라 인스턴스에 바로 할당되서 성능상 우위에 있다고 보기 힘듬.
handler = e => { };
*/
