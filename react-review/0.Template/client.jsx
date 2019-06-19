const React = require('react');
const ReactDom = require('react-dom');
const { hot } = require('react-hot-loader/root');


// import ResponseCheck from './ResponseCheckClass';
import T from './T';

const Hot = hot(T);

ReactDom.render(<Hot />, document.querySelector('#root'));