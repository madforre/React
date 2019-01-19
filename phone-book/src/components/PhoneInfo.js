import React, { Component } from 'react';

class PhoneInfo extends Component {
    // props가 전달받지 않았을 경우를 대비한다. 앱 크래쉬 방지
    static defaultProps = {
        info: {
            name: '이름',
            phone: '010-0000-0000',
            id: 0
        },
        onRemove: () => console.warn('onRemove not defined ! 안녕 난 앱 크래쉬 방지용 에러'),
    }

    handleRemove = () => {
        // 삭제 버튼이 클릭되면 onRemove 에 id 넣어서 전달받은 app 컴포넌트의 메소드를 호출할 것이다.
        
        // console.log(this.props)
        
        // 객체 비구조화 할당
        const { info, onRemove } = this.props;
        onRemove(info.id);
    }

    render() {
        const style = {
            border: '1px solid black',
            padding: '8px',
            margin: '8px'
        };
        // info 라는 객체를 props 로 받아와서 렌더링
        // 실수로 info 값을 전달하지 않았다면 컴포넌트가 크래쉬 될 것이다.
        // 왜? info가 undefined 일 때에는 비구조화 할당을 통해 내부의 값을
        // 받아올 수 없기 때문이다.
        // 그렇기 때문에 defaultProps 를 통하여 info의 기본값을 설정해주었다.
        const {
            name, phone, id
        } = this.props.info;

        return (
            <React.Fragment>
                <hr/>
                <div style={style}>
                    <div><b>{name}</b></div>
                    <div>{phone}</div>
                    <div>{id}</div>
                    <button onClick={this.handleRemove}>삭제</button>
                </div>
            </React.Fragment>
        );
    }
}

export default PhoneInfo;