import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { buyCake } from '../redux';

function HooksCakeContainer() {
    const numOfCakes = useSelector(state => state.cake.numOfCakes); // select 함수라는 파라미터를 가진다. connect 함수 쓸 때와 비슷하게 값을 리턴한다.
    // 여기서 사용된 selector 함수의 state 파라미터는 Redux Store의 state를 의미한다.
    // 즉 리덕스 스토어의 state를 컴포넌트에 가져와 사용(연결)해준 것!

    const dispatch = useDispatch(); // 디스패치를 리액트에서 사용할 수 있도록 메소드를 불러와 할당한다.

    return (
        <div>
            <h2>Num of cakes - {numOfCakes}</h2>
            <button onClick={() => dispatch(buyCake())}>Buy cake</button>
        </div>
    )
}

export default HooksCakeContainer;