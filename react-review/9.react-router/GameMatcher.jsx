import React, { Component } from 'react';
import NumberBaseball from '../3.NumberBaseball/NumberBaseballClass';
import RSP from '../5.RockScissorPaper/RSPClass';
import Lotto from '../6.Lotto/Lotto';

// import { withRouter } from 'react-router-dom';

class GameMatcher extends Component { // 동적 라우터 매칭 후 여기서 화면을 구분해주자.
    render() {
        console.log(this.props.location.search);
        if (this.props.match.params.name ==='number-baseball') { // 이런식으로 분기 처리를 해준다.
            return <NumberBaseball />
        } else if (this.props.match.params.name === 'rock-scissors-paper') {
            return <RSP />
        } else if (this.props.match.params.name === 'lotto-generator') {
            return <Lotto />
        };
        console.log(this.props.history, this.props.match);
        return ( // 분기 처리 빠져나온다면
            <>
                <div>
                    일치하는 게임이 없습니다.
                </div>
            </>

        )
    }
}
// 게임매쳐 컴포넌트가 라우트랑 연결이 안되있다고 가정했을 때,
// this.props.history, this.props.match 이렇게 쓰고 싶다면?

// import { withRouter } from 'react-router-dom'; 위에서 선언 할당해준 후,
// export default withRouter(GameMatcher); 
// hoc패턴으로 위처럼 감싸주면 history, match, location이 생긴다.

export default GameMatcher