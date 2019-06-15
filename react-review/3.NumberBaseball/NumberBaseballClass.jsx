import React, { PureComponent, createRef } from 'react'; // PureComponent는 state가 바뀔 때만 렌더링을 한다.
import Try from './TryClass';

function getNumbers() { // 숫자 4개를 겹치지 않고 랜덤하게 뽑는 함수
    const candidate = [1,2,3,4,5,6,7,8,9];
    let array = [];
    for (let i = 0; i < 4; i++) {
        const chosen = candidate.splice(Math.floor(Math.random() * (9 - i)), 1)[0];
        array.push(chosen);

        // 이해해버렸다. 랜덤함수는 0이상~1미만까지 뽑아주니깐 ㅇㅇ 0부터 8인덱스까지 뽑아주고 0부터 7인덱스까지 뽑아주고 ... ㅇㅇ 반복
    }
    console.log('정답 :', array.join(''))
    return array;
}

function stringToUniquedArray(v) {
    // 문자를 받아서 글자별로 배열로 쪼갬
    const array = v.split('').filter( (v, i, arr) => {
        // console.log (arr.indexOf(v), i)
        return arr.indexOf(v) === i 
    })
    return array; // 그 후 쪼갠 문자들중 중복되지 않는 애들만 리턴함.
}

class NumberBaseballClass extends PureComponent {
    state = {
        result: '',
        value: '',
        answer: getNumbers(), // ex: [1,3,5,7]
        tries: [], // 리액트에서 push 쓰면 안됨. 불변성 유지!!
        deny: ''
    };

    onSubmitForm = (e) => {
        const { value, tries, answer } = this.state;
        e.preventDefault();
        if (stringToUniquedArray(value).length !== answer.length ) {
            // 중복되었으면 length 가 다르겠지?
            this.setState({ deny: '중복되는 숫자가 있습니다!' })
            return;
        }

        if (value === answer.join('')) {
            this.setState((prevState) => {
                return {
                    result: '잘하셨어요! 보상으로 새로운 문제를 드립니다.',
                    tries: [...prevState.tries, { try : value, result: '홈런!' }]
                }
            });
            alert('홈런! 정답입니다!');
            this.setState( {
                value: '',
                answer: getNumbers(),
                tries: [],
                deny: ''
            }); 
        } else {
            const answerArray = value.split('').map((v) => parseInt(v));
            let strike = 0;
            let ball = 0;
            if (tries.length >= 9) {
                this.setState( {
                    result: '게임을 하면 이겨야지!'
                });
                alert(`10번 넘게 틀렸으므로 실패! 답은 ${answer.join(',')} 였습니다!`);
                this.setState( {
                    value: '',
                    answer: getNumbers(),
                    tries: [],
                    deny: ''
                }); 
            } else {
                for (let i = 0; i < 4; i += 1) {
                    if (answerArray[i] === answer[i]) {
                        strike += 1;
                    } else if (answer.includes(answerArray[i])) {
                        ball += 1;                    
                    }
                }
                this.setState((prevState) => {
                    return {
                        tries: [...prevState.tries, { try: value, result: `${strike} 스트라이크, ${ball} 볼입니다`}],
                        deny: '',
                        value: ''
                    }
                })
            }
        }
        this.inputRef.current.focus(); // hooks랑 쓰는 법을 통일시켜줄 수 있음.
    };

    onChangeInput = (e) => {
        this.setState({value: e.target.value});
    };

    // onInputRef = (el) => { this.input = el };
    
    inputRef = createRef(); // hooks처럼 쓰는 방법

    render() {
        return (
            <>
                <h1>씬나는 숫자야구 ( 1 ~ 9 )</h1>
                <form onSubmit={this.onSubmitForm}>
                    <input ref={this.inputRef} maxLength={4} value={this.state.value} onChange={this.onChangeInput} />
                    <button>제출</button>
                </form>
                <div>{this.state.result}</div>
                <div>{this.state.deny}</div>
                <h2>시도: {this.state.tries.length}</h2>
                <ul>
                    {this.state.tries.map( (v, i) => {
                        return (
                            <Try key={`${i + 1}차 시도`} tryInfo={v}/>
                        );
                    }) }
                </ul>
            </>
        );
    }
}

export default NumberBaseballClass;