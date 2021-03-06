import React, { Component } from 'react';
import PhoneInfo from './PhoneInfo';

class PhoneInfoList extends Component {
    static defaultProps = {
        data: [],
        onRemove: () => console.warn('onRemove not defined'),
        onUpdate: () => console.warn('onUpdate not defined'),
    }

    shouldComponentUpdate(nextProps, nextState) {
        // 다음에 받아올 데이터가 현재 데이터랑 다른 배열일 때 true로 설정.
        return nextProps.data !== this.props.data;
    }

    render() {
        // App 컴포넌트의 상태가 업데이트 되면 리렌더링 발생하고, 리렌더링 되면
        // 자식 컴포넌트 또한 리렌더링 된다.
        console.log('render PhoneInfoList');

        // 할당하려는 변수가 undefined 일 때에는 비구조화 할당을 통해 내부의 값을
        // 받아올 수 없기 때문에 defaultProps 를 통하여 기본값을 설정해주어야 한다.
        const { data, onRemove, onUpdate } = this.props;
        
        // 자식 컴포넌트에서는 props 를 받아오기만하고, 받아온 props를 직접 수정 할 수 는 없습니다.
        // 그래서 map 같은 함수를 통해서 하위 컴포넌트에 전달하는 거임
        const list = data.map(
            info => (
                // 이해안되는 부분. 왜??? 컴포넌트 안에서 바꾸는가??
                // 데이터를 컴포넌트로 렌더링하는 과정이다.
                <PhoneInfo 
                    key={info.id}
                    info={info}
                    onRemove={onRemove}
                    onUpdate={onUpdate}
                />)
        );
        
        return (
            <div>
                {list}
            </div>
        );
    }
}

export default PhoneInfoList;