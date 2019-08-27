import React, { useReducer, createContext, useMemo, useEffect } from 'react';
import Table from './Table';
import Form from './Form';
import { clearTimeout } from 'timers';

export const CODE = {
    // opened 빼고는 마음대로 구현한거임. 나머지는 임의로 마이너스로 코드준거고.
    MINE: -7,
    NORMAL: -1,
    QUESTION: -2,
    FLAG: -3,
    QUESTION_MINE: -4,
    FLAG_MINE: -5,
    CLICKED_MINE: -6,
    OPENED: 0, // 0 이상이면 다 opened가 되게끔 구현할거임.
}

export const TableContext = createContext({
    // 초기값 넣어주기 (모양만 맞춰주자.)
    tableData: [], // 배열
    halted: true,
    dispatch: () => {}, // 함수
}); // context 생성

const initialState = {
    tableData: [],
    data: { // 승리 조건 체크를 위해 필요한 데이터 state.
        row: 0,
        col: 0,
        mine: 0,
    },
    timer: 0,
    result: '',
    halted: true, // 중지됐는가?
    openedCount: 0 // 칸을 몇 개 열었는가?
};

const layMines = (row, col, mine) => {
    console.log(row, col, mine);
    const candidate = Array(row * col).fill().map((arr, i) => {return i;})
    const shuffle = [];
    // while (candidate.length > row * col - mine) {
        // 후보 전체 길이에서 모든 지뢰를 뺀만큼 100 - 20(지뢰) 이라고 가정하면
        // 후보 전체 길이가 80을 초과하면 true, 이하가 되면 false->루프 종료.
    console.log(shuffle, "shuffle");
    while (shuffle.length < mine) {
        // 내가 짠 루프 조건. 개인적으로는 이게 더 편함.

        // 예) 0에서 90미만 인덱스 추출, 해당 인덱스로부터 시작하여 두번째 인자인 1만큼 추출.
        // 추출된 값은 원래 배열에서 없어짐 즉 루프 한번당 candidate 길이가 하나씩 짧아진다는 것.
        const chosen = candidate.splice(Math.floor(Math.random() * candidate.length ), 1)[0];
        shuffle.push(chosen);
        
        // 몇번째 칸에다가 지뢰를 심을지 미리 정해준다.
    }
    console.log(shuffle, "shuffled (index)")
    let data = [];
    console.log(data);
    for (let i = 0; i < row; i++) {
        const rowData = [];
        data.push(rowData);
        for (let j = 0; j < col; j++) {
            rowData.push(CODE.NORMAL);
        } // 총 10 x 10 = 100칸이라고 가정, 이제 지뢰를 심으면 된다.
        // 일단 모든 칸을 노말로 만들어준거임.
    }

    // 아래의 로직이 없을 경우 모든 칸이 전부 노말칸임. (배열 객체의 값들이 참조관계.)
    // 아래 로직 실행하면 data 콘솔찍어보면 지뢰 섞인거로 나올거임.
    // console.log(data, "show data"); 
    
    data = function(data, shuffle) {
        console.log(shuffle, 'shuffle')
        for (let k = 0; k < shuffle.length; k++) {
            // (m,n) 계산
            const ver = Math.floor(shuffle[k] / col); // 몫
            const hor = shuffle[k] % col; // 나머지
            // 몇 콤마 몇인지가 계산된다.

            data[ver] && data[ver][hor] ? data[ver][hor] = CODE.MINE : null; // 에러 방지용으로 코드 추가함.
        }
        return data;
    }(data, shuffle);

    console.log(data);
            
    // 인덱스를 랜덤으로 뽑아서 해당 인덱스에 해당하는 값들을 지뢰로 바꿔준거네.
    return data;
}

export const START_GAME = 'START_GAME'; // 액션명 만들었음.
export const OPEN_CELL = 'OPEN_CELL'; // 오픈했을 때의 액션명 지정.
export const CLICK_MINE = 'CLICK_MINE';
export const FLAG_CELL = 'FLAG_CELL';
export const QUESTION_CELL = 'QUESTION_CELL';
export const NORMALIZE_CELL = 'NORMALIZE_CELL';
export const INCREMENT_TIMER = 'INCREMENT_TIMER';

