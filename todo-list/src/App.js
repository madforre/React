import React, { Component } from 'react';
import TodoListTemplate from './components/TodoListTemplate';
import Form from './components/Form';
import TodoItemList from './components/TodoItemList';
import Palette from './components/Palette'

class App extends Component {
// 초기 state 정의
  id = 3 // 이미 0,1,2 가 존재하므로 3으로 설정

  state = {
    input: '',
    todos: [
      // todes 배열의 기본 아이템 3개 초기설정
      { id: 0, text: ' React', checked: false },
      { id: 1, text: ' Laravel', checked: true },
      { id: 2, text: ' Nginx', checked: false }
    ],
    colors: ['#343a40', '#f03e3e', '#12b886', '#228ae6'],
    colorSelected: [],
    colorActive: [true, false, false, false]
  }

  // 텍스트 내용이 바뀌면 state 업데이트
  handleChange = (e) => {
    this.setState({
      input: e.target.value // input 의 다음 바뀔 값
    });
  }

  // 버튼이 클릭되면 새로운 todo 생성후 todos 업데이트
  handleCreate = () => {
    const { input, todos } = this.state;
    this.setState({
      input: '', // 인풋 비우고
      // concat 을 사용하여 배열에 추가 (새 배열을 만들어서 setState 해주어야 한다.)
      todos: todos.concat({
        id: this.id++,
        text:input,
        checked: false
      })
    });
  }

  handleKeyPress = (e) => {
    // 눌려진 키가 Enter 면 handleCreate 호출
    if(e.key === 'Enter') {
      this.handleCreate();
    }
  }

  handleToggle = (id) => {
    
    const { todos } = this.state;

    // 파라미터로 받은 id 를 가지고 몇번째 아이템인지 찾습니다.
    const index = todos.findIndex(todo => todo.id === id);
    const selected = todos[index]; // 선택한 객체
    
    const nextTodos = [...todos]; // 배열을 복사

    // 기존의 값들을 복사하고, checked 값을 덮어쓰기
    nextTodos[index] = {
      ...selected,
      checked: !selected.checked
    };

    this.setState({
      todos: nextTodos
    });
  }

  // handleToggle 함수는 다음과 같이 구현 될 수도 있다.

  // handleToggle = (id) => {
  //   const { todos } = this.state;
  //   const index = todos.findIndex(todo => todo.id === id);

  //   const selected = todos[index];

  //   this.setState({
  //     todos: [
  //       ...todos.slice(0, index),
  //       {
  //         ...selected,
  //         checked: !selected.checked
  //       },
  //       ...todos.slice(index + 1, todos.length)
  //     ]
  //   });
  // }

  handleRemove = (id) => {
    // 파라미터로 받아온 id를 갖고 있지 않는 배열을 새로 생성
    const { todos } = this.state;
    // 지정한 id를 배제한 배열이 재탄생
    this.setState({
      todos: todos.filter(todo => todo.id !== id)
    });
  }

  render() {
    const { input , todos , colors , colorSelected , colorActive } = this.state;
    
    // 사용하기 더 편하게 객체 비구조화 할당하여 아예 this도 안쓰게끔 해줌
    const {
      handleChange,
      handleCreate,
      handleKeyPress,
      handleToggle,
      handleRemove
    } = this;
    
    return (
      <TodoListTemplate 
        form={
        <Form
          value={input}
          onKeyPress={handleKeyPress}
          onChange={handleChange}
          onCreate={handleCreate}
        />
        }
        
        palette={
        <Palette
          colors={colors}
          // selected={colorSelected}
          // active={colorActive}
        />
        }
        >
        {/* TodoItemList 는 children에 해당된다. */}
        <TodoItemList 
          todos={todos} 
          onToggle={handleToggle} 
          onRemove={handleRemove}
          />
      </TodoListTemplate>
    );
  }
}

export default App;