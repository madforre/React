import React, { Component } from 'react';

class Madforre extends Component {
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