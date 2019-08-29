import React from 'react';
import { BrowserRouter, HashRouter, Link, Route } from 'react-router-dom';
import NumberBaseball from '../3.NumberBaseball/NumberBaseballClass';
import RSP from '../5.RockScissorPaper/RSPClass';
import Lotto from '../6.Lotto/Lotto';
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
            <Link to="/game/index">게임 매쳐</Link>
            {/* <Link to="/lotto-generator">로또 생성기 테스트</Link> */}
            </div>
            <div>
                change
                <br/>
                {/* 동적 라우터 사용하면 라우터를 하나로 압축 가능 */}
                {/* <Route path="/number-baseball" component={NumberBaseball}></Route>
                <Route path="/rock-scissors-paper" component={RSP}></Route>
                <Route path="/lotto-generator" component={Lotto} /> */}
                <Route path="/game/:name" component={GameMatcher} />
            </div>
        </BrowserRouter>
        // </HashRouter>
    );
};

export default Games;