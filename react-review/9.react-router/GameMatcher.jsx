import React, { Component } from 'react';
// import { withRouter } from 'react-router-dom';

export default class GameMatcher extends Component { // 동적 라우터 매칭 후 여기서 화면을 구분해주자.
    render() {
        console.log(this.props);
        console.log(this.props.history, this.props.match);
        return (
            <div>게임매쳐</div>
        )
    }
}
// 게임매쳐 컴포넌트가 라우트랑 연결이 안되있다고 가정했을 때,
// this.props.history, this.props.match 이렇게 쓰고 싶다면?

// import { withRouter } from 'react-router-dom'; 위에서 선언 할당해준 후,
// export default withRouter(GameMatcher); 
// hoc패턴으로 위처럼 감싸주면 history, match, location이 생긴다.