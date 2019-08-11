import React, { memo, useState, useEffect, useRef, useMemo, useCallback } from 'react';
import Ball from './Ball';

const getWinNumbers = () => { // 보너스 번호까지 미리 n개 뽑음
    console.log('getWinNumbers');
    const winNumbers = [];
    let number;
    const n = 7;
    while(winNumbers.length < n) {
        number = Math.ceil(Math.random() * 45); // Math.random은 [0, 1)임.
        if (winNumbers.indexOf(number) == -1) {
            winNumbers.push(number);
        }
    }
    return winNumbers;
}

const LottoHooks = memo(() => { 
    // hooks는 state가 바뀔때마다 (또는 useEffect에서 componentDidUpdate 한 부분이 바뀔 때마다.)
    // 컴포넌트 전체가 재실행되기때문에 메모이제이션을 구현해놔야 한다.
    const lottoNumbers = useMemo(() => getWinNumbers(), []);

    const [winBalls, setWinBalls] = useState([]); // 순서도 신경써주자.
    // 아래처럼 winBalls가 계속 변할 때마다 getWinNumbers도 계속 실행되게 할 수도 있음.
    // const lottoNumbers = useMemo(() => getWinNumbers(), [winBalls]); 
    

    const [winNumbers, setWinNumbers] = useState(lottoNumbers);
    
    const [bonus, setBonus] = useState(null);
    const [redo, setRedo] = useState(false);
    // useEffect, useMemo, useCallback 얘네들은 항상 두번째인자가 있음.
    // 알아두자 - 두번째 배열에 들어간 요소가 바뀌면 다시실행됨.

    const timeouts = useRef([]);

    const runTimeouts = () => {
        console.log('runTimeouts');
        const winballs_length = winNumbers.length - 1;
        // console.log(winNumbers);
        for (let i = 0; i < winballs_length; i++) {
            timeouts.current[i] = setTimeout( () => { // 얘는 바뀌는거 아님.
                setWinBalls( (prevWinBalls) => [...prevWinBalls, winNumbers[i]] );
            }, (i + 1) * 1000);
        }
        timeouts.current[winballs_length] = setTimeout(() => {
            setBonus(winNumbers[winballs_length]);
            setRedo(true);
        }, winNumbers.length * 1000);
    }

    useEffect(() => { 
        console.log("useEffect")
        runTimeouts(); // componentDidMount 역할
        return () => {
            // componentWillUnmount 역할
            timeouts.current.forEach((v) => { clearTimeout(v); });
        };
    }, [timeouts.current]); // componentDidUpdate 할 부분 설정

    useEffect(() => { 
        // state 별로 componentDidUpdate 할 게 다르다면 useEffect를 여러개 써주면 된다!
        console.log('로또 숫자를 생성합니다.');
    }, [winNumbers]);

    const onClickRedo = useCallback(() => {
        // 함수 컴포넌트는 전체가 재실행된다. 이 때 onClickRedo처럼 함수들을 생성하는 로직역시
        // 같이 재실행 된다. 함수 생성자체가 비용이 크다면, 함수 자체를 기억해둬서
        // 그 함수 자체를 render 하는 부분에 넣어줄 수 있다!!

        console.log('onClickRedo');
        
        console.log(winNumbers); 
        // useCallback 두번째 인자가 비어있다면,
        // 콘솔에 매번 바뀌는 값이 찍히는게 아닌 첫번째 값만 기억하는 것을 확인할 수 있음.

        setWinNumbers(getWinNumbers());
        setWinBalls([]);
        setBonus(null);
        setRedo(false);
        timeouts.current = []; // current에다 직접 넣은거라 예전이랑 달라짐. 즉 바뀌는거임
    }, [winNumbers]); // 두번째 인자의 배열에 winNumbers가 없으면 
    // winNumbers 값을 평생 기억함. state쓰이는 winNumbers를 요소에 넣어줘야 강제로 잊어먹게함.

    return (
        <>
            ㅎㅇㅎㅇ
            <h1>로또 추출기</h1>
            <div>
                <h2>당첨 번호</h2>
                {winBalls.map((v) => <Ball key={v} number={v} />)}
            </div>
            <h2>보너스!</h2>
            {bonus && <Ball number={bonus} />}
            {redo && <button onClick={onClickRedo}>한번 더!</button>}
            
        </>
    );
    
});

export default LottoHooks;