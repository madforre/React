import React from 'react';
import {useSelector, useDispatch} from 'react-redux';// step 7 - useSelector. now any component you can access the store state.
import {increment, decrement} from './actions'; // step 8 - import actions and useDispatch .

const App = () => {
    const counter = useSelector(state => state.counter); // useSelector can access whole big state from redux.
    const isLogged = useSelector(state => state.isLogged);
    const dispatch = useDispatch(); // step 9 - use dispatch .
    return (
        <div className="app">
            <h1>Counter {counter}</h1>
            <button onClick={() => dispatch(increment(5))}>+</button>
            <button onClick={() => dispatch(decrement())}>-</button>
            {isLogged ? <h3>Valuable Information I shoudn't see</h3> : null}
        </div>
    )
}

export default App;