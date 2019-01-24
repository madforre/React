import React from 'react';
import ReactDOM from 'react-dom';
import Root from './client/Root'; // 라우터 추가설정

// 원래 설정
// import App from './App';
import * as serviceWorker from './serviceWorker';
import './index.css'; // 원래 설정

ReactDOM.render(<Root />, document.getElementById('root')); // 라우터 추가시 컴포넌트 Root로 변경

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.register();