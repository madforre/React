// class fields 문법을 사용해서 정의
import React, { Component } from 'react';

class Counter extends Component{
    // class fields 문법을 사용한 state 정의 (아래 코드보다 먼저 실행)
    state = {
        number: 0
    }

    // class fields 문법 사용안할 경우 state 정의 (위 코드보다 좀 더 늦게 실행된다.)
    constructor(props) {
        super(props);
        // 메소드를 arrow function로 정의 안했을 때 나중에 this 가 undefined 발생.
        // 이를 방지하기위한 코드이다.
        // this.handleIncrease = this.handleIncrease.bind(this);
        // this.handleDecrease = this.handleDecrease.bind(this);
        this.state = {
            number: 0
        }
    }

    // 컴포넌트 메서드 작성
    handleIncrease = () => {
        this.setState({
            number: this.state.number + 1
        });
    }

    handleDecrease = () => {
        this.setState({
            number: this.state.number - 1
        });
    }

    // 컴포넌트 메서드 작성 다른 방법 - 나중에 버튼 클릭이벤트에서 this와 연결이 끊김.
    // 이를 고쳐주려면 constructor에서 bind 해주거나 아예 화살표 함수 형태로 하면 걱정 x
    // handleIncrease() {
    //     this.setState({
    //         number: this.state.number + 1
    //     });
    // }

    // handleDecrease() {
    //     this.setState({
    //         number: this.state.number - 1
    //     });
    // }

    render() {
        return (
            <div>
                <h1>카운터</h1>
                <div>값: {this.state.number}</div>
                <button onClick={this.handleIncrease}>+</button>
                <button onClick={this.handleDecrease}>-</button>
            </div>
        );
    }
}

export default Counter;