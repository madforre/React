// index.js에 해당하는 client.jsx는 최대한 lean하게 작성하자.
const React = require('react');
const ReactDom = require('react-dom');
const { hot } = require('react-hot-loader/root');
import App from './App';
import {createStore} from 'redux'; // step 1 - import createStore.
import allReducer from './reducers'; // step 2 - import combineReducers and combine reducers.
import {Provider} from 'react-redux'; // step 5 - hook redux up with react.

// step 3. create redux store from reducer.
const appStore = createStore(
    allReducer, /* preloadedState, */
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__() // step 4. use redux-devtools-extension. this is very cool!
); 

const Hot = hot(App); // apply hot loader
ReactDom.render( 
    <Provider store={appStore}> {/* step 6. - wrap your app ( next step is App.js - access the store. ) */} 
        <Hot />
    </Provider>
    , document.querySelector('#root')
);