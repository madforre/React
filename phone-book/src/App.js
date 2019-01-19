import React, { Component } from 'react';
import PhoneForm from './components/PhoneForm';
import PhoneInfoList from './components/PhoneInfoList';

// 컴포넌트 구조 App ( InfoList(Info), Form )
class App extends Component {
  id = 2
  // state 는 컴포넌트 내부에서 선언하며 내부에서 값을 변경 할 수 있습니다. (동적인 데이터 다룸)
  state = {
    information: [
      {
        id: 0,
        name: 'madforre',
        phone: '010-0000-0000'
      },
      {
        id: 1,
        name: 'linc',
        phone: '010-0000-0001'
      }
    ]
  }
  handleCreate = (data) => {
    // setState 할 때 함수형으로 프로그래밍 하면 실행 큐에 적재되어 차례차례 실행된다.
    // 비동기 작동을 피한다. 순서가 중요한 로직일 경우 예측되지 않은 결과를 초래할 수 있기 때문.
    const { information } = this.state;
    this.setState({
      // 리액트에서는 state 내부 값을 직접적으로 수정하면 안되므로 불변성 유지를 위해 concat 사용.
      information: information.concat({ id: this.id++, ...data })
    })
    // console.log(data);
  }
  // 전화번호 정보를 데이터에서 제외시키는 기능 구현
  handleRemove = (id) => {
    const { information } = this.state;
    this.setState({
      information: information.filter(info => info.id !== id)
    })
  }
  // ReactDom 에 정의되어있는 render 함수.
  render() {
    // this가 App class를 가르키는 것으로 보아 render 함수는 함수표현식으로 정의되어있을 것이다.
    // console.log(this);
    
    const { information } = this.state;
    return (
        <div>
          <p>
            Edit <code>src/App.js</code> and save to reload.
          </p>
          <PhoneForm 
            // 자식에게 전달할 함수 onCreate
            onCreate={this.handleCreate}
          />
          <h5>
           JSON을 String으로 변환하여 표시<hr />
           {JSON.stringify(information)}
          </h5>
          <PhoneInfoList
            data={information}
            // 실수로 함수를 전달하지 않았을 경우 app crash 발생한다.
            // 하위 컴포넌트에 아래 함수가 전달되지 않았을 경우를 대비하여
            // 하위 컴포넌트에서 해당 props를 위한 defaultProps 도 설정해야 한다.
            onRemove={this.handleRemove}
            />
        </div>
    );
  }
}

export default App;