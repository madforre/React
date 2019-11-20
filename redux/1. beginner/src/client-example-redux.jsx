const React = require('react');
const ReactDom = require('react-dom');
const { hot } = require('react-hot-loader/root');
import App from './App';
import {createStore} from 'redux'; // 리덕스는 대부분 심플한 객체를 리턴하는 형태임.

const Hot = hot(App);

//STORE -> GLOBALIZED STATE

//ACTION INCREMENT - 액션을 정의한다.
const increment = () => {
    return {
        type: 'INCREMENT' // set action name.
    }
}
const decrement = () => {
    return {
        type: 'DECREMENT'
    }
}

//REDUCER (CHECK WHICH ACTION WHAT TO DO)
const counter = (state = 0, action) => {
    switch(action.type) {
        case "INCREMENT":
            return state + 1;
        case "DECREMENT":
            return state - 1;
    }
}

let store = createStore(counter); // add to store.

//Display it in console.
store.subscribe(() => console.log(store.getState()));

//DISPATCH - EXECUTE THE ACTION AND UPDATE STATE
store.dispatch(increment());
store.dispatch(decrement());
store.dispatch(decrement());



ReactDom.render(<Hot />, document.querySelector('#root'));