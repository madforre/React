import React, { useContext, useCallback, memo, useMemo } from 'react';
import { TableContext, CODE, OPEN_CELL, CLICK_MINE, FLAG_CELL, QUESTION_CELL, NORMALIZE_CELL } from './MineSearch';


const getTdStyle = (code) => { 
    // 데이터에 따라서 알아서 화면을 바꿔주기 때문에
    // 이런 점에서 리액트가 좋아요!
    switch (code) {
        case CODE.NORMAL:
        case CODE.MINE:
            return {
                background: 'skyblue',
                cursor: 'pointer',
            }
        case CODE.CLICKED_MINE:
        case CODE.OPENED:
            return {
                background: 'white',
            };
        case CODE.FLAG_MINE:
        case CODE.FLAG:
            return {
                background: 'red',
            }
        case CODE.QUESTION_MINE:
        case CODE.QUESTION:
            return {
                background: 'yellow',
            }
        default:
            return {
                background: 'white',
            };
    }
};

const getTdText = (code) => {
    console.log("리랜더링 테스트");
    switch (code) {
        case CODE.NORMAL:
            return '';
        case CODE.MINE:
            return 'X'; // 일단 디버깅을 위해 X자 써놓자.
        case CODE.CLICKED_MINE:
            return '펑';
        case CODE.FLAG_MINE:
        case CODE.FLAG:
            return '!';
        case CODE.QUESTION_MINE:
        case CODE.QUESTION:
            return '?';
        default:
            return code || ''; // undefined, 0 인 경우는 없애주자.
    }
}

const Td = memo(({rowIndex, colIndex}) => {
    // 재랜더링시 어쩔수 없는 부분(useContext 사용하는 부분.)은 랜더링 하는 부분이라도 따로 캐싱 필요.
    const { tableData, dispatch, halted } = useContext(TableContext) // 실제 데이터를 useContext를 사용하여 받음.

    const onClickTd = useCallback((e) => {
        console.log(tableData[rowIndex][colIndex]);
        if (halted) {
            return;
        }
        // 열린 칸, 닫힌 칸 등등 칸 별로 동작이 달라져야 한다. switch 문 사용하였음.
        switch (tableData[rowIndex][colIndex]) {
            case CODE.OPENED:
            case CODE.FLAG_MINE:
            case CODE.FLAG:
            case CODE.QUESTION_MINE:
            case CODE.QUESTION:
                return;
            case CODE.NORMAL:
                dispatch({ type: OPEN_CELL, row: rowIndex, col: colIndex });
                return;
            case CODE.MINE:
                dispatch({ type: CLICK_MINE, row: rowIndex, col: colIndex });
                return;
            default:
                return;
        }
    }, [tableData[rowIndex][colIndex], halted]);

    const onRightClickTd = useCallback( (e) => {
        e.preventDefault(); // 우클릭 방지
        if (halted) {
            return;
        }
        switch (tableData[rowIndex][colIndex]) {
            case CODE.NORMAL:
            case CODE.MINE:
                dispatch({ type: FLAG_CELL, row: rowIndex, col: colIndex }); // 보통 칸은 깃발 칸.
                return;
            case CODE.FLAG_MINE:
            case CODE.FLAG:
                dispatch({ type: QUESTION_CELL, row: rowIndex, col: colIndex }); // 깃발 칸은 물음표 칸.
                return;
            case CODE.QUESTION_MINE:
            case CODE.QUESTION:
                dispatch({ type: NORMALIZE_CELL, row: rowIndex, col: colIndex }); // 물음표 칸은 보통 칸
                // 요렇게 이벤트가 순환이 된다.
                return; // switch문은 항상 break든 return 이든 끊어주어야 한다.
            default:
                return;
            // 일단 선언은 이렇게 해주고 구체화, 구현은 나중에 해주면 된다.
        }
    }, [tableData[rowIndex][colIndex], halted]);

    // 몇번째 칸, 몇번째 줄인지는 부모로부터 props로 받아서
    // 현재 td 컴포넌트에서도 내가 몇번째 줄 몇번째 칸인지 알 수 있다.
    // return useMemo(() => ( // useMemo로 랜더링 하는 부분을 따로 캐싱해주었음. (useContext 리랜더링 문제 해결)

    //     // <td>{tableData[rowIndex][colIndex]}</td>
    //     <td
    //         style={getTdStyle(tableData[rowIndex][colIndex])}
    //         onClick={onClickTd}
    //         onContextMenu={onRightClickTd}
    //     >{getTdText(tableData[rowIndex][colIndex])}</td>
    //     ), [tableData[rowIndex][colIndex]]);

    // 아래처럼 따로 랜더링 컴포넌트를 빼서 memo 먹여줘도 됨.
    return <RealTd onClickTd={onClickTd} onRightClickTd={onRightClickTd} data={tableData[rowIndex][colIndex]} />;
});

const RealTd = memo(({onClickTd, onRightClickTd, data}) => {
    console.log('real td rendered');
    return (
        <td
            style={getTdStyle(data)}
            onClick={onClickTd}
            onContextMenu={onRightClickTd}
        >{getTdText(data)}</td>
    )
});

export default Td;