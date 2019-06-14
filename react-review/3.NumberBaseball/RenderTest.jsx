import React, { Component } from 'react';

class Test extends Component {
    state = {
        counter: 0,
    };

    // shouldComponentUpdate(nextProps, nextState, nextContext) { // state가 그대로면 랜더링 안함.
    //     if (this.state.counter !== nextState.counter) {
    //         return true;
    //     }
    //     return false;
    // }

    onClick = () => {
        this.setState({})
    }

    render() {
        console.log('렌더링', this.state);
        return (<div>
            <button onClick={this.onClick}>클릭</button>
        </div>)
    }
}

export default Test;