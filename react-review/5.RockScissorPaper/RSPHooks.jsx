import React, { useState, useRef, useEffect } from 'react';

const rspCoords = { // 좌표
    rock: '-12px',
    scissor: '-136px',
    paper: '-284px',
};

console.log("what");

const scores = {
    scissor: 1,
    rock: 0,
    paper: -1
}

const speed = { // millisecond 기준 (ms)
    computer: 50,
    restart: 3000,
}

const computerChoice = (imgCoord) => { // 컴퓨터가 뭘 내고 있는지 판단함
    return Object.entries(rspCoords).find(function(v) {
        console.log('v가 뭔데', v);

        console.log("컴퓨터가 낸게",v[0],'인가?');
        return v[1] === imgCoord;
    })[0];
};

const RSP = () => { // 함수컴포넌트는 랜더링이 될 때마다 컴포넌트 안이 통째로 다시 실행된다.
    const [result, setResult] = useState('');
    const [imgCoord, setImgCoord] = useState('-12px');
    const [score, setScore] = useState(0);
    const interval = useRef();

    // userEffect도 한번
    useEffect(() => { // componentDidMount, componentDidUpdate 역할 (1대1 대응은 아님)
        console.log('다시 실행');
        interval.current = setInterval(changeHand, speed.computer); // - 컴포넌트가 첫 렌더링된 후. 여기엔 비동기 요청을 많이 작성.
        console.log('re-rendering! rspCoords is ', rspCoords) // 재랜더링시.
        return ( ) => { // componentWillUnmount 역할
            console.log('종료');
            clearInterval(interval.current); // - 컴포넌트가 제거되기 직전, 여기엔 비동기 요청을 많이 정리함.
        }
    }, [imgCoord]); // 두 번째 인수 배열에 넣은 값들이 바뀔 때마다 useEffect가 계속 실행된다.
    // 두번째 인자 배열에는 바뀌는 state를 할당하면 된다.
    // 함수형 컴포넌트가 매번 실행되어야하는 특성때문에 어려운 부분임. 패턴처럼 기억하는 것이 좋다.
    // 두번째 인자가 없으면, 처음에만 실행하고 그 다음부터는 실행되지 않음. - componentDidMount라고 생각하면됨.



    // 매번 setInterval이 시작됐다가 clearInterval을 하기 때문에 그냥 setTimeout을 하는 것과 동일하다.
    // 함수 컴포넌트가 매번 다시 실행된다는 특성을 외워두자. 패턴처럼 외워둡시다.
    // 인수 배열을 빼버리면 뭐가 바뀌던지 신경 안쓰고 딱 한번만 실행하겠다는 의미임.


    console.log('re-rendering! rspCoords is ', rspCoords) // 재랜더링시.

    const changeHand = () => {
        // state가 바뀔 때마다 함수 내에서 imgCoord를 할당한다.
        // console.log("Hello! I'm setInterval! imgCoord is", imgCoord);
        if (imgCoord === rspCoords.rock) {
            setImgCoord(rspCoords.scissor);
        } else if (imgCoord === rspCoords.scissor) {
            setImgCoord(rspCoords.paper);
        } else if (imgCoord === rspCoords.paper) {
            setImgCoord(rspCoords.rock);
        }
    }

    const onClickBtn = (choice) => (e) => { // 리액트에서 자주 쓰는 패턴임.
        clearInterval(interval.current); // 시각적으로 잠깐 멈춰야함. 일단 멈춰!!!
        const myScore = scores[choice];
        const cpuScore = scores[computerChoice(imgCoord)];
        console.log("응 맞아");
        const diff = myScore - cpuScore;
        if (diff === 0) {
            setResult(`비겼습니다! ${speed.restart / 1000}초 후 다시 시작합니다!`);
        } else if ([-1, 2].includes(diff)) {
            setResult(`이겼습니다! ${speed.restart / 1000}초 후 다시 시작합니다!`);
            setScore(prevScore => prevScore + 1);
        } else {
            setResult(`졌습니다! ${speed.restart / 1000}초 후 다시 시작합니다!`);
            setScore(prevScore => prevScore - 1);
            
        }
        setTimeout(autoRestart, speed.restart); // 3초후 자동 재시작
    }

    const autoRestart = () => { // 자동 재시작
        clearInterval(interval.current); // init
        console.log(this); // 화살표 함수 안써주면 this 윈도우 됨.
        interval.current = setInterval(changeHand, speed.computer);
    }

    const onRestart = () => {
        // init
        clearInterval(interval.current);
        setResult('');
        autoRestart();
    }

    return (
        <>
            <div id="computer" style={{ background: `url(https://en.pimg.jp/023/182/267/1/23182267.jpg) ${imgCoord} 0` }} />
            <div> 
                {/* 고차함수 기가막히네... onClick={() => this.onClickBtn('rock')} 얘를 아래처럼 써줄 수 있어!!!  */}
                <button id="rock" className="btn" onClick={onClickBtn('rock')}>바위</button>
                <button id="scissor" className="btn" onClick={onClickBtn('scissor')}>가위</button>
                <button id="paper" className="btn" onClick={onClickBtn('paper')}>보</button>
            </div>
            <button onClick={onRestart}>재빨리 덤비기</button>
            <div>{result}</div>
            <div>현재 {score} 점</div>
        </>
    )


}

export default RSP;