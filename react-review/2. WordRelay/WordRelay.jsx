// 파일을 쪼개는 경우 꼭 적어줘야할 코드들
const React = require('react');
const { Component } = React;
//

class WordRelay extends Component {
    state = {
        text: "Hello, Webpack",
    };

    render() {
        return <h1>{this.state.text}</h1>;
    }
}

// 파일을 쪼개는 경우 꼭 적어줘야할 코드
module.exports = WordRelay;
// 