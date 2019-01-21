// 최적화를 목적으로 진행할 경우 클래스형으로 작성한다.
import React, { Component } from 'react';
import './TodoItem.css';

class TodoItem extends Component {

    // 이 컴포넌트가 업데이트 되는 경우는 checked 값이 바뀔 때이다.
    shouldComponentUpdate(nextProps, nextState) {
        return this.props.checked !== nextProps.checked;
    } /* 삭제를 할 떈 리렌더링되는 Item 이 없다. */

    render() {
        // 5가지의 props 를 전달받는다. ( 내용, 체크박스상태, 고유아이디, 체크박스 키고 끄기, 아이템 삭제 )
        const { text, checked, id, onToggle, onRemove } = this.props;

        console.log(id);

        return (
            <div className="todo-item" onClick={() => onToggle(id)}>
                <div className="remove" onClick={(e) => {
                    e.stopPropagation(); // onToggle 이 실행되지 않도록 한다. (이벤트 버블링 방지)
                    onRemove(id)}
                }>&times;</div>
                <div className ={`todo-text ${checked && 'checked'}`}>
                    <div>{text}</div>
                </div>
                {
                    checked && (<div className="check-mark">&#x2713;</div>)
                }
            </div>
        );
    }
}

export default TodoItem;