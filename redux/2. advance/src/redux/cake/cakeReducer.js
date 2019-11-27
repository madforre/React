import { BUY_CAKE } from './cakeTypes';

const initialState = {
    numOfCakes: 10
};

// 리듀서는 state와 액션을 파라미터로 받으며, 새로운 상태를 리턴한다.
const cakeReducer = (state = initialState, action) => {
    switch(action.type) {
        case BUY_CAKE: return {
            ...state,
            numOfCakes: state.numOfCakes - 1
        }
        default: return state;
    }
}

export default cakeReducer;