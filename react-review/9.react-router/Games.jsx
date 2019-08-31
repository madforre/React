import React from 'react';
import { BrowserRouter, HashRouter, Link, Route } from 'react-router-dom';
import GameMatcher from './GameMatcher';

const Games = () => {
    return (
        // <HashRouter>
        <BrowserRouter>
        {/* 가상의 페이지 주소들을 만들어서 각각 컴포넌트들과 연결해줌. */}
            <div>
                common
                <br/>
            <Link to="/game/number-baseball">숫자 야구</Link>
            &nbsp;
            <Link to="/game/rock-scissors-paper">가위바위보</Link>
            &nbsp;
            <Link to="/game/lotto-generator">로또 생성기</Link>
            &nbsp;
            <Link to="/game/index?test=querystring&test2=itworks">게임 매쳐</Link>
            {/* <Link to="/lotto-generator">로또 생성기 테스트</Link> */}
            </div>
            <div>
                change
                <br/>
                {/* 동적 라우터 사용하면 라우터를 하나로 압축 가능 */}
                {/* <Route path="/number-baseball" component={NumberBaseball}></Route>
                <Route path="/rock-scissors-paper" component={RSP}></Route>
                <Route path="/lotto-generator" component={Lotto} /> */}
                <Route exact path="/" render={(props) => <GameMatcher {...props}/>}/>
                <Route path="/game/:name" render={(props) => <GameMatcher { ...props} />}/>

                {/* props 넘겨주는 두가지 방법 */}

                {/* 1. 컴포넌트 사용하여 값 넘기기 */}
                {/* <Route path="/game/:name" component={() => <GameMatcher props={props.abc}/> } */}

                {/* 2. Render Props 사용 */}
                {/* props 받아서 랜더로 넘긴다. */}
                {/* <Route path="/game/:name" render={(props) => <GameMatcher props={props.abc}/> } */}

            </div>
        </BrowserRouter>
        // </HashRouter>
    );
};

export default Games;