const React = require('react');
const ReactDom = require('react-dom');
const { hot } = require('react-hot-loader/root');


// import ResponseCheck from './ResponseCheckClass';
import ResponseCheck from './ResponseCheckHooks';

const Hot = hot(ResponseCheck);

ReactDom.render(<Hot />, document.querySelector('#root'));