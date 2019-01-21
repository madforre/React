import React, { Component } from 'react';
import TodoItem from './TodoItem';

class TodoItemList extends Component {
    
    // TodoItemList 최적화
    shouldComponentUpdate(nextProps, nextState) {
        return this.props.todos !== nextProps.todos;
    }

    render() {
        // 이 컴포넌트는 3가지의 props 를 받게 된다.
        // todos 는 todo 객체들이 들어있는 배열이다.
        // onToggle은 체크박스를 키고 끄는 함수이다.
        // onRemove는 아이템을 삭제시키는 함수이다.
        console.log(this.props);
        const { todos, onToggle, onRemove } = this.props;

        const todoList = todos.map(
            // 객체의 값을 모두 props 로 전달하기
            (todo) => (
                <TodoItem
                    {...todo}
                    onToggle={onToggle}
                    onRemove={onRemove}
                    key={todo.id}
                />
            )
        );

        return (
            <div>
                {todoList}
            </div>
        );
    }
}

export default TodoItemList;    