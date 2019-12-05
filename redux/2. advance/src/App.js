import React from 'react';
import ReactDom from 'react-dom';
import { hot } from 'react-hot-loader/root'; // apply hot roader

import { Provider } from 'react-redux'; // 리액트와 리덕스를 연결한다.
import store from './redux/store';
import CakeContainer from './components/CakeContainer';
import HooksCakeContainer from './components/HooksCakeContainer';
import IceCreamContainer from './components/IceCreamContainer';

const App = () => {
    return (
        <>
            <HooksCakeContainer />
            <CakeContainer />
            <IceCreamContainer />
        </>
    )
};

const Hot = hot(App); // apply hot roader
ReactDom.render(
    <Provider store={store}>
        <Hot />
    </Provider>,
    document.querySelector('#root')
);