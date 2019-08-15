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

        // 턴을 클릭시 바꿔주는게 아니라 테이블 데이터가 바뀌었을 때 바꿔줘야 하는거 아님??
        // 클릭과 동시에 상대 턴으로 넘어간다??? 승리하거나 패배하거나 비기는 경우
        // 상대 턴으로 넘어가지말고 종료되어야 하므로 여기서 써주면 안된다.
        // dispatch({ type: CHANGE_TURN }); 여기서 사용 x 승리, 패배, 무승부 아닐시 써준다?

        // 여기서 state의 turn 찍어보면 dispatch 하기 전의 turn이 찍힌다.

    }, [cellData]); // 셀 데이터는 계속 바뀌는 값이니깐 기억을 잊게해야한다. ( 함수안에서 메모이즈된 이전의 cellData를 사용함. )

    return (
        <td onClick={onClickTd}>{cellData}</td>
    );
};

export default Td;