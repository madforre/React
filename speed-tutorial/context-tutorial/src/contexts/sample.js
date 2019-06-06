import React, { Component, createContext } from 'react';

const Context = createContext(); // Context 생성

// Context 안에는 Provider 와 Consumer 라는게 존재한다.
// 이 둘은, Context 를 이용하기 위해 필요한 컴포넌트들입니다.

// Consumer 는 나중에 내보내줄 때 편하도록 SampleConsumer 라고 부르도록 설정
const { Provider, Consumer: SampleConsumer } = Context;

// Provider 에서 state 를 사용하기 위해서 컴포넌트를 새로 생성
class SampleProvider extends Component {
    state = {
        value: 'default'
    }

    // actions 라는 객체는 우리가 임의로 설정하는 객체이다.
    // 나중에 변화를 일으키는 함수들을 전달해줄때, 함수 하나하나 일일히 전달하는 것이 아니라
    // 통으로 한꺼번에 전달하기 위함이다. (객체 하나로)
    actions = {
        setValue: (value) => {
            this.setState({value});
        }
    }

    render() {
        const { state, actions } = this;
        // Provider 내에서 사용할 값은, "value" 라고 부른다.
        // 현재 컴포넌트의 state 와 actions 객체를 넣은 객체를 만들어서
        // Provider 의 value 값으로 사용한다.
        const value = { state, actions };
        return (
            <Provider value={value}>
                {this.props.children}
            </Provider>
        )
    }
}

// ::HoC 를 사용
function useSample(WrappedComponent) {
    return function UseSample(props) {
        return (
            <SampleConsumer>
                {
                    ({ state, actions }) => (
                        <WrappedComponent
                            value={state.value}
                            setValue={actions.setValue}
                        />
                    )
                }
            </SampleConsumer>
        )
    };
}


// 내보낸다.
export {
    SampleProvider,
    SampleConsumer,
    useSample
}