import React, { Component } from 'react';
// import { SampleConsumer } from '../contexts/sample'; - consumer 사용
import { useSample } from '../contexts/sample';

// 이 컴포넌트에서는 값을 설정시킬 form 을 만든다.
class Sends extends Component {

    state = {
        input: '',
    }

    componentDidMount() {
        // :: 초기 값 설정
        this.setState({
            input: this.props.value,
        })
    }

    handleChange = (e) => {
        this.setState({ input: e.target.value });
    }

    handleSubmit = (e) => {
        e.preventDefault();
        // :: props로 받은 setValue 호출
        this.props.setValue(this.state.input);
    }

    render() {
        return (
            <form onSubmit={this.handleSubmit}>
                <input type="text" value={this.state.input} onChange={this.handleChange}/>
                <button type="submit">설정</button>
            </form>
        );
    }
}

// // :: Consumer 를 사용하여 context 값을 전달해준 컨테이너 컴포넌트

// // 단순히 render 에서만 필요한게 아니라, 내부에 있는 메소드에서도 필요로 한다면?
// // render 에서 Consumer 를 사용하는 형태로 구현하지 않고,
// // SendsContainer 라는 컨테이너 컴포넌트를 추가적으로 만들어서 props 로 필요한 값을
// // 전달하는 방식으로 구현한다.
// const SendsContainer = () => (
//     <SampleConsumer>
//         {
//             ({state, actions}) => (
//                 <Sends 
//                     value={state.value}
//                     setValue={actions.setValue}
//                 />
//             )
//         }
//     </SampleConsumer>
// )

// // :: Sends 대신에 SendsContainer 를 내보내준다.
// export default SendsContainer;  


// HOC사용

export default useSample(Sends);