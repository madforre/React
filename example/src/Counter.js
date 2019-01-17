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

    // 함수표현식으로 작성 (기존에 작성했던 함수를 각각 다른 방식으로 구현)
    // handleIncrease() {
    //     const { number } = this.state;
    //     this.setState(
    //         (state) => ({
    //             number: state.number
    //         })
    //     );
    // }
    
    // 이거는 선언 없이 비구조화 할당한건데, var로 할당되는거 같다.
    // 위에코드 쓰자.
    // handleDecrease() {
    //     this.setState(
    //         ({ number }) => ({
    //             number: number + 1
    //         })
    //     );
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