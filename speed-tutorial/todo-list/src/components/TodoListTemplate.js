// 템플릿 역할을 하는 컴포넌트이다.
// 하나의 틀 역할을 하는 함수형 컴포넌트

import React from 'react';
import './TodoListTemplate.css';

// 함수형 컴포넌트가 파라미터로 받게 되는 것은 props 이다.
console.log(this)
const TodoListTemplate = ({palette, form, children}) => {
    return (
        <main className="todo-list-template">
            <div className="title">
                Linco / To do
            </div>
            <section className="color-wrapper">
                { palette }
            </section>
            <section className="form-wrapper">
                { form }
            </section>
            <section className="todos-wrapper">
                { children }
            </section>
        </main>
    )
}

export default TodoListTemplate;