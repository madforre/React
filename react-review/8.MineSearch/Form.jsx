import React, { useState, useCallback, useContext, memo, useMemo } from 'react';
import { TableContext, START_GAME } from './MineSearch';

const Form = memo(() => {
    const [row, setRow] = useState(10);
    const [col, setCol] = useState(10);
    const [mine, setMine] = useState(20);
    const { dispatch } = useContext(TableContext); // <- 재랜더링시 어쩔수 없는 부분. 랜더링 하는 부분이라도 따로 캐싱 필요.

    const onChangeRow = useCallback((e) => {
        setRow(e.target.value);
    }, [row]);

    const onChangeCol = useCallback((e) => {
        setCol(e.target.value);
    }, [col]);

    const onChangeMine = useCallback((e) => {
        setMine(e.target.value);
    }, [mine]);

    const onClickBtn = useCallback(() => {
        dispatch({ type: START_GAME, row, col, mine }); // 액션 객체를 만들어서 액션에 전해준다.
    }, [row, col, mine]);

    return (
        <div>
            <input type="number" placeholder="가로" value={row} onChange={onChangeRow} />
            <input type="number" placeholder="세로" value={col} onChange={onChangeCol} />
            <input type="number" placeholder="지뢰" value={mine} onChange={onChangeMine} />
            <button onClick={onClickBtn}>시작</button>
        </div>
    );
});

export default Form;