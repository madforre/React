import React, { Component } from 'react';

const Problematic = () => {
    throw (new Error('버그 발생'));
    return (
        <div>

        </div>
    );
};

class Lifecycle extends Component {
    // class fields 문법 사용 (조금 더 빠름)
    state = {
        number: 0,
        error: false
    }
    // class fields 문법 사용 x (위에보다 느림)

    constructor(props) {
        super(props);
        console.log('cunstructor');
    }

    componentDidMount() {
        console.log('componentDidMount');
    }

    shouldComponentUpdate(nextProps, nextState) {
        // 5의 배수라면 리랜더링 하지 않음
        console.log('shouldComponentUpdate');
        if (nextState.number % 5 === 0) return false;
        return true;
    }

    componentDidUpdate(prevProps, prevState) {
        console.log('componentDidUpdate');
    }

    handleIncrease = () => {
        const { number } = this.state; // setState(JSON)인데 JSON 파라미터를 못넘겨주니깐 전역변수화 한 것
        this.setState({
                number: number + 1
        });
    }
    
    handleDecrease = () => {
        this.setState(
            ({ number }) => ({
                number: number - 1
            })
        );
    }

    componentDidCatch(error, info) {
        this.setState({
            error: true
        });
    }

    render() {
        // X 눌렀을 때, 앱이 크래쉬 되는 것이 아닌 에러 발생 메세지가 뜬다.
        if (this.state.error) return (<h1>에러발생!</h1>);

        return (
            <div>
                <h1>카운터 (라이플 사이클용)</h1>
                <div>값: {this.state.number}</div>
                { this.state.number === 4 && <Problematic />}
                <button onClick={this.handleIncrease}>+</button>
                <button onClick={this.handleDecrease}>-</button>
            </div>
        );
    }

}

export default Lifecycle;