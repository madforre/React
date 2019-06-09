// 노드 모듈시스템으로 npm에 설치한 리액트랑 리액트 돔 불러오기
const React = require('react');
const ReactDom = require('react-dom');

// 함수형 컴포넌트 Hooks 사용 O
const WordChainHooks = require('./WordChainHooks'); // const Hot = hot(WordChainClass);


// 핫로더 사용 O
const { hot } = require('react-hot-loader/root');
const Hot = hot(WordChainHooks); // const WordChainClass = require('./WordChainClass');


// 핫로더 사용 O
ReactDom.render(<Hot />, document.querySelector('#root')); // ReactDom.render(<WordChain />, document.querySelector('#root'));






