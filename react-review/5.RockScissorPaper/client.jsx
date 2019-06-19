const React = require('react');
const ReactDom = require('react-dom');
const { hot } = require('react-hot-loader/root');


import RSP from './RSPClass';
// import RSP from './RSPHooks';

const Hot = hot(RSP);

ReactDom.render(<Hot />, document.querySelector('#root'));