import React, { Component } from 'react';

class PhoneForm extends Component {
    state = {
        name: '',
        phone: ''
    }
    handleChange = (e) => {
        console.log(e.target.name)
        this.setState({
            // 자바스크립트 문법
            // Computed property names
            [e.target.name]:e.target.value
        })
    }
    render() {
        return (
            <form>
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
                <div>{this.state.name} {this.state.phone}</div>
            </form>
        );
    }
}

export default PhoneForm;