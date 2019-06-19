import React, { Component } from 'react';

const rspCoords = { // 좌표
    rock: '-12px',
    scissor: '-136px',
    paper: '-284px',
};

const scores = {
    scissor: 1,
    rock: 0,
    paper: -1
}

const speed = { // millisecond 기준 (ms)
    computer: 50,
    restart: 1500,
}

const computerChoice = (imgCoord) => { // 컴퓨터가 뭘 내고 있는지 판단함
    return Object.entries(rspCoords).find(function(v) {
        console.log('v가 뭔데', v);

        console.log("컴퓨터가 낸게",v[0],'인가?');
        return v[1] === imgCoord;
    })[0];
};

class RSP extends Component {
    state = {
        result: '',
        imgCoord: '-12px', // 정적인 이미지의 좌표를 바꿔줌.
        score: 0
    };

    interval;

    componentDidMount() { // 컴포넌트가 첫 렌더링된 후, 여기엔 비동기 요청을 많이 작성함.

        console.log('First Rendering!');
        // 비동기 함수가 바깥에 있는 변수를 참조하면 클로저가 발생한다. 비동기 안에 써주자.
        // const { imgCoord } = this.state 여기서 사용 X
        this.interval = setInterval(this.changeHand, speed.computer);
    }

    componentDidUpdate() { // 리렌더링 후 실행
        console.log('re-rendering! rspCoords is ', rspCoords)
    }

    componentWillMount() { // 컴포넌트가 제거되기 직전, 여기엔 비동기 요청을 많이 정리함.
        clearInterval(this.interval);
    }

    changeHand = () => {
        // state가 바뀔 때마다 함수 내에서 imgCoord를 할당한다.
        const { imgCoord } = this.state // 여기서 사용 O 
        console.log("Hello! I'm setInterval! imgCoord is", imgCoord);
        if (imgCoord === rspCoords.rock) {
            this.setState({
                imgCoord: rspCoords.scissor,
            });
        } else if (imgCoord === rspCoords.scissor) {
            this.setState({
                imgCoord: rspCoords.paper,
            });
        } else if (imgCoord === rspCoords.paper) {
            this.setState({
                imgCoord: rspCoords.rock,
            });
        }
    }

    onClickBtn = (choice) => (e) => { // 와우!! 자바스크립트 고차함수 패턴!!!!
        const { imgCoord } = this.state;
        clearInterval(this.interval); // 시각적으로 잠깐 멈춰야함. 일단 멈춰!!!
        const myScore = scores[choice];
        const cpuScore = scores[computerChoice(imgCoord)];
        console.log("응 맞아");
        const diff = myScore - cpuScore;
        if (diff === 0) {
            this.setState({
              result: `비겼습니다! ${speed.restart / 1000}초 후 다시 시작합니다!`,
            });
        } else if ([-1, 2].includes(diff)) {
            this.setState((prevState) => {
              return {
                result: `이겼습니다! ${speed.restart / 1000}초 후 다시 시작합니다!`,
                score: prevState.score + 1,
              };
            });
        } else {
            this.setState((prevState) => {
              return {
                result: `졌습니다! ${speed.restart / 1000}초 후 다시 시작합니다!`,
                score: prevState.score - 1,
              };
            });
        }
        setTimeout(this.autoRestart, speed.restart); // 3초후 자동 재시작
    }

    autoRestart = () => { // 자동 재시작
        clearInterval(this.interval); // init
        console.log(this); // 화살표 함수 안써주면 this 윈도우 됨.
        this.interval = setInterval(this.changeHand, speed.computer);
    }

    onRestart = () => {
        // init
        clearTimeout(this.autoRestart);
        clearInterval(this.interval);
        this.setState((prevState) => {
            return {
              result: '',
            };
          });
        this.interval = setInterval(this.changeHand, speed.computer);
    }

    render() {
        const { result, score, imgCoord } = this.state;
        return (
            <>
                <div id="computer" style={{ background: `url(https://en.pimg.jp/023/182/267/1/23182267.jpg) ${imgCoord} 0` }} />
                <div> 
                    {/* 고차함수 기가막히네... onClick={() => this.onClickBtn('rock')} 얘를 아래처럼 써줄 수 있어!!!  */}
                    <button id="rock" className="btn" onClick={this.onClickBtn('rock')}>바위</button>
                    <button id="scissor" className="btn" onClick={this.onClickBtn('scissor')}>가위</button>
                    <button id="paper" className="btn" onClick={this.onClickBtn('paper')}>보</button>
                </div>
                <button onClick={this.onRestart}>재빨리 덤비기</button>
                <div>{result}</div>
                <div>현재 {score} 점</div>
            </>
        );
    }
}

export default RSP;