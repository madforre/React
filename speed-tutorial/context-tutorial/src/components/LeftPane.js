import React from 'react';
import Sends from './Sends';

// 왼쪽에 보여줄 컴포넌트를 만든다. 여기선 Sends를 보여준다.
// 함수형 컴포넌트는 state와 LifeCycle이 빠져있다. 단순히 props 만 받아서 보여줄 때 사용.
const LeftPane = () => {
    return (
        <div className="pane">
            <Sends />
        </div>
    );
};

export default LeftPane;