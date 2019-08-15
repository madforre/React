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
};

export const SET_WINNER = 'SET_WINNER'; // 액션의 이름은 대문자로 하는게 규칙임.
export const CLICK_CELL = 'CLICK_CELL'; // 액션을 하위 컴포넌트에서 써야 하니깐 export 해줌.
export const CHANGE_TURN = 'CHANGE_TURN';

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
            }
        }
        case CHANGE_TURN: {
            return {
                ...state,
                turn: state.turn === 'O' ? 'X' : 'O',
            }
        }
    }
};

const TicTacToe = () => {
    // 3번째 인자는 지연 초기화라고 해서 Lazy initialize라고 있는데 거의안쓰고 복잡해질 때만 쓴다.
    const [state, dispatch] = useReducer(reducer, initialState); 
    // const [winner, setWinner] = useState('');
    // const [turn, setTurn] = useState('0');
    // const [tableData, setTableData] = useState([['','',''], ['','',''], ['','','']]); // 2차원 배열

    useEffect(() => {
        return () => {};
    }, [])

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
            <Table tableData={state.tableData} dispatch={dispatch}/>
            {state.winner && <div>{state.winner}님의 승리</div>}
        </>
    );
};

export default TicTacToe;