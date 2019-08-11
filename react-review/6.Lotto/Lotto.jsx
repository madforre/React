import React, { PureComponent } from 'react';
import Ball from './Ball';

function getWinNumbers() { // 보너스 번호까지 미리 n개 뽑음
    console.log('getWinNumbers');
    const winNumbers = [];
    let number;
    const n = 7;
    while(winNumbers.length < n) {
        number = Math.ceil(Math.random() * 45); // Math.random은 [0, 1)임.
        if (winNumbers.indexOf(number) == -1) {
            winNumbers.push(number);
        }
    }
    return winNumbers;
}

const init = (state) => {
    const obj = {
        winNumbers: getWinNumbers(),
        winBalls: [],
        bonus: null,
        redo: false
    };
    return obj;
}

class Lotto extends PureComponent {
    constructor(props) {
        super(props);
        this.state = init();
    }
    
    timeouts = [];

    runTimeouts = () => {
        console.log('runTimeouts');
        const { winNumbers } = this.state;
        const winballs_length = winNumbers.length - 1;
        console.log(winNumbers);
        for (let i = 0; i < winballs_length; i++) {
            this.timeouts[i] = setTimeout( () => { // 보통 비동기에 반복문 같이쓰면 안되지만 let쓰면 클로저 문제 안생긴다.
                this.setState((prevState) => {
                    return {
                        winBalls: [...prevState.winBalls, winNumbers[i]] 
                    } // 리액트에서는 배열에 push 하면 안되고 위처럼 써주어야 한다.
                })
            }, (i + 1) * 1000);
        }
        
        this.timeouts[winballs_length] = setTimeout(() => {
            this.setState( {
                bonus: winNumbers[winballs_length],
                redo: true, // 한번더 버튼 보이게 한다.
            });
        }, winNumbers.length * 1000);
        // 내가 원치 않았는데 컴포넌트가 사라질 경우를 조심해야한다!!
        // 부모컴포넌트가 자식컴포넌트(Lotto 라고 가정)를 없앨 경우.

        // 부모컴포넌트가 Lotto 컴포넌트를 없앴는데 setTimeout 가 남아있으면
        // 메모리를 계속 차지할 수도 있기 때문에 항상 componentWillUnmount()에서
        // 정리를 해주어야 한다.
    }
    
    componentDidMount() { // 컴포넌트 첫번째 랜더링 되자마자 진행된다.
        console.log('didMount');
        this.runTimeouts();
        console.log('로또 숫자를 생성합니다.');
    };

    componentDidUpdate(prevProps, prevState) {
        console.log('didUpdate');
        // setState할 때마다 componentDidUpdate는 실행이 되긴 함.
        // 다만 조건문으로 걸러준 로직은 실행이 안됨.

        // 업데이트 하고 싶은 상황을 잘 처리해야 합니다.
        // if (this.state.winBalls.length === 0) {  // 이 부분이 Hooks랑 일치하기가 어려움.
        if (this.timeouts.length === 0) {
            // if 문이 없다면 setState로 바뀔 때마다 계속 재랜더링 되겠죠?
            // 따라서 조건문을 통해 원하는 시점을 결정해줍니다. (여기선 redo를 눌렀을 때만.)
            // redo가 true일 때나 winBalls 크기가 0일 때 등등 있겠죠?
            // 이외의 다른 경우라면 if 조건문에 걸려서 로직이 무시될 것임.
            this.runTimeouts();
        };

        if (prevState.winNumbers !== this.state.winNumbers) {
            console.log('로또 숫자를 생성합니다.');
        }

        // componentDidUpdate는 조건문이 없다면 매번 계속 재랜더링
        // 잘못쓰면 렉걸리고 계속 재랜더링하고 난리남. 항상 주의하자!
    };

    componentWillUnmount() {
        // setTimeout이 실행되지 않았는데 컴포넌트가 unmount 되는 경우도 생각해야주어야 한다.
        // 아직 발생하지 않았어도 꼭 챙겨주어야 하는 부분이다.
        this.timeouts.forEach((v) => {
            clearTimeout(v); 
            // 이런부분은 놓치기 쉬움. 메모리 누수를 방지!!
            // 특히 셋타임아웃은 한번만 실행되고 정리되는거라 상관이 별로 없는데,
            // setInterval 같은 경우에는 메모리상에 남아서 계속 반복실행되므로
            // 꼭! 정리해주어야한다.

            // 브라우저 끄는거는 완전히 종료되는거라 componentWillUnmount가 발생 안하긴 하지만,
            // 그냥 부모 컴포넌트가 비동기가 있는 자식 컴포넌트를 없애버렸다고 일반적으로 생각하자.
        });
    };

    onClickRedo = () => {
        console.log('onClickRedo');
        this.setState(init);
        this.timeouts = [];
    };

    render() {
        const { winBalls, bonus, redo } = this.state;
        // 컴포넌트는 반복문 위주로 분리하도록 하자. (props 전달하는 기점임.)
        return (
            <>
                ㅎㅇㅎㅇ
                <h1>로또 추출기</h1>
                <div>
                    <h2>당첨 번호</h2>
                    {winBalls.map((v) => <Ball key={v} number={v} />)}
                </div>
                <h2>보너스!</h2>
                {bonus && <Ball number={bonus} />}
                {redo && <button onClick={this.onClickRedo}>한번 더!</button>}
                
            </>
        );
    };
};

export default Lotto;