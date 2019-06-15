import React, { Component } from 'react';

class ResponseCheckClass extends Component {
    state = {
        state: 'waiting',
        message: '클릭해서 시작하세요.',
        result: [],
    };

    timeout;
    startTime;
    endTime;

    onClickScreen = () => {
        const { state, message, result } = this.state;
        if (state === 'waiting') {
            this.setState( {
                state: 'ready',
                message: '초록색이 되면 클릭하세요.',
            });
            this.timeout = setTimeout(() => {
               this.setState( {
                    state: 'now',
                    message: '지금 클릭',   
                })
                this.startTime = new Date();
            }, Math.floor(Math.random() * 1000) + 2000); // 2초 ~ 3초 미만 랜덤
        } else if (state === 'ready') { // 성급하게 클릭
            clearTimeout(this.timeout); // setTimeout 없애주어야 함. 초기화 (콜스텍에서 제거)
            this.setState({
                state: 'waiting',
                message: '너무 성급하시군요! 초록색이 된 후에 클릭하세요.',
            })
        } else if (state === 'now') { // 반응속도 체크
            this.endTime = new Date();
            console.log(this.startTime, this.endTime);
            console.log(this.endTime - this.startTime);
            this.setState( (prevState) => {
                return {
                    state: 'waiting',
                    message: '클릭해서 시작하세요.',
                    result: [...prevState.result, this.endTime - this.startTime],
                };
            });
        }
    };

    resetResult = () => {
        this.setState({
            result: []
        })
    }

    renderAverage = () => { // 사실 함수보다는 새로운 컴포넌트로 하는 것이 좋음. 
        // 새로운 컴포넌트면 result는 부모 컴포넌트에서 자식인 얘한테 props로 내려주겠지?
        return this.state.result.length === 0 
        ?   null 
        :
        <>
            <div>평균 시간: {this.state.result.reduce((a, c) => a + c ) / this.state.result.length}ms</div>
            <button onClick={this.resetResult}>Reset</button>
        </>
    }

    render() {
        const { state, message } = this.state;
        return (
            <>
                <div
                    id="screen"
                    className={state}
                    onClick={this.onClickScreen}
                >
                    {message}
                </div>
                <div>{this.renderAverage()}</div>
            </>
        );
    }
}

export default ResponseCheckClass;