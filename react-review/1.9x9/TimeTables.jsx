const React = require('react');
const { useState, useRef } = React;

const TimeTables = () => {
    const [first, setFirst] = useState(Math.ceil(Math.random() * 9));
    const [second, setSecond] = useState(Math.ceil(Math.random() * 9));
    const [value, setValue] = useState('');
    const [result, setResult] = useState('');

    const inputRef = useRef('initial value');

    const onChangeInput = (e) => {
        setValue(e.target.value);
    };

    const onSubmitForm = (e) => {
        e.preventDefault();
        if (parseInt(value) === first * second) {
            setValue('');
            setResult(`${first * second} 정답!`);
            setFirst(Math.ceil(Math.random() * 9));
            setSecond(Math.ceil(Math.random() * 9));
            inputRef.current.focus();
        } else {
            setValue('');
            setResult('틀렸지롱');
            inputRef.current.focus();
        }
    };

    return (
        <>
            <div>{first} 곱하기 {second}는?</div>
            <form onSubmit={onSubmitForm}>
                <input ref={inputRef} onChange={onChangeInput} value={value}/>
                <button>입력!</button>
            </form>
            <div id="result">{result}</div>
        </>
    );
}

module.exports = TimeTables;