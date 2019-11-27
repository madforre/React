// 아래 코드들을 통해 리덕스의 에센스, 필수 요소들을 살펴보자.
const redux = require('redux'); // 심플한 node.js 애플리케이션인 경우 require 사용 가능.
const reduxLogger = require('redux-logger');

const createStore = redux.createStore;
const combineReducers = redux.combineReducers;
const applyMiddleware = redux.applyMiddleware;
const logger = reduxLogger.createLogger({});

const BUY_CAKE = 'BUY_CAKE';
const BUY_ICECREAM = 'BUY_ICECREAM';

// action creator = 액션을 타입별로 정의한다.
function buyCake() {
    return { // object
        type: BUY_CAKE, // define type property
        info: 'First redux action'
    }
}

function buyIceCream() { // 아이스크림 사는 액션 추가.
    return {
        type: BUY_ICECREAM,
    }
}


// Single Reducer State
// const initialState = {
//     numOfCakes: 10,
//     numOfIceCreams: 20
// };


// Multiple Reducers state
const initialCakeState = {
    numOfCakes: 10
}

const initialIceCreamState = {
    numOfIceCreams: 20
}


// Single Reducer

// 리듀서를 정의한다. 이 때, 액션, 액션별로 리턴할 상태 값들을 액션의 타입별로 분리한다.
// reducer accepted state and action as argument. then return next state.
// const reducer = (state = initialState, action) => {
//     switch(action.type) {
//         case BUY_CAKE: return {
//             ...state,
//             numOfCakes: state.numOfCakes - 1
//         }

//         case BUY_ICECREAM: return { // 하나로 관리하다보면 점점 커질수록 디버깅이 어려워진다.
//             // 따라서 멀티 리듀서를 사용하는 것이 좋다.
//             ...state,
//             numOfIceCreams: state.numOfIceCreams - 1
//         }

//         default: return state
//     }
// }


// Multiple Reducers
const cakeReducer = (state = initialCakeState, action) => {
    switch(action.type) {
        case BUY_CAKE: return {
            ...state,
            numOfCakes: state.numOfCakes - 1
        }
        
        default: return state
    }
}

const iceCreamReducer = (state = initialIceCreamState, action) => {
    switch(action.type) {
        case BUY_ICECREAM: return {
            ...state,
            numOfIceCreams: state.numOfIceCreams - 1
        }
        
        default: return state
    }
}

// 일반 싱글 리듀서.
// const store = createStore(reducer); // 스토어를 만든다. 이 때, 리듀서를 통해 액션을 스토어와 묶어준다.

// 멀티플 리듀서 결합했을 때.
// Combine Multiple Reducer.

const rootReducer = combineReducers({
    // 여기에 파라미터로 객체를 넘겨준다. 객체에서 키는 각각의 리듀서와 상응한다.
    cake: cakeReducer,
    iceCream: iceCreamReducer
});

const store = createStore(
    rootReducer,
    applyMiddleware(logger)
);




console.log('Initial state', store.getState())

// 스토어를 구독할 때는 subscribe 함수를 사용한다. 이 함수는 함수 형태의 파라미터를 받는다.
// 파라미터로 전달된 함수는 스토어 상태에 변화가 일어날 때마다 호출한다.
// subscribe 함수가 호출되면 반환 값으로 구독을 취소하는 unsubscribe 함수를 반환한다.

// const unsubscribe = store.subscribe(() => console.log('Updated state', store.getState())); // 미들웨어의 리덕스 로거를 사용하면 콘솔을 굳이 찍어줄 필요 없다.
const unsubscribe = store.subscribe(()=>{}); // 리덕스 로거 사용한다면 스토어를 구독설정 해두면 스토어 상태에 변화가 일어날 때마다 리덕스 로거가 브라우저 콘솔에 찍힐 것임.

// 스토어에 액션을 넣을 때는 dispatch 함수를 사용한다.
// 구독을 설정해두었다면, 이제 액션들이 급파될 때마다 우리가 구독할 때 등록했던 함수를 실행할 것이다.
store.dispatch(buyCake());
store.dispatch(buyCake());
store.dispatch(buyCake());

// 참고로 디스패치에 이미 정의된 action creator를 호출하는 이유는,
// 추 후 새로운 액션을 추가하거나 기존 액션을 수정할 때에 유지보수를 편리하게 하기 위함이다.
// 액션을 정의한 함수를 변경하도록 하자. dispatch 안에 즉시실행함수를 넣지말구.
store.dispatch(buyCake());
store.dispatch(buyCake());
store.dispatch(buyIceCream());
store.dispatch(buyIceCream());

// unsubscribe(); 를 통해 기존에 구독했던 함수를 다시 호출하여 구독을 취소해줄 수 있다.
unsubscribe();
store.dispatch(buyCake()); // 이 다음부터는 상태 변화가 되어도 콘솔이 찍히지 않는 것을 확인할 수 있다.
store.dispatch(buyCake());

// 몇개의 헬퍼 함수들을 통해, 