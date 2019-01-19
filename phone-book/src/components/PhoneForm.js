import React, { Component } from 'react';

class PhoneForm extends Component {
    // state 는 컴포넌트 내부에서 선언하며 내부에서 값을 변경 할 수 있습니다. (동적인 데이터 다룸)
    state = {
        name: '',
        phone: ''
    }
    handleChange = (e) => {
        console.log(e.target.name)
        this.setState({
            // 자바스크립트 문법
            // Computed property names
            [e.target.name] : e.target.value
        })
    }
    handleSubmit = (e) => {
        /* 페이지 리로딩 방지 (form에서 submit 발생하면 페이지를 다시 불러오므로)
           지니고 있는상태를 다 잃어버리기 때문에 방지해주어야 한다. */
        e.preventDefault();
        // 상태 값을 onCreate 를 통하여 부모에게 전달
        this.props.onCreate(this.state);
        // 상태 초기화
        this.setState({
            name: '',
            phone: ''
        })
    }
    render() {
        return (
            <form onSubmit={this.handleSubmit}>
                {/* onChange 이벤트가 발생하면, e.target.value 값을 통하여 
                    이벤트 객체에 담겨있는 현재의 텍스트 값을 읽어올 수 있다. */}
                <input
                  placeholder="이름"
                  // name 값 초기화까지 고려하여 value를 설정해주었다.
                  value={this.state.name}
                  // onChange 이벤트는 input의 텍스트 값이 바뀔 때마다 발생한다.
                  onChange={this.handleChange}
                  name="name"
                />
                <input
                  placeholder="전화번호"
                  value={this.state.phone}
                  onChange={this.handleChange}
                  name="phone"
                />
                <button type="submit">등록</button>
            </form>
        );
    }
}

export default PhoneForm;