const React = require('react');
const ReactDom = require('react-dom');
const { hot } = require('react-hot-loader/root');


import Games from './Games';

const Hot = hot(Games);


ReactDom.render(<Hot />, document.querySelector('#root'));