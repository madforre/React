import React, { useState, useReducer, useCallback, useEffect } from 'react';
import Table from './Table';

// useReducer 쓸 때는 우리가 만든 state들을 모아놓으면 된다.
const initialState = {
    winner: '',
    turn: 'O',
    tableData: [ // 리액트는 state를 바꾸면 알아서 화면에 그려줌.
        // 데이터만 바꿔주면 됨! 불변성만 잘 지켜주자! 바꾸고 싶은 부분만 바꾸기!
        // 기존의 쌩 Javascript는 직접 화면에 그려야 했다. (DOM에 그려야 했음.)
        ['', '', ''],
        ['', '', ''],
        ['', '', '']
    ],
    recentCell: [-1, -1], // 처음에는 아무것도 안눌렀으니까 일단 없는 칸을 만들어 놓는다.
};

export const SET_WINNER = 'SET_WINNER'; // 액션의 이름은 대문자로 하는게 규칙임.
export const CLICK_CELL = 'CLICK_CELL'; // 액션을 하위 컴포넌트에서 써야 하니깐 export 해줌.
export const CHANGE_TURN = 'CHANGE_TURN';
export const RESET_GAME = 'RESET_GAME';
export const INIT_WINNER = 'INIT_WINNER';

// reduce 함수를 본따 만든 reducer.
const reducer = (state, action) => {
    // 리듀서 안에서 state를 어떻게 바꿀 것인지를 적어준다.
    switch (action.type) {
        case SET_WINNER:
            // state.winner = action.winner; 이렇게 하면 안됨.
            // 항상 새로운 객체를 만들어주어야함. 불변성 유지!
            return { // state를 어떻게 바꿀지 return으로 기술해주어야 한다.
                ...state, // 이전의 state를 shallow copy.
                winner: action.winner,
            };
        case CLICK_CELL: {
            const tableData = [...state.tableData]; // 얕은 복사
            tableData[action.row] = [...tableData[action.row]]; // useReducer의 불변성 지키는데 단점임.
            // row 역시 객체(배열이지만 자바스크립트에선 객체)이므로 copy 해줘야한다. 불변성 유지해줘야함.
            // immer 라는 라이브러리로 가독성 문제를 추후 해결할 수 있어요.

            // depth가 2라서 shallow copy를 두번 한것 같음. deep copy 써도 될거임.
            
            // 제대로 복사가 되었는지 테스트 해보았음.
            // const copy_test = tableData[action.row];
            // console.log(tableData[action.row] === [...tableData[action.row]] ? "참조" : "복사된 배열객체");
            // console.log(tableData[action.row] === hi ? "참조" : "복사된 배열객체");
            tableData[action.row][action.cell] = state.turn; // action.cell 은 그냥 값이니깐 복사 필요없음.
            return {
                ...state,
                tableData,
                recentCell: [action.row, action.cell],
            }
        }
        case CHANGE_TURN: {
            return {
                ...state, // tableData는 shallow copy 되었겠군..
                turn: state.turn === 'O' ? 'X' : 'O',
            }
        }
        case RESET_GAME: {
            const obj = {
                ...state,
                tableData: [
                    ['', '', ''],
                    ['', '', ''],
                    ['', '', '']
                ],
                recentCell: [-1, -1],
                turn: 'O',
            };
            if (action.draw) {
                obj['winner'] = "";
            }
            return obj;
        }
        default:
            return state; // switch 문이니깐 이렇게 써주면 된대..
    }
};

const TicTacToe = () => {
    // 3번째 인자는 지연 초기화라고 해서 Lazy initialize라고 있는데 거의안쓰고 복잡해질 때만 쓴다.
    const [state, dispatch] = useReducer(reducer, initialState); 
    const { tableData, turn, winner, recentCell } = state; // 이렇게 하면 나중에 앞에 state. 더이상 안써도 됨.

    // const [winner, setWinner] = useState('');
    // const [turn, setTurn] = useState('0');
    // const [tableData, setTableData] = useState([['','',''], ['','',''], ['','','']]); // 2차원 배열

    useEffect(() => {
        console.log("useEffect 실행");
        let win = false;
        let draw; // 무숭부 판별 변수
        
        // 승리 조건을 적어주자. 비동기라서 useEffect 쓰는게 좋음.
        const [row, cell] = recentCell;
        if (row < 0) return; // 처음꺼만 걸러줌.
        
        // 8개 경우의 수를 전부 구해주는 방법.
        if (tableData[row][0] === turn && tableData[row][1] === turn && tableData[row][2] === turn) {
            win = true; // 가로줄 검사
        }
        if (tableData[0][cell] === turn && tableData[1][cell] === turn && tableData[2][cell] === turn) {
            win = true; // 세로줄 검사
        }
        if (tableData[0][0] === turn && tableData[1][1] === turn && tableData[2][2] === turn) {
            win = true; // 대각선 검사1
        }
        if (tableData[0][2] === turn && tableData[1][1] === turn && tableData[2][0] === turn) {
            win = true; // 대각선 검사2
        }
        console.log(win, row, cell, recentCell, turn);
        if (win) { // 승리시
            dispatch({ type: SET_WINNER, winner: turn });
            // 승리한 유저가 있으면 게임을 리셋한다.
            dispatch({ type: RESET_GAME });
        } else {
            draw = true; // draw이 true면 무승부.
            tableData.forEach((row) => { // 무승부 검사
                row.forEach((cell) => {
                    if(!cell) {
                        draw = false;
                    }
                });
            });
            // 확인후 무승부면 게임을 리셋한다. 아닐경우 턴을 바꿔준다.
            draw ? dispatch({ type: RESET_GAME, draw: draw }) : dispatch({ type: CHANGE_TURN })
        }
        return () => {};
        // tableData 대신에 recentCell값이 바뀔 때마다 componentDidUpdate처럼 효과주기.
        // 단, useEffect니깐 componentDidMount 단계도 같이 실행된다.
    }, [recentCell]);

    // const onClickTable = useCallback( () => {
    //     dispatch({ type: SET_WINNER, winner: '0' }); // dispatch 안에 들어가는 애들은 액션이라고 부릅니다. 리덕스에서 따온 애들.
    //     // dispatch 안의 객체는 액션 객체가 되고,
    //     // dispatch 하면 그 액션을 실행하는게 됩니다.
    //     // 액션을 해석해서 state를 직접 바꿔주는 역할을 하는 친구가 필요함!

    //     // 액션을 dispatch 할 때마다 reducer가 실행됨.
    //     // 액션 타입으로 어떤 액션인지 구분함.
    //     // reducer와 dispatch를 통해 클릭시 state를
    //     // 액션안에 있는 state로 바꿔줄 수 있다!
    // }, []);

    return (
        // state 갯수 자체를 줄이는 useReducer를 써보자!
        // state가 많아지면 관리가 힘들겠죠?
        <>
            {/* dispatch도 넘겨주어야 해요. */}
            <Table tableData={tableData} dispatch={dispatch}/>
            {winner && <div>{winner}님의 승리!</div>}
        </>
    );
};

export default TicTacToe;