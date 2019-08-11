// import React, { PureComponent } from 'react';
// 보통 제일 끝에 있는 컴포넌트는 퓨어컴포넌트로 하는 편.
// 데이터를 담고 있다기보단 화면에 뿌려주는 랜더링 역할을 하는 컴포넌트들이기 때문.

// class Ball extends PureComponent {
//     render() {
//         const { number } = this.props;
//         let background; // 당첨 숫자마다 색깔 표현. 범위별로 그냥 공 색깔 표현.
//         if (number <= 10) {
//             background = 'red';
//         } else if (number <= 20) {
//             background = 'orange';
//         } else if (number <= 30) {
//             background = 'yellow';
//         } else if (number <= 40) {
//             background = 'blue';
//         } else {
//             background = 'green';
//         }
//         return (
//             <div className="ball" style={{ background }}>{number}</div>
//         )
//     }
// }

// 사실 hooks도 필요 없고 그냥 함수형 컴포넌로 해도 됨. state를 안쓰는 애들이니깐.

import React, { memo } from 'react'; 
// 메모로 감싸줌. 컴포넌트가 컴포넌트를 감쌌음.
// 이런걸 고차 컴포넌트라고 한다. high order component. hoc.

// 함수형 컴포넌트는 퓨어컴포넌트가 아니기 때문에 memo로 감싸줘야 한다.
// 퓨어컴포넌트로 만들기 위해서는 퓨어컴포넌트를 쓰거나 react의 memo로 함수형 컴포넌트를 감싸면 된다.
const Ball = memo( ({ number }) => {
    let background; // 당첨 숫자마다 색깔 표현. 범위별로 그냥 공 색깔 표현.
    if (number <= 10) {
        background = 'red';
    } else if (number <= 20) {
        background = 'orange';
    } else if (number <= 30) {
        background = 'purple';
    } else if (number <= 40) {
        background = 'blue';
    } else {
        background = 'green';
    }
    return (
        <div className="ball" style={{ background }}>{number}</div>
    )
});

export default Ball;