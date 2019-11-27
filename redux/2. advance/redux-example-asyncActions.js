const redux = require('redux');
const createStore = redux.createStore;
const applyMiddleware = redux.applyMiddleware;
const thunkMiddleware = require('redux-thunk').default;
const axios = require('axios');

// state - set initial state
const initialState = { 
    loading: false,
    users: [],
    error: ''
}

// action - define types
const FETCH_USERS_REQUEST = 'FETCH_USERS_REQUEST';
const FETCH_USERS_SUCCESS = 'FETCH_USERS_SUCCESS';
const FETCH_USERS_FAILURE = 'FETCH_USERS_FAILURE';

// actions - action creator (returns an action.)
const fetchUsersRequest = () => {
    return {
        type: FETCH_USERS_REQUEST
    }
}

const fetchUsersSuccess = users => {
    return {
        type: FETCH_USERS_SUCCESS,
        payload: users
    }
}

const fetchUsersFailure = error => {
    return {
        type: FETCH_USERS_FAILURE,
        payload: error
    }
}

// reducers - bind our reducer functions.
const reducer = (state = initialState, action) => {
    switch(action.type) {
        case FETCH_USERS_REQUEST:
            return {
                ...state,
                loading: true
            }
        
        case FETCH_USERS_SUCCESS:
            return {
                loading: false,
                users: action.payload,
                error: ''
            }

        case FETCH_USERS_FAILURE:
            return {
                loading: false,
                users: [],
                error: action.payload
            }
    }
}

const fetchUsers = () => { // redux-thunk 액션 크리에이터는 액션 객체 대신 함수를 리턴해야 한다. 
    return function(dispatch) {
        // 리턴하는 함수는 꼭 순수함수일 필요는 없다.
        // 사이드 이펙트가 있는 async API여도 된다.
        // 또한 리턴하는 함수 역시 액션들을 디스패치할 수 있다.
        dispatch(fetchUsersRequest())
        axios.get('https://jsonplaceholder.typicode.com/user')
            .then(response => {
                // response.data is the array of users
                const users = response.data.map(user => user.id)
                dispatch(fetchUsersSuccess(users))
            })
            .catch(error => {
                // error.message is the error description
                dispatch(fetchUsersFailure(error.message))
            })
    }
}

// create store and bind reducer
const store = createStore(reducer, applyMiddleware(thunkMiddleware))
store.subscribe(() => { console.log(store.getState()) })
store.dispatch(fetchUsers())