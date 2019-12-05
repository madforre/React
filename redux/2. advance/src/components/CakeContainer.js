import React from 'react';
import { connect } from 'react-redux';
import { buyCake } from '../redux';

function CakeContainer(props) {
    return (
        <div>
            <h2>Number of cakes - {props.numOfCakes}</h2>
            <button onClick={props.buyCake}>Buy Cake</button>
        </div>
    )
}

// 액션과 리듀서는 셀렉터라고 생각하자.
// 이 예제는 간단하지만, 만약 큰 애플리케이션이라면 몇몇개의 데이터는 필요에 맞게 가공되어야 한다.
// 큰 애플리케이션이라면 몇몇줄의 코드와 maps data props function 보다는 외부에 셀렉터들로 분리하여야 한다.

// 여기서는 심플한 예제이니 map state&dispatch to props 로 진행해본다.
const mapStateToProps = state => { // 역할 - 리덕스 스토어에 컴포넌트 props를 연결한다. - 리액트 컴포넌트가 스토어에서 상태를 읽어올 수 있게 된다.
    // Redux state를 파라미터로 가져와서 props에 연결한다.
    return {
        numOfCakes: state.cake.numOfCakes // JSX로 렌더링되는 곳에 리덕스 스토어의 numOfCakes state 값을 props 객체 안의 numOfCakes 키로 할당한다.
    }
}

const mapDispatchToProps = dispatch => { // defining mapDispatchToProps. - 리액트 컴포넌트가 스토어에 액션을 보낼 수 있게 된다.
    return {// 역할 - 위와 비슷하게 액션 크리에이터를 디스패치할 때 디스패치를 컴포넌트와 연결한다.  
        // Redux에서 파라미터로 dispatch 메소드를 가져온다.
        buyCake: () => dispatch(buyCake()) // Redux의 액션 크리에이터와 연결한다. 이제 props에서 buyCake를 함수로 실행하면 액션을 급파할 것이다.
    }
}

// 정의를 다했다면 이제 리액트 컴포넌트에 HOC형태로 연결할 것이다.
// connect 함수는 리액트 컴포넌트와 리덕스 스토어를 연결한다.

// 아래의 export는 CakeContainer 컴포넌트를 리덕스 스토어에 연결하는 경우이다.
// 리액트와 리덕스를 연결하는 기본적인 패턴임.
export default connect(
    mapStateToProps,
    mapDispatchToProps
)(CakeContainer);