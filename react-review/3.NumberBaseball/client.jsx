const React = require('react');
const ReactDom = require('react-dom');
const { hot } = require('react-hot-loader/root');

// const NumberBaseball = require('./NumberBaseballClass');

// import NumberBaseball from './NumberBaseballClass';

import NumberBaseball from './NumberBaseballHooks';

// import NumberBaseball from './RenderTest';

const Hot = hot(NumberBaseball);

ReactDom.render(<Hot />, document.querySelector('#root'));