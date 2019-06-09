// 노드 모듈시스템으로 npm에 설치한 리액트랑 리액트 돔 불러오기
const React = require('react');
const ReactDom = require('react-dom');
//

// 필요한 컴포넌트만 쏙쏙 가져오기 때문에 엄청 효율적임!
// 모듈 시스텡미 생기면서 레고처럼 끼워맞추는 작업이 가능해짐.
const WordRelay = require('./WordRelay');

ReactDom.render(<WordRelay />, document.querySelector('#root'));