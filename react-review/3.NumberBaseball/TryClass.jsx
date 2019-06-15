import React, { PureComponent } from 'react';

class Try extends PureComponent {
    constructor(props) {
        super(props);
        // constructor, super를 굳이 써주는 이유??
        // 함수 안에서 다른동작이 가능하다.
        // 정밀한 컨트롤 또는 동작이 필요할 때
        // 사용한다.

        this.state = {
            result: this.props.result,
            try: this.props.try,
        };
    }


    state = { // 전달받은 props를 자식에서 쓰는 방법
        result: this.props.result,
        try: this.props.try,
    };


    render() {
        const { tryInfo } = this.props;
        return (
            <li>
                <div>{tryInfo.try}</div>
                <div>{tryInfo.result}</div> 
            </li>
        )
    }
}


export default Try;