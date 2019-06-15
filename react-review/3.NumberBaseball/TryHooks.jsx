import React, { useState, memo } from 'react';

const Try = memo(({ tryInfo }) => {
    const [result, setResult] = useState(tryInfo.result);
    // 물려준 props를 직접 바꾸지 않고, state에 넣어서 사용한다.
    // 부모까지 바뀐다. 
    
    // 정 바꿔야 되면 이런 식으로 사용한다.
    // 일반적으로 자식에서 props를 바꾸지는 않는다.

    const onClick = () => {
        setResult('1');
    };

    return (
        <li>
            <div>{tryInfo.try}</div>
            <div onClick={onClick}>{result}</div>
        </li>
    )
});

export default Try;