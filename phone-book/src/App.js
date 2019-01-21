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
    ],
    // 키워드 값에 따라 하위 컴포넌트인 PhoneInfoList가 전달받는 data가 달라진다.
    // 키워드 값이 바뀌면 PhoneInfoList의 shouldComponentUpdate 도 true를 반환할 것이다.
    keyword: ''
  }
  // input 실시간 감지, setState로 state에 이벤트 값 할당
  handleChange = (e) => {
    this.setState({
      keyword: e.target.value,
    });
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
  handleUpdate = (id, data) => {
    // 일단 현재 state를 객체 비구조화 할당.
    const { information } = this.state;
    // 그 후 전달받은 파라미터를 이용하여 setState로 state 변경.
    this.setState({
      information: information.map(
        info => id === info.id
          ? { ...info, ...data } // 새 객체를 만들어서 기존의 값과 전달받은 data 를 덮어쓴다.
          : info // 전달받은 id와 같지 않은 인덱스는 기존의 값을 그대로 유지한다.
      )
    })
  }
  // ReactDom 에 정의되어있는 render 함수.
  render() {
    // this가 App class를 가르키는 것으로 보아 render 함수는 함수표현식으로 정의되어있을 것이다.
    // console.log(this);
    
    const { information, keyword } = this.state;

    const filteredList = information.filter(
      // information 배열을 필터링 하는 로직
      // filter 함수는 callback이 true로 강제하는 값을 반환하는 모든 값이 있는 새로운 배열을 생성한다.
      info => info.name.indexOf(keyword) !== -1
    );
    
    return (
        <div>
          <p>
            Edit <code>src/App.js</code> and save to reload.
          </p>
          <PhoneForm 
            // 자식에게 전달할 함수 onCreate
            onCreate={this.handleCreate}
          />
          <p>
            <input
              placeholder="검색 할 이름을 입력하세요!"
              onChange={this.handleChange}
              value={keyword}
            />
          </p>
          <hr />
          <h5>
           JSON을 String으로 변환하여 표시<hr />
           {JSON.stringify(information)}
          </h5>
          <PhoneInfoList
            data={filteredList}
            // 실수로 함수를 전달하지 않았을 경우 app crash 발생한다.
            // 하위 컴포넌트에 아래 함수가 전달되지 않았을 경우를 대비하여
            // 하위 컴포넌트에서 해당 props를 위한 defaultProps 도 설정해야 한다.
            onRemove={this.handleRemove}
            onUpdate={this.handleUpdate}
            />
        </div>
    );
  }
}

export default App;