import React, { useState, memo } from 'react'; // import 시 useState도 명시 해주면 한번에 쓸 수 있어 편함.
import Try from './TryHooks';

const getNumbers = () => { // 숫자 4개를 겹치지 않고 랜덤하게 뽑는 함수
    const candidate = [1,2,3,4,5,6,7,8,9];
    let array = [];
    for (let i = 0; i < 4; i++) {
        const chosen = candidate.splice(Math.floor(Math.random() * (9 - i)), 1)[0];
        array.push(chosen);
        // 이해해버렸다. 랜덤함수는 0이상~1미만까지 뽑아주니깐 ㅇㅇ 0부터 8인덱스까지 뽑아주고 0부터 7인덱스까지 뽑아주고 ... ㅇㅇ 반복
    }
    // console.log('정답 :', array.join(''))
    console.log("hi");
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

const NumberBaseballHooks = memo(() => {
    const [result, setResult] = useState('');
    const [value, setValue] = useState('');
    const [deny, setDeny] = useState('')
    const [tries, setTries] = useState([]);
    const [answer, setAnswer] = useState(getNumbers());

    const onSubmitForm = (e) => {

        e.preventDefault();
        if (stringToUniquedArray(value).length !== answer.length ) {
            // 중복되었으면 length 가 다르겠지?
            setDeny('중복되는 숫자가 있습니다!');
            return;
        }

        if (value === answer.join('')) {
            setResult('잘하셨어요! 보상으로 새로운 문제를 드립니다.');
            setTries((prevTries) => { // 옛날 state로 새 state를 만들 때는 함수형으로 ! 컴포넌트가 클래스든 훅이든.
                return [...prevTries, { try : value, result: '홈런!' }];
            })
            alert('홈런! 정답입니다!');
            setValue('');
            setAnswer(getNumbers());
            setTries([]),
            setDeny('');
        } else {
            const answerArray = value.split('').map((v) => parseInt(v));
            let strike = 0;
            let ball = 0;
            if (tries.length >= 9) {
                setResult('게임을 하면 이겨야지!')
                alert(`10번 넘게 틀렸으므로 실패! 답은 ${answer.join(',')} 였습니다!`);
                setValue('');
                setAnswer(getNumbers());
                setTries([]),
                setDeny('');
            } else {
                for (let i = 0; i < 4; i += 1) {
                    if (answerArray[i] === answer[i]) {
                        strike += 1;
                    } else if (answer.includes(answerArray[i])) {
                        ball += 1;
                    }
                }
                setTries((prevTries) => [...prevTries, { try: value, result: `${strike} 스트라이크, ${ball} 볼입니다`}]);
                setDeny('');
                setValue('');
            }
        }
    };

    const onChangeInput = (e) => {
        setValue(e.target.value);
    };

    return (
        <>
            <h1>씬나는 숫자야구 ( 1 ~ 9 )</h1>
            <form onSubmit={onSubmitForm}>
                <input maxLength={4} value={value} onChange={onChangeInput} />
                <button>제출</button>
            </form>
            <div>{result}</div>
            <div>{deny}</div>
            <h2>시도: {tries.length}</h2>
            <ul>
                {tries.map( (v, i) => {
                    return (
                        <Try key={`${i + 1}차 시도`} tryInfo={v}/>
                    );
                }) }
            </ul>
        </>
    );

});

export default NumberBaseballHooks;