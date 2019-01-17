import React, { Component } from 'react';

class Madforre extends Component {
    // 초기 state는 transform-class-properties 문법으로
    // constructor 바깥에서 정의할 수도 있음
    static defaultProps = {
        name : 'default'
    }
    render() {
        return (
            <div>
                Nickname - <b>{this.props.name}</b> 입니다.
            </div>
        );
    }
}

// 아래 방식으로도 defaultProps 설정 가능. 함수형 컴포넌트에서 사용
// Madforre.defaultProps ={
//     name: '기본이름'
// };

export default Madforre;