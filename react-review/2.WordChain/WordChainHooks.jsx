const React = require('react');
const { useState, useRef } = React;


// 렌더링 카운트 컴포넌트를 순수함수느낌처럼 빼서 만들어보았다.
let n = 1;
const RenderCount = ({count}) => { // 전달받은 props를 구조분해하여 할당한다.
    console.log(`${count}번째 랜더링`)
    return <div>랜더링 횟수 : {count}</div>
}

const WordChainHooks = () => {

    const [word, setWord] = useState('첫단어');
    const [value, setValue] = useState('');
    const [message, setMessage] = useState('');

    const answerRef = useRef(null);

    const onSubmitForm = (e) => {
        e.preventDefault();
        answerRef.current.focus(); // input focus

        // 2-3글자 아니면 함수 종료
        let re = /[가-힣]{3}/
        if (value.length === 2) re = /[가-힣]{2}/;
        if (!re.test(value)) {
            // 4글자인 상태로 submit 했을 때 3글자로 잘라줌
            const words = value.slice(0, 3);
            setValue(words);

            // 경고 메세지 노출
            setMessage('2-3글자의 완성된 단어를 입력하세요.');
            return;
        }

        // 제시한 문제의 마지막 글자와 내가 입력한 첫글자 비교
        if (word[word.length - 1] === value[0]) {
            setWord(value);
            setValue('');
            setMessage('딩동댕');
        } else {
            setValue('');
            setMessage('땡');
        }
    }

    const onChangeInput = (e) => {
            let words = e.currentTarget.value;
            let tips;
            
            // 문자가 4글자 넘어가는 경우 삭제할꺼임. 그리고 2글자~3글자만 입력하도록 경고문 띄울꺼임
            if (words.length >= 4) {
                words = words.slice(0, 3)
                tips = '3글자가 최대임'
            } else if (words.length < 2) {
                tips = '2글자 이상 입력하셈'
            }
            setValue(words);
            setMessage(tips);
        }

    return (
        <> 
            <RenderCount count={n++}/>
            <p>{word}</p>
            <form onSubmit={onSubmitForm}>
                <input ref={answerRef} type="text" onChange={onChangeInput} value={value} />
                <button>입력!!!</button>
            </form>
            <p>{message}</p>
        </>
    )
    
}   

// 파일을 쪼개는 경우 꼭 적어줘야할 코드
module.exports = WordChainHooks;
// 