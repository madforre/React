import React from 'react';
import { Provider } from 'react-redux'; // 리액트와 리덕스를 연결한다.
import store from './redux/store';
import CakeContainer from './components/CakeContainer';
import HooksCakeContainer from './components/HooksCakeContainer';
import IceCreamContainer from './components/IceCreamContainer;'

function App() {
    return (
        // 포인트는 store를 어디에 공급할 것이냐! 이다.
        <Provider store={store}>
            <div className="App">
                <HooksCakeContainer />
                <CakeContainer />
                <IceCreamContainer />
            </div>
        </Provider>
    )
}

export default App;