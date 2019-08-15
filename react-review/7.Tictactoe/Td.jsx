import React , { useCallback, useReducer } from 'react';
import { CLICK_CELL, CHANGE_TURN } from './TicTacToe';

const Td = ({ rowIndex, cellIndex, cellData, dispatch }) => {
    const onClickTd = useCallback(() => {
        // 기존에 셀 데이터가 있는 경우에는 이벤트를 종료한다.
        // console.log(cellData);
        if (cellData) return; // 이제 한번 클릭한 셀은 바뀌지 않음.

        // dispatch를 TicTacToe에서 넘겨받아야함.
        // console.log(rowIndex, cellIndex);
        // 액션 객체는 마음대로 만들어도 됨. reducer에서만 잘 처리해주자!

        dispatch({ type: CLICK_CELL, row: rowIndex, cell: cellIndex });
        dispatch({ type: CHANGE_TURN });

        // 여기서 state의 turn 찍어보면 dispatch 하기 전의 turn이 찍힌다.

    }, [cellData]); // 셀데이터는 계속 바뀌는 값이니깐 기억을 잊게해야한다고 한다.

    return (
        <td onClick={onClickTd}>{''}{cellData}</td>
    );
};

export default Td;