const reducer = (state, action) => {
    switch (action.type) {
        case START_GAME:
            return {
                ...state,
                data: {
                    row: action.row,
                    col: action.col,
                    mine: action.mine,
                    },
                tableData: layMines(action.row, action.col, action.mine),
                halted: false,
                openedCount: 0,
                timer: 0,
            };
        case OPEN_CELL: {
            const tableData = [...state.tableData];
            // 어떤칸이 새로 만들어질지 모르기 때문에 불변성 유지를 위해 2단계 deep copy 필요.
            // 걍 통째로 새로만들꺼임.
            tableData.forEach((row, i) => { // depth 2 까지 복사해줌.
                tableData[i] = [...state.tableData[i]];
            }); // 이제 모든 칸들이 새로운 객체로 만들어졌다.

            // 한번 검사한 값은 캐싱해주어야 한다. (다이나믹 프로그래밍이랑 비슷함.)
            const checked = [];
            console.log(tableData.length, tableData[0].length);
            
            let openedCount = state.openedCount;

            const checkAround = (row, col) => { // 내 기준으로 검사하는 함수
                if ([CODE.OPENED, CODE.FLAG_MINE, CODE.FLAG, CODE.QUESTION_MINE, CODE.QUESTION].includes(tableData[row][col])) {
                    return; // 이미 열린 칸이나 지뢰가 있는 칸들은 한번에 열어보면 안되니깐 이런 것들은 막아준다. (재귀 생각.)
                }
                if (row < 0 || row > tableData.length - 1 || col < 0 || col > tableData[0].length - 1) {
                    return; // 상하좌우가 칸이 아닌 경우들을 필터링 해준다. (재귀까지 생각.)
                }

                // 빈칸이 빈칸을 열고 빈칸이 빈칸을 열고.. 루프에 빠지는 경우를 방지해주어야 한다. 
                // (안그러면 콜스텍, 호출스텍이 터진다.) 각종 보호장치들이 필요함.
                if (checked.includes(row + ',' + col)) { // 이미 검사한 칸이면 리턴.
                    return;
                } else { // 아닌 경우 checked에 push
                    checked.push(row + ',' + col);
                }
                
                let around = [];
                if (tableData[row - 1]) {
                    around = around.concat(
                        tableData[row - 1][col - 1],
                        tableData[row - 1][col],
                        tableData[row - 1][col + 1],
                    );
                }
                around = around.concat(
                    tableData[row][col - 1],
                    tableData[row][col + 1],
                )
                if (tableData[row + 1]) {
                    around = around.concat(
                        tableData[row + 1][col - 1],
                        tableData[row + 1][col],
                        tableData[row + 1][col + 1],
                    )
                }
                const count = around.filter((v) => [CODE.MINE, CODE.FLAG_MINE, CODE.QUESTION_MINE].includes(v)).length;
                // includes() 메서드는 배열이 특정 요소를 포함하고 있는지 판별합니다.
                // 요소가 undefined 든 상관없이 상관없이 걸러줌. undefined가 사라져버림.
                console.log(around, count);
                if (count === 0) { // 클릭한 셀의 주변이 전부 빈칸일시, 주변 애들을 기준으로 셀을 검사한다. (재귀로 퍼져나감)
                    const near = [];
                    if (row - 1 > -1) { // 이전 행이 0 초과일 경우에만 윗 행 검사 추가. (윗 행이 존재할 경우만.)
                        near.push([row - 1, col - 1]);
                        near.push([row - 1, col]);
                        near.push([row - 1, col + 1]);
                    }
                    near.push([row, col - 1]);
                    near.push([row, col + 1]);
                    if (row + 1 < tableData.length) { // 아래 행이 tableData의 총 길이를 넘지 않을 경우에만 검사 추가. (아래 행이 존재할 경우만.)
                        near.push([row + 1, col - 1]);
                        near.push([row + 1, col]);
                        near.push([row + 1, col + 1]);
                    }
                    // console.log(near, 'near');
                    near.forEach( (n) => {
                        if (tableData[n[0]][n[1]] !== CODE.OPENED) { // near 순회하며 tableData[행][열] 검사 시작.
                            checkAround(n[0], n[1]); // 주변 애들을 재귀적으로 검사한다. 이미 열린칸, 상하좌우 없는 칸등등 제외.
                        }
                    });
                }
                // --------- 버그 (재현하기 힘든 에러)
                // (이미 열어놓은 칸(숫자가 들어가 있는 칸)이 다른 지점에서 넓게 열었을 경우 겹칠 때 버그 발생. 중복 카운팅.)
                // 이미 열린 칸을 다시한번 열었을 경우에는 해당 칸의 숫자는 그대로 유지되는 것처럼 보이지만,
                // state를 다시 할당했을 것이다. 리액트가 state를 얕은 비교 했을 때, 이전 값과 다음 값이 똑같으므로 바뀌지 않았겠지.
                // 하지만 카운트는 다시 열린 만큼 중복하여 증가했을 것임. 따라서 그 중복되는 경우를 제거해주어야함.
                if(tableData[row][col] === CODE.NORMAL) openedCount += 1; // 지금 내가 열려는 칸이 닫힌 칸인 경우에만 카운트가 증가.
                // --------- 수정완료.

                tableData[row][col] = count; // 닫힌 칸에 카운트 할당. (주변이 전부 지뢰가 없는 경우에는 undefined 가 할당된다.)
            };
            checkAround(action.row, action.col);
            console.log(openedCount, "몇번열렸니?");
            let result = '';
            let halted = false;
            console.log( state.data.row * state.data.col - state.data.mine, "승리 조건 갯수", openedCount, "열린 갯수");;
            if (state.data.row * state.data.col - state.data.mine === openedCount ) { // 승리
                halted = true;
                result = `${state.timer}초만에 승리!`;
            }

            return { // 이 액션을 이제 td에 dispatch 해주면 됩니다.
                ...state,
                tableData,
                openedCount: openedCount,
                halted: halted,
                result: result,
            };
        }
        case CLICK_MINE: {
            const tableData = [...state.tableData];
            tableData[action.row] = [...state.tableData[action.row]];
            tableData[action.row][action.col] = CODE.CLICKED_MINE;
            return {
                ...state,
                tableData,
                halted: true,
            }
        }
        case FLAG_CELL: {
            const tableData = [...state.tableData];
            tableData[action.row] = [...state.tableData[action.row]];
            // 겉보기엔 똑같은데, 지뢰가 심어졌느냐에 따라 다름.
            if (tableData[action.row][action.col] === CODE.MINE) {
                tableData[action.row][action.col] = CODE.FLAG_MINE;
            } else {
                tableData[action.row][action.col] = CODE.FLAG;
            }
            return {
                ...state,
                tableData,
            }
        }
        case QUESTION_CELL: {
            const tableData = [...state.tableData];
            tableData[action.row] = [...state.tableData[action.row]];
            if (tableData[action.row][action.col] === CODE.FLAG_MINE) {
                tableData[action.row][action.col] = CODE.QUESTION_MINE;
            } else { // 지뢰가 없는 깃발 칸이면 그냥 QUESTION으로 바꿈.
                tableData[action.row][action.col] = CODE.QUESTION;
            }
            return {
                ...state,
                tableData,
            }
        }
        case NORMALIZE_CELL: {
            const tableData = [...state.tableData];
            tableData[action.row] = [...state.tableData[action.row]];
            if (tableData[action.row][action.col] === CODE.QUESTION_MINE) {
                tableData[action.row][action.col] = CODE.MINE;
            } else { // 지뢰가 없는 깃발 칸이면 그냥 QUESTION으로 바꿈.
                tableData[action.row][action.col] = CODE.NORMAL;
            }
            return {
                ...state,
                tableData,
            };
        }
        case INCREMENT_TIMER: {
            return {
                ...state,
                timer: state.timer + 1,
            }
        }
        default:
            return state;
    }
};

const MineSearch = () => {
    const [state, dispatch] = useReducer(reducer, initialState);
    const { tableData, halted, timer, result } = state; // 비구조화 할당. 코드 짧게 하기 좋음.

    // contextAPI는 이런 식으로 캐싱을 한번 해주어야 한다.
    // 그래야 contextAPI 쓸 때 성능저하가 덜 일어난다.
    // 안그러면 value 바뀔 때 프로바이더 하위 컴포넌트들도 전부 새로고침됨.
    const value = useMemo(()=> ({ tableData, halted, dispatch }), [tableData, halted]);

    useEffect(() => {
        let times;
        if (halted === false) {
            console.log(times);
            times = setInterval(() => {
                dispatch({ type: INCREMENT_TIMER })
            }, 1000);
        }
        return () => {
            clearInterval(times);
        }
    }, [halted]);

    // <Form dispatch={dispatch}/> 이렇게 props로 전달하는 방법 대신 ContextAPI 써보자!
    return (
        // 하위 컴포넌트에서 데이터로 접근하려면 프로바이더로 감싸주어야 한다.
        <TableContext.Provider value={value}>
            <h1>지뢰찾기</h1>
            <Form />
            <div>{timer}</div>
            <Table />
            <div>{result}</div>
        </TableContext.Provider>
    );
    
};

export default MineSearch